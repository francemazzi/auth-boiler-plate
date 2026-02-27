import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.APP_NAME || 'Auth Boiler Plate',
      version: '1.0.0',
      description: `API documentation for ${process.env.APP_NAME || 'Auth Boiler Plate'}`,
    },
    servers: [
      {
        url: process.env.BACKEND_URL || `http://localhost:${process.env.PORT ?? 8081}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth_token',
          description: 'JWT stored in HttpOnly cookie auth_token',
        },
      },
    },
  },
  apis: ['./src/infrastructure/http/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
