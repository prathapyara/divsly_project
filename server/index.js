import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

app.get("/api", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const json = JSON.parse(data);
    res.status(200).json(json);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(200).json([]);
  }
});

app.post("/api", async (req, res) => {
  try {
    const newData = req.body;
    console.log("Received data:", newData);

    let existingData = [];

    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf8");
      existingData = JSON.parse(fileContent);
    } catch (err) {
      console.warn("data.json not found or empty. Starting with empty array.");
    }

    existingData.push(newData);

    await fs.writeFile(DATA_FILE, JSON.stringify(existingData, null, 2));
    res.status(200).json({ message: "Data has been saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
