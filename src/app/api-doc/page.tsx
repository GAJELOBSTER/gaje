import { createSwaggerSpec } from "next-swagger-doc";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function IndexPage() {
  const spec = createSwaggerSpec({
    apiFolder: "./src/app/(server)/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Gaje Swagger API",
        version: "1.0",
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
  return (
    <div className="container">
      <SwaggerUI spec={spec} />;
    </div>
  );
}
