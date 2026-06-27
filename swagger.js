const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Items CRUD API',
      version: '1.0.0',
      description: 'REST API for managing items',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        ItemInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'Laptop',
            },
            description: {
              type: 'string',
              example: 'A powerful laptop',
            },
          },
        },
        ItemResponse: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            status: { type: 'integer' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
