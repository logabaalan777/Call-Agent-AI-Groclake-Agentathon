const tools = [
  {
    type: 'function',
    function: {
      name: 'searchProduct',
      say: 'Let me search for the product you are looking for.',
      description: 'Search for products based on a query string.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search term or query to look for products.',
          },
        },
        required: ['query'],
      },
      returns: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: {
                  type: 'integer',
                  description: 'The unique identifier of the product.',
                },
                name: {
                  type: 'string',
                  description: 'The name of the product.',
                },
                price: {
                  type: 'integer',
                  description: 'The price of the product.',
                },
                currency: {
                  type: 'string',
                  description: 'The currency of the price (e.g., USD, EUR).',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'checkOrderStatus',
      say: 'Let me check the status of your order.',
      description: 'Check the status of an order by its ID.',
      parameters: {
        type: 'object',
        properties: {
          orderId: {
            type: 'integer',
            description: 'The unique identifier of the order. It must be an integer or numerical value.',
          },
        },
        required: ['orderId'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'The current status of the order (e.g., shipped, delivered).',
          },
          estimatedDelivery: {
            type: 'string',
            description: 'The estimated delivery date of the order.',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'raiseIssue',
      say: 'Let me raise an issue for you.',
      description: 'Raise a customer issue or complaint, specifying whether to return or replace the product.',
      parameters: {
        type: 'object',
        properties: {
          orderId: {
            type: 'integer',
            description: 'The unique identifier of the order associated with the issue. It must be an integer or numerical value.',
          },
          issue: {
            type: 'string',
            description: 'A brief description of the issue to be provided by the user.',
          },
          action: {
            type: 'string',
            description: 'Specify whether the issue is for a "return" or "replace" action. In small letters not in capital letters.',
            enum: ['return', 'replace'],
          },
        },
        required: ['orderId', 'issue', 'action'],
      },
      returns: {
        type: 'object',
        properties: {
          ticketId: {
            type: 'integer',
            description: 'The unique identifier for the raised issue.',
          },
          status: {
            type: 'string',
            description: 'The initial status of the issue (e.g., open, in progress).',
          },
        },
      },
    },
  },  
  {
    type: 'function',
    function: {
      name: 'checkIssueStatus',
      say: 'Let me check the status of your issue.',
      description: 'Check the status of a raised issue by its ticket ID.',
      parameters: {
        type: 'object',
        properties: {
          ticketId: {
            type: 'integer',
            description: 'The unique identifier of the issue. It must be an integer or numerical value.',
          },
        },
        required: ['ticketId'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'The current status of the issue (e.g., resolved, pending).',
          },
          resolutionDetails: {
            type: 'string',
            description: 'Details about the resolution of the issue, if available.',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'handleGreetingsOrNone',
      say: 'Hello! How can I assist you today?',
      description: 'Handles general greetings or undefined queries that do not match other tools.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The user input that does not match other tools or contains a greeting.',
          },
        },
        required: ['query'],
      },
      returns: {
        type: 'object',
        properties: {
          response: {
            type: 'string',
            description: 'A polite response to the user input.',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'AboutService',
      say: '',
      description: 'Handles queries about services offered by us and to intimate services offered if any undefined queries that do not match other tools.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The user input that does not match other tools or query about the service offered by the organization.',
          },
        },
        required: ['query'],
      },
      returns: {
        type: 'object',
        properties: {
          response: {
            type: 'string',
            description: 'A polite response to the user input.',
          },
        },
      },
    },
  }    
];

module.exports = tools;
