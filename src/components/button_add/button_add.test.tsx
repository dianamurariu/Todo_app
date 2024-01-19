import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonAdd from ".";
import { dimensionsIcons } from "../../config";
describe("ButtonAdd component tests", () => {
  test("it renders button 'Add' element correctly", () => {
    render(<ButtonAdd handleClick={() => {}} />);
    const addButton = screen.getByRole("button");

    expect(addButton).toBeInTheDocument();
  });

  test("it renders 'plus' icon with correct source", () => {
    render(<ButtonAdd handleClick={() => {}} />);
    const iconElement = screen.getByAltText("plus-icon");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("src", "images/plus.svg");
  });

  test("'plus' icon has medium dimensions", () => {
    render(<ButtonAdd handleClick={() => {}} />);
    const iconElement = screen.getByAltText("plus-icon");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute(
      "width",
      dimensionsIcons.medium.toString()
    );
    expect(iconElement).toHaveAttribute(
      "height",
      dimensionsIcons.medium.toString()
    );
  });

  test("it triggers handleClick function when button is clicked", () => {
    const handleClickMock = jest.fn();
    render(<ButtonAdd handleClick={handleClickMock} />);
    const addButton = screen.getByRole("button");

    fireEvent.click(addButton);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test("it applies hover effect on mouseOver", () => {
    render(<ButtonAdd handleClick={() => {}} />);
    const addButton = screen.getByRole("button");

    fireEvent.mouseOver(addButton);

    expect(addButton).toHaveClass("hovered");
  });
  test("it removes hover effect on mouseLeave", () => {
    render(<ButtonAdd handleClick={() => {}} />);
    const addButton = screen.getByRole("button");

    fireEvent.mouseOver(addButton);
    fireEvent.mouseLeave(addButton);

    expect(addButton).not.toHaveClass("hovered");
  });
});
