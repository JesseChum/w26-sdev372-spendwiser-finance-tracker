import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import DashboardForm from "./DashboardForm";
import userEvent from "@testing-library/user-event";

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
       render(<DashboardForm />);

       //test the date input
      const dateInput = screen.getByLabelText(/date/i);
      expect(dateInput).toBeInTheDocument();
      expect(dateInput).toHaveValue("");
      //use act to wrap the userEvent.type call
      act(() => {
        fireEvent.change(dateInput, { target: { value: "2026-03-01" } });
      });
      expect(dateInput).toHaveValue("2026-03-01");
      
      //test the category input
      const categoryInput = screen.getByLabelText(/category/i);
      expect(categoryInput).toBeInTheDocument();
      expect(categoryInput).toHaveValue("");
      act(() => {
        fireEvent.change(categoryInput, { target: { value: "keyboards" } });
      });
      expect(categoryInput).toHaveValue("keyboards");

      //test the amount input
      const amountInput = screen.getByLabelText(/\$ Spent/i);
      expect(amountInput).toBeInTheDocument();
      act(() => {
        fireEvent.change(amountInput, { target: { value: 100 } });
      });
      expect(amountInput).toHaveValue(100);

      //test the location input
      const locationInput = screen.getByLabelText(/location/i);
      expect(locationInput).toBeInTheDocument();
      expect(locationInput).toHaveValue("");
      act(() => {
        fireEvent.change(locationInput, { target: { value: "WA" } });
      });
      expect(locationInput).toHaveValue("WA");

      //test the description input
      const descriptionInput = screen.getByPlaceholderText(/What's the item for today?/i);
      expect(descriptionInput).toBeInTheDocument();
      expect(descriptionInput).toHaveValue("");
      act(() => {
        fireEvent.change(descriptionInput, { target: { value: "I bought a new keyboard" } });
      });
      expect(descriptionInput).toHaveValue("I bought a new keyboard");
    });
});