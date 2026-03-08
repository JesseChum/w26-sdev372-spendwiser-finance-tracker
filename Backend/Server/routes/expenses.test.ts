import { describe, test, expect, vi} from "vitest"
import request from "supertest";
import { RowDataPacket } from "mysql2";
import pool from "../db";
import app from "../index";

vi.mock("../db.ts", () => ({
    default: {
      query: vi.fn()
    }
}));

describe("Expenses API data", async () => {
  test("Expenses route should return 200 and expense list", async () => {
    vi.mocked(pool.query).mockResolvedValue([
      [
        { id: 1, hobby: "Hiking", description: "Hiking in the mountains", location: "Mountains", amount: 100, expense_date: "2021-01-01" },
        { id: 2, hobby: "Hiking", description: "Hiking in the mountains", location: "Mountains", amount: 100, expense_date: "2021-01-01" }
      ] as unknown as RowDataPacket[],
      []
    ]);
    const response = await request(app).get("/expenses");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, hobby: "Hiking", description: "Hiking in the mountains", location: "Mountains", amount: 100, expense_date: "2021-01-01" },
      { id: 2, hobby: "Hiking", description: "Hiking in the mountains", location: "Mountains", amount: 100, expense_date: "2021-01-01" }
    ]);
  });

  test("Expenses should accept new items and return stored data", async () => {
    vi.mocked(pool.query).mockResolvedValue([
      [
        { id: 1, hobby: "Eating", description: "Eating at my house", location: "House", amount: 10, expense_date: "2022-01-01" },
        { id: 2, hobby: "Running", description: "Running down my street", location: "Street", amount: 1, expense_date: "2021-01-02" }
      ] as unknown as RowDataPacket[],
      []
    ]);
    const jsonData = { id: 3, hobby: "Jumping", description: "Jumping in treehouse", location: "Treehouse", amount: 2, expense_date: "2020-02-03" }
    const response = await request(app).post("/expenses").send(jsonData)
    expect(response.status).toBe(201)
  });
})
