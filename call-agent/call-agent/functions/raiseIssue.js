const axios = require('axios');

async function verifyNumber(callerNum, orderId) {
  try {
    console.log("Verifying caller number with order ID...");
    const apiUrl = 'http://127.0.0.1:5000/numberbyorder';
    const response = await axios.post(apiUrl, { orderId });

    const { data } = response;
    if (!data || typeof data.userNum !== 'string') {
      console.error("API response does not contain a valid 'userNum'.");
      return false;
    }

    return callerNum == data.userNum;
  } catch (error) {
    console.error('Error in verifyNumber:', error.message);
    throw new Error('Number verification failed. Please try again later.');
  }
}

module.exports = async function raiseIssue(args) {
  const { callerNum, orderId, issue, action } = args;

  console.log("Raising issue...");
  console.log(`Order ID: ${orderId}, Issue: ${issue}, Action: ${action}`);

  // Input validation
  if (!orderId || typeof orderId !== 'number') {
    return 'Invalid or missing "orderId". Please provide a valid order ID.';
  }
  if (!issue || typeof issue !== 'string') {
    return 'Invalid or missing "issue". Please describe the issue.';
  }
  if (!action || !['return', 'replace'].includes(action)) {
    return 'Invalid or missing "action". Please specify either "return" or "replace".';
  }
  if (!callerNum || typeof callerNum !== 'string') {
    return 'Invalid or missing "callerNum". Please provide a valid caller number.';
  }

  try {
    const isVerified = await verifyNumber(callerNum, orderId);
    if (!isVerified) {
      return 'Your number does not match with the actual number from which the order was placed.';
    }
  } catch (error) {
    console.error(error.message);
    return 'An error occurred while verifying your number. Please try again later.';
  }
  console.log("Contact Number Verified");

  try {
    const apiUrl = 'http://127.0.0.1:5000/raise_issue';
    const payload = { callerNum, orderId, issue, action };
    console.log("Sending issue raise request to API...");
    const response = await axios.post(apiUrl, payload);

    const { data } = response;
    if (!data || !data.ticketId) {
      console.error("API response did not contain a ticket ID.");
      return 'An error occurred while raising the issue. Please try again.';
    }

    console.log(`Issue successfully raised. Ticket ID: ${data.ticketId}`);
    return `Your issue has been raised successfully. Your ticket ID is "${data.ticketId}" for "${action}". It is open and will be verified by our team.`;
  } catch (error) {
    console.error('Error in RaiseIssue:', error.message);
    return 'An error occurred while raising the issue. Please try again later.';
  }
};
