import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/models/*.model.ts",
    dialect: "postgresql",
    out: "./drizzle",
    dbCredentials: {
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        database: String(process.env.DB_NAME),
        ssl: false,
    }
})