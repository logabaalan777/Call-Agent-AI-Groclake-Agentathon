module.exports = async (args) => {
  try {
    const { query } = args;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return { response: "Invalid input. Please provide a valid query." };
    }

    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening', 'good afternoon'];
    const lowerQuery = query.toLowerCase().trim();

    const isGreeting = greetings.some(greeting => lowerQuery.includes(greeting));

    if (isGreeting) {
      return { response: "Hello! How can I assist you today?" };
    } else {
      return { response: "I'm here to help! Could you provide more details about what you need?" };
    }
  } catch (error) {
    console.error('Error in greeting detection:', error.message);
    return { response: "An error occurred. Please try again later." };
  }
};
