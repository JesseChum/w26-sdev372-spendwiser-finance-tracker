import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("Spendwiser SPA root App", () => {
    beforeEach(() => {
        // Mock the fetch function
        vi.stubGlobal('fetch', 
            vi.fn().mockImplementation(() => 
            Promise.resolve({
                json: () => Promise.resolve({ message: "Backend is healthy" })
            }))
        )
    });


    it("SPA renders correctly with a dashboard form", () => {
        render(<App />);
        expect(screen.getByRole("heading", { name: /Hobbyist Tracker/i })).toBeInTheDocument();
    });
});