import { render, screen, fireEvent } from "@testing-library/react";
import ButtonTask from ".";

describe("ButtonTask component tests", () => {
  test("it renders without crashing", () => {
    render(
      <ButtonTask
        imgSrc="/path/to/image.png"
        imgAlt="Alt Text"
        handleClick={() => {}}
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("it renders image correctly", () => {
    render(
      <ButtonTask
        imgSrc="/path/to/image.png"
        imgAlt="Alt Text"
        handleClick={() => {}}
      />
    );

    const imageElement = screen.getByAltText("Alt Text");

    expect(imageElement).toBeInTheDocument();
  });

  test("image has correct attributes", () => {
    render(
      <ButtonTask
        imgSrc="/path/to/image.png"
        imgAlt="Alt Text"
        handleClick={() => {}}
      />
    );
    const imageElement = screen.getByAltText("Alt Text");

    expect(imageElement).toHaveAttribute("src", "/path/to/image.png");
    expect(imageElement).toHaveAttribute("alt", "Alt Text");
  });

  test("hover effect applies correctly", () => {
    render(
      <ButtonTask
        imgSrc="/path/to/image.png"
        imgAlt="Alt Text"
        handleClick={() => {}}
      />
    );
    const buttonTask = screen.getByRole("button");

    expect(buttonTask).not.toHaveClass("hovered");

    fireEvent.mouseOver(buttonTask);
    expect(buttonTask).toHaveClass("hovered");

    fireEvent.mouseLeave(buttonTask);
    expect(buttonTask).not.toHaveClass("hovered");
  });

  test("it triggers handleClick function when button is clicked", () => {
    const handleClickMock = jest.fn();
    render(
      <ButtonTask
        imgSrc="/path/to/image.png"
        imgAlt="Alt Text"
        handleClick={handleClickMock}
      />
    );

    const buttonTask = screen.getByRole("button");

    fireEvent.click(buttonTask);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
