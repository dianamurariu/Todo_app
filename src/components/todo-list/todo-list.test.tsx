import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import TodoList from ".";
import { RootState } from "../../redux/store";
import { Action } from "redux";

const mockStore = configureStore<RootState, Action>([]);

describe("TodoList component tests", () => {
  test("it renders without crashing", () => {
    const store: MockStoreEnhanced<RootState, Action> = mockStore({
      todos: {
        todos: [],
        showCompleted: false,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  });

  test("it renders tasks when they are present", () => {
    const store: MockStoreEnhanced<RootState, Action> = mockStore({
      todos: {
        todos: [
          {
            id: 1,
            title: "Task 1",
            detail: "Details 1",
            completed: false,
          },
          { id: 2, title: "Task 2", detail: "Details 2", completed: true },
        ],
        showCompleted: false,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const todoListContainer = screen.getByTestId("todo-list");

    expect(todoListContainer).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("it renders 'Add a task' message when no tasks are present", () => {
    const store: MockStoreEnhanced<RootState, Action> = mockStore({
      todos: {
        todos: [],
        showCompleted: false,
      },
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const todoListContainer = screen.getByTestId("todo-list");

    expect(todoListContainer).toBeInTheDocument();
    expect(screen.getByText("Add a task ⬇")).toBeInTheDocument();
  });
});
