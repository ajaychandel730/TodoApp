import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../app/page";
import TodoInput from "../app/components/TodoInput";
import { renderWithProviders } from "../utils/test.utils";
import { describe } from "node:test";

describe("Page", () => {
  it("renders a heading", () => {
    renderWithProviders(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Todo List");
  });
});

describe("TodoInput", () => {
  it("TodoInput text", () => {
    renderWithProviders(<TodoInput />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("name")).toBe("task");
    expect(input.getAttribute("placeholder")).toBe("Please enter task");
  });
});
