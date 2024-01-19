import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Header component tests", () => {
  test("it renders without crashing", () => {
    render(<Header />);
    const headerElement = screen.getByTestId("header-component");
    expect(headerElement).toBeInTheDocument();
  });

  test("title 'Todo App' is render correctly", () => {
    render(<Header />);
    const titleElement = screen.getByRole("heading", {
      level: 1,
      name: /Todo App/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("it renders Calendar component correctly", () => {
    render(<Header />);
    const calendarElement = screen.getByTestId("calendar-component");
    expect(calendarElement).toBeInTheDocument();
  });
});
