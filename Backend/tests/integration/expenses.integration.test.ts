// Backend/tests/integration/expenses.integration.test.ts
import { describe, test, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../Server/index";
import pool from "../../Server/db";

const isTestDb = process.env.DB_NAME === "spendwiser_test";

describe.skipIf(!isTestDb)("Expenses API integration", () => {
  beforeAll(async () => {
    await pool.query("CREATE TABLE IF NOT EXISTS expenses (id INT AUTO_INCREMENT PRIMARY KEY, hobby VARCHAR(50) NOT NULL, description VARCHAR(255), location VARCHAR(255), amount DECIMAL(8,2) NOT NULL, expense_date DATE NOT NULL, image_path VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
  });

  beforeEach(async () => {
    if (!isTestDb) return;
    await pool.query("DELETE FROM expenses");
  });

  afterAll(async () => {
    await pool.end();
  });

  test("POST stores an expense and GET returns it", async () => {
    const expense = {
      hobby: "Hiking",
      description: "Trail fee",
      location: "State Park",
      amount: "25.55",
      expense_date: "2025-03-01",
    };

    const responseObj = await request(app).post("/expenses").send(expense).set("Content-Type", "application/json");

    expect(responseObj.status).toBe(201);

    const allExpenses = await request(app).get("/expenses");
    expect(allExpenses.status).toBe(200);
    expect(Array.isArray(allExpenses.body)).toBe(true);
    expect(allExpenses.body.length).toBe(1);
    expect(allExpenses.body[0]).toMatchObject({
      hobby: expense.hobby,
      description: expense.description,
      location: expense.location,
      amount: expense.amount,
      // we should make sure the date returned is cleaned when sent (rn we are formatting it in FE after receiving it I think?)
      expense_date: "2025-03-01T00:00:00.000Z"
    });
    expect(allExpenses.body[0]).toHaveProperty("id");
    expect(allExpenses.body[0]).toHaveProperty("created_at");
  });

  test("POST gets rejected with no hobby", async () => {
    const expense = {
      description: "Trail fee",
      location: "State Park",
      amount: "25.55",
      expense_date: "2025-03-01"
    };

    const responseObj = await request(app).post("/expenses").send(expense).set("Content-Type", "application/json");
    expect(responseObj.status).toBe(400)
    expect(responseObj.body).toMatchObject({error: "Missing required fields"})
  })

  test("Removing an Expense", async () => {
    const expense = {
    hobby: "Hiking",
    description: "Trail fee",
    location: "State Park",
    amount: "25.55",
    expense_date: "2025-03-01",
    };

    const responseObj = await request(app).post("/expenses").send(expense).set("Content-Type", "application/json");
    expect(responseObj.status).toBe(201);

    const allExpenses = await request(app).get("/expenses")
    const deleted = await request(app).delete(`/delete/${allExpenses.body[0].id}`)

    expect(deleted.body).toMatchObject({ message: "Expense deleted" })
  })
});