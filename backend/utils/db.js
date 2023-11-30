import mysql from "mysql2";
import "dotenv/config";

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

export default db;
