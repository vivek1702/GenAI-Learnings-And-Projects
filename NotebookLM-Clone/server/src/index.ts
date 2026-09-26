import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hellow world");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(8081, () => {
  console.log("Server is  running on port 8081");
});
