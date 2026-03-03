import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM categories");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
  res.json({ message: "Category added" });
});

export default router;
