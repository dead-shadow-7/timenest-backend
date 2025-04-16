import dotenv from "dotenv";
dotenv.config();
// Database configuration for MySQL connection
export const CONFIG = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
};
