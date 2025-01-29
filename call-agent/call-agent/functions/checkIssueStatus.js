const axios = require('axios');

async function verifyNumber(num, ticketId) {
  try {
    console.log("Verifying caller number with Ticket ID...");
    const apiUrl = 'http://127.0.0.1:5000/numberbyissue';
    const response = await axios.post(apiUrl, { ticketId });

    const { data } = response;
    if (!data || typeof data.userNum !== 'string') {
      return 'API response did not contain a valid "userNum".';
    }

    return num == data.userNum;
  } catch (error) {
    console.error('Error in verifyNumber:', error.message);
    return 'An error occurred while verifying the number. Please try again later.';
  }
}

module.exports = async function (args) {
  const { callerNum, ticketId } = args;

  console.log('Initiating issue status check...');
  console.log(`Ticket ID: ${ticketId} (Type: ${typeof ticketId})`);

  if (!ticketId || typeof ticketId !== 'number') {
    return 'A valid "ticketId" parameter is required. Please provide a valid ticket ID.';
  }

  try {
    // Verify if the caller number matches the ticket's associated number
    const verifyResult = await verifyNumber(callerNum, ticketId);

    if (verifyResult !== true) {
      return 'Your number does not match with the actual number from which the issue is raised.';
    }
    console.log("Contact Number Verified");

    // Check the issue status
    const apiUrl = 'http://127.0.0.1:5000/check_issue_status';
    const response = await axios.post(apiUrl, { ticketId });
    const { data } = response;

    if (!data || !data.status) {
      return `No status found for ticket ID "${ticketId}". Please check the ticket ID and try again.`;
    }

    return `The status for ticket ID "${ticketId}" is: ${data.status}.`;
  } catch (error) {
    console.error('Error in CheckIssueStatus:', error.message);
    return 'An error occurred while checking the issue status. Please try again later.';
  }
};
