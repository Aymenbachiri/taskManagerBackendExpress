import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api/tasks", // Adjust to your API routes folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task Manager API",
        description: "A simple API to manage tasks",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
