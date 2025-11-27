export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "AI E-Book Creator",
    version: "1.0.0",
    description: "API documentation for the AI E-Book Creator",
    contact: {
      name: "API Support",
      email: "support@ai-ebook-creator.com",
    },
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://api.ai-ebook-creator.com"
          : "http://localhost:5000",
      description:
        process.env.NODE_ENV === "production"
          ? "Production server"
          : "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
