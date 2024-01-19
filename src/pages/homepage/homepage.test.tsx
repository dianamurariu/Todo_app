import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Homepage from ".";

describe("Homepage Component tests", () => {
  test("it renders inside components without crashing", () => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    expect(screen.getByTestId("homepage-container")).toBeInTheDocument();
    expect(screen.getByTestId("header-container")).toBeInTheDocument();
    expect(screen.getByTestId("button-container")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-container")).toBeInTheDocument();
  });
  describe("Add Task", () => {
    test("it opens add dialog when the 'Add' button is clicked", () => {
      render(
        <Provider store={store}>
          <Homepage />
        </Provider>
      );

      fireEvent.click(screen.getByAltText("plus-icon"));
      const addDialog = screen.getByText("Add Task");

      expect(addDialog).toBeInTheDocument();
    });

    test("it closes add dialog when the 'Cancel' button is clicked", () => {
      render(
        <Provider store={store}>
          <Homepage />
        </Provider>
      );

      fireEvent.click(screen.getByAltText("plus-icon"));
      fireEvent.click(screen.getByText("Cancel"));
      const addDialog = screen.queryByText("Add Task");

      expect(addDialog).not.toBeInTheDocument();
    });
  });
});
