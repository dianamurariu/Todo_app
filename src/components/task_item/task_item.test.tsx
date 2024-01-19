import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./index";
import { toggleComplete, deleteTodo, updateTodo } from "../../redux/todoSlice";

jest.mock("../../redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("TaskItem component tests", () => {
  let mockDispatch: jest.Mock<any, any, any>;

  beforeEach(() => {
    mockDispatch = jest.fn();
    require("../../redux/hooks").useAppDispatch.mockReturnValue(mockDispatch);
  });

  test("it renders without crashing", () => {
    render(
      <TaskItem
        id={1}
        title="Sample Title"
        detail="Sample Detail"
        completed={false}
      />
    );
    const taskContainer = screen.getByTestId("task-container");
    expect(taskContainer).toBeInTheDocument();
  });

  test("it renders both titles with correct content", () => {
    render(
      <TaskItem
        id={1}
        title="Sample Title"
        detail="Sample Detail"
        completed={false}
      />
    );
    const titleElement = screen.getByText("Sample Title");
    const detailElement = screen.getByText("Sample Detail");
    expect(titleElement).toBeInTheDocument();
    expect(detailElement).toBeInTheDocument();
  });

  describe("Edit", () => {
    test("it opens edit dialog when 'Edit' button is clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );
      fireEvent.click(screen.getByAltText("edit-icon"));
      const editDialog = screen.getByText("Edit Task");
      expect(editDialog).toBeInTheDocument();
    });

    test("it updates task when 'Edit' and 'Update' buttons are clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );

      fireEvent.click(screen.getByAltText("edit-icon"));

      fireEvent.change(screen.getByLabelText("Title:"), {
        target: { value: "Updated Title" },
      });
      fireEvent.change(screen.getByLabelText("Detail:"), {
        target: { value: "Updated Detail" },
      });

      fireEvent.click(screen.getByText("Update"));

      expect(mockDispatch).toHaveBeenCalledWith(
        updateTodo({ id: 1, title: "Updated Title", detail: "Updated Detail" })
      );
    });

    test("it closes edit dialog when 'Cancel' button is clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );
      fireEvent.click(screen.getByAltText("edit-icon"));
      fireEvent.click(screen.getByText("Cancel"));
      const editDialog = screen.queryByText("Edit Task");
      expect(editDialog).not.toBeInTheDocument();
    });
  });

  describe("Delete", () => {
    test("it opens delete dialog when 'Delete' button is clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );
      fireEvent.click(screen.getByAltText("trash-icon"));
      const deleteDialog = screen.getByText("Delete Task");
      expect(deleteDialog).toBeInTheDocument();
    });

    test("it deletes task when 'Delete' and 'Confirm' buttons are clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );

      fireEvent.click(screen.getByAltText("trash-icon"));

      fireEvent.click(screen.getByText("Confirm"));

      expect(mockDispatch).toHaveBeenCalledWith(deleteTodo({ id: 1 }));
    });

    test("it closes delete dialog when 'Cancel' button is clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );
      fireEvent.click(screen.getByAltText("trash-icon"));
      fireEvent.click(screen.getByText("Cancel"));
      const deleteDialog = screen.queryByText("Delete Task");
      expect(deleteDialog).not.toBeInTheDocument();
    });
  });

  describe("Completed", () => {
    test("it toggles task completion when 'Check' button is clicked", () => {
      render(
        <TaskItem
          id={1}
          title="Sample Title"
          detail="Sample Detail"
          completed={false}
        />
      );

      fireEvent.click(screen.getByAltText("check-icon"));

      expect(mockDispatch).toHaveBeenCalledWith(
        toggleComplete({ id: 1, completed: true })
      );
    });
  });
});
