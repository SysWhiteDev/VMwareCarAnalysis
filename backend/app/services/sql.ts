import postgres from "postgres";
import "dotenv/config";

const sql = postgres({
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
});
export default sql;