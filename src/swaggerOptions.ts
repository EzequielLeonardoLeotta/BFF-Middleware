export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BFF-Middleware',
      version: '1.0.0',
      description: 'Es un middleware que contiene las llamadas a todos los servicios que alimentan al front end de compra, venta y mesa de ayuda.',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}
