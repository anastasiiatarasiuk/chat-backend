import path from "path";

export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");
console.log("Swagger file path:", SWAGGER_PATH);
