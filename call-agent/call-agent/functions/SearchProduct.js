const axios = require('axios');

module.exports = async function (args) {
  const { query } = args;

  // Input validation
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return 'A valid "query" parameter is required. Please provide a non-empty search term.';
  }

  try {
    const apiUrl = 'http://127.0.0.1:5000/search_product';
    const payload = { query: query.trim() };

    console.log(`Sending search request for query: "${payload.query}"`);
    const response = await axios.post(apiUrl, payload);

    const { data } = response;

    if (!data || !Array.isArray(data.results) || data.results.length === 0) {
      return `No products found for "${payload.query}". Please try searching with a different query.`;
    }

    const maxResults = 5; 
    const formattedResults = data.results.slice(0, maxResults).map((product, index) => {
      const pid = product.productId || 'N/A';
      const name = product.name || 'Unnamed Product';
      const price = product.price ? `${product.price} USD` : 'Price not available';
      const description = product.metadata || 'No description available';
      return `${index + 1}. Product ID: ${pid}, Name: ${name}, Price: ${price}, Description: ${description}`;
    }).join('\n');

    console.log('Search results:', formattedResults);
    return `Here are the top ${maxResults} results for "${payload.query}":\n${formattedResults}`;
  } catch (error) {
    console.error('Error in SearchProduct:', error.message, {
      query,
      stack: error.stack,
    });
    return 'An error occurred while searching for products. Please try again later.';
  }
};
