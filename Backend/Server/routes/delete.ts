import { Router } from "express";
import pool from "../db";

const router = Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM expenses WHERE id = ?", [id]);
  res.json({ message: "Expense deleted" });
});

export default router;