// Import necessary modules and functions
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import App from "./App";

test("renders App component without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
});

test("navigates to the homepage when the / route is accessed", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByTestId("homepage-container")).toBeInTheDocument();
});

test("navigates to the homepage when the /home route is accessed", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<App />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByTestId("homepage-container")).toBeInTheDocument();
});
