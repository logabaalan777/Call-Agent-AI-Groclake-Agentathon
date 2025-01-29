const axios = require('axios');

async function verifyNumber(callerNum, orderId) {
  try {

    if (typeof orderId !== 'number' || !callerNum) {
      return 'Both caller number and order ID are required.';
    }
    console.log("Verifying caller number with order ID...");
    const apiUrl = 'http://127.0.0.1:5000/numberbyorder';
    const response = await axios.post(apiUrl, { orderId });
    const { data } = response;

    if (!data || typeof data.userNum !== 'string') {
      return 'API response did not contain a valid "userNum".';
    }
    
    return callerNum == data.userNum;
  } catch (error) {
    console.error('Error in verifyNumber:', error.message);
    return 'An error occurred while verifying the number. Please try again later.';
  }
}

module.exports = async function checkOrderStatus(args) {
  const { callerNum, orderId } = args;
  console.log("Checking order status for:", { orderId, type: typeof orderId});

  if (!orderId || typeof orderId !== 'number') {
    return 'A valid order ID (number) is required.';
  }

  const verifyResult = await verifyNumber(callerNum, orderId);

  if (verifyResult !== true) {
    return 'Your number does not match with the actual number from which the order was placed.';
  }
  console.log("Contact Number Verified");
  try {
    const apiUrl = 'http://127.0.0.1:5000/check_order_status';
    const response = await axios.post(apiUrl, { orderId });
    const { data } = response;

    if (!data || !data.status) {
      return `No status found for order ID "${orderId}". Please check the order ID and try again.`;
    }

    return `The status for order ID "${orderId}" is: ${data.status}. Estimated delivery date is ${data.estimatedDelivery || 'not available'}.`;
  } catch (error) {
    console.error('Error in checkOrderStatus:', error.message);
    return 'An error occurred while checking the order status. Please try again later.';
  }
};