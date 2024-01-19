import { fireEvent, render, screen } from "@testing-library/react";
import Dialog from ".";

describe("Dialog component tests", () => {
  const defaultProps = {
    show: true,
    title: "Test Dialog",
    titleTask: "Test Title",
    detailTask: "Test Detail",
    deleteConfirmation: "Are you sure?",
    btnAdd: jest.fn(),
    btnCancel: jest.fn(),
    btnConfirm: jest.fn(),
    btnUpdate: jest.fn(),
    onTitleTaskChange: jest.fn(),
    onDetailTaskChange: jest.fn(),
  };

  test("it renders without crashing", () => {
    render(<Dialog {...defaultProps} />);
  });

  test("it renders title correctly", () => {
    render(<Dialog {...defaultProps} />);
    const titleDialog = screen.getByText("Test Dialog");

    expect(titleDialog).toBeInTheDocument();
  });

  test("it renders title input and handles change", () => {
    render(<Dialog {...defaultProps} />);
    const titleInput = screen.getByTestId("title-input");

    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(defaultProps.onTitleTaskChange).toHaveBeenCalledTimes(1);
  });

  test("it renders detail input and handles change", () => {
    render(<Dialog {...defaultProps} />);
    const detailInput = screen.getByTestId("detail-input");

    expect(detailInput).toBeInTheDocument();
    fireEvent.change(detailInput, { target: { value: "New Detail" } });
    expect(defaultProps.onDetailTaskChange).toHaveBeenCalledTimes(1);
  });

  test("it triggers btnAdd when Add is clicked and form is valid", () => {
    const mockAddHandler = jest.fn();
    render(<Dialog {...defaultProps} btnAdd={mockAddHandler} />);

    const titleInput = screen.getByTestId("title-input");
    const detailInput = screen.getByTestId("detail-input");

    fireEvent.change(titleInput, {
      target: { value: "Valid Title" },
    });
    fireEvent.change(detailInput, {
      target: { value: "Valid Detail" },
    });
    fireEvent.click(screen.getByText("Add"));

    expect(mockAddHandler).toHaveBeenCalled();
  });

  test("it doesn't trigger btnUpdate when Update is clicked and form is invalid", () => {
    const mockUpdateHandler = jest.fn();
    render(
      <Dialog
        {...defaultProps}
        titleTask=""
        detailTask=""
        btnUpdate={mockUpdateHandler}
      />
    );

    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);

    expect(mockUpdateHandler).not.toHaveBeenCalled();
  });

  test("it renders warning message when form is invalid", () => {
    const mockAddHandler = jest.fn();
    render(
      <Dialog
        {...defaultProps}
        btnAdd={mockAddHandler}
        titleTask=""
        detailTask=""
        warning="*Complete both fields before proceeding."
      />
    );

    fireEvent.click(screen.getByText("Add"));
    const warning = screen.getByText(
      "*Complete both fields before proceeding."
    );
    expect(warning).toBeInTheDocument();
  });

  test("it triggers btnConfirm when Confirm button is clicked", () => {
    const mockConfirmHandler = jest.fn();
    render(<Dialog {...defaultProps} btnConfirm={mockConfirmHandler} />);

    fireEvent.click(screen.getByText("Confirm"));

    expect(mockConfirmHandler).toHaveBeenCalled();
  });

  test("it triggers btnCancel when Cancel button is clicked", () => {
    const mockCancelHandler = jest.fn();
    render(<Dialog {...defaultProps} btnCancel={mockCancelHandler} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockCancelHandler).toHaveBeenCalled();
  });

  test("it renders delete confirmation message when provided", () => {
    render(<Dialog {...defaultProps} deleteConfirmation="Are you sure?" />);
    const deleteConfirmation = screen.getByText("Are you sure?");

    expect(deleteConfirmation).toBeInTheDocument();
  });
});
