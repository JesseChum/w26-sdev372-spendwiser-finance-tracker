import { describe, test, expect, vi} from "vitest"
import request from "supertest";
import { RowDataPacket } from "mysql2";

vi.mock("../db.ts", () => ({
    default: {
      query: vi.fn()
    }
  }));

  import pool from "../db";
  import app from "../index";

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
