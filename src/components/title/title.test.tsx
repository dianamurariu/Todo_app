import { render, screen } from "@testing-library/react";
import Title from ".";

describe("Title component test", () => {
  test("it renders without crashing", () => {
    render(<Title level="h1">Hello, Title!</Title>);
  });

  test("it renders Title component with default level (h2)", () => {
    render(<Title>Hello, Title!</Title>);
    const headingElement = screen.getByRole("heading", { level: 2 });
    expect(headingElement).toBeInTheDocument();
  });
});
