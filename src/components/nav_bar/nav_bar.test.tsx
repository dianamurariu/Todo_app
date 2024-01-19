import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from ".";
import { setShowCompleted } from "../../redux/todoSlice";

jest.mock("../../redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("NavBar component tests", () => {
  let mockDispatch: jest.Mock<ReturnType<typeof setShowCompleted>>;

  beforeEach(() => {
    mockDispatch = jest.fn();
    require("../../redux/hooks").useAppDispatch.mockReturnValue(mockDispatch);
  });

  test("it renders without crashing", () => {
    render(<NavBar />);
  });

  test("it renders both buttons", () => {
    render(<NavBar />);
    const allButton = screen.getByText("All");
    const completedButton = screen.getByText("Completed");

    expect(allButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  test("it renders icons for both buttons", () => {
    render(<NavBar />);
    const menuIcon = screen.getByAltText("menu-icon");
    const completeIcon = screen.getByAltText("complete-icon");

    expect(menuIcon).toBeInTheDocument();
    expect(completeIcon).toBeInTheDocument();
  });

  test("button All is active in default state", () => {
    render(<NavBar />);
    const allButton = screen.getByText("All");
    expect(allButton).toHaveClass("active");
  });

  test("it triggers handleButtonClick function when 'All' button is clicked", () => {
    render(<NavBar />);
    const allButton = screen.getByText("All");

    fireEvent.click(allButton);

    expect(mockDispatch).toHaveBeenCalledWith(setShowCompleted(false));
  });

  test("it triggers handleButtonClick function when 'Completed' button is clicked", () => {
    render(<NavBar />);
    const completedButton = screen.getByText("Completed");

    fireEvent.click(completedButton);

    expect(mockDispatch).toHaveBeenCalledWith(setShowCompleted(true));
  });
});
