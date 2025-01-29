const axios = require('axios');

module.exports = async (args) => {
    try {
        const { query } = args;

        const q = `You are an intelligent e-commerce assistant that helps users with the following services: searching for products, checking order status, raising issues, and checking complaint status.
        When a user asks a question, check if it aligns with these services. If it does, provide a concise and clear response. If the query is outside these services, politely inform the user about the services you offer without providing unrelated answers.

        Input: ${query}
        Output: (If the query matches the services, provide a relevant response. If not, reply: 'I'm here to assist with product searches, order status, and issue tracking. Let me know how I can help!')`;

        const apiUrl = 'http://127.0.0.1:5000/llm_groclake';
        const response = await axios.post(apiUrl, { query: q });

        if (response?.data?.result) {
            return response.data.result;
        }

        return "We currently assist with e-commerce-related tasks such as searching for products, checking order status, and raising or tracking issues. If you need help with any of these, feel free to ask! Let us know how we can assist you.";
    } catch (error) {
        console.error("Error:", error.message);
        return "An error occurred. Please try again later.";
    }
};
