import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { CONFIG } from "./config/config.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: CONFIG.host,
  user: CONFIG.user,
  password: CONFIG.password,
  database: CONFIG.database,
  port: CONFIG.port,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// API to Add Task
app.post("/tasks", (req, res) => {
  const { task_name, description, task_date, task_option } = req.body;
  const sql =
    "INSERT INTO tasks (task_name, description, task_date, task_option) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [task_name, description, task_date, task_option],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Task added successfully", id: result.insertId });
    }
  );
});

// API to Fetch Tasks
app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
    console.log("Fetched successfully");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
