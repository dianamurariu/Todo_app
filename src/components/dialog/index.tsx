import React, { FC, ChangeEvent, useState } from "react";
import styles from "./dialog.module.css";
import Title from "../title";

interface DialogProps {
  show: boolean;
  title: string;
  titleTask?: string;
  detailTask?: string;
  deleteConfirmation?: string;
  warning?: string;
  btnAdd?: React.MouseEventHandler;
  btnCancel?: React.MouseEventHandler;
  btnConfirm?: React.MouseEventHandler;
  btnUpdate?: React.MouseEventHandler;
  onTitleTaskChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDetailTaskChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Dialog: FC<DialogProps> = ({
  show,
  title,
  titleTask,
  detailTask,
  deleteConfirmation,
  warning,
  btnAdd,
  btnCancel,
  btnConfirm,
  btnUpdate,
  onTitleTaskChange,
  onDetailTaskChange,
}) => {
  // Check if the form is valid when title and detail of todo not to be empty
  const isFormValid = titleTask !== "" && detailTask !== "";
  // Track whether the Add/Update button is clicked
  const [btnAddOrUpdateClicked, setBtnAddOrUpdateClicked] = useState(false);

  // Handle the click of Add/Update button
  const handleButtonClick = (
    eventHandler: React.MouseEventHandler,
    event: React.MouseEvent
  ) => {
    setBtnAddOrUpdateClicked(true);
    // If the form is not valid, prevent it from being submitted
    if (!isFormValid) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      // If the form is valid, call the provided action (Add or Update)
      eventHandler(event);
      setBtnAddOrUpdateClicked(false);
    }
  };

  // Close the dialog box if 'show' prop is false
  if (!show) {
    return null;
  }
  // Render the Dialog component
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Dialog header with a Title component */}
        <div className={styles.dialog__header}>
          <Title level="h2">{title}</Title>
        </div>
        {/* Dialog content, including input fields and messages */}
        <div className={styles.dialog__content}>
          {/* Input field for title of todo */}
          {titleTask !== undefined && (
            <>
              <div className={styles.task_input__container}>
                <label htmlFor="title" className={styles.form_label}>
                  Title:{" "}
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder=" e.g. Make groceries"
                  className={styles.form_input}
                  value={titleTask}
                  onChange={onTitleTaskChange}
                  required
                  data-testid="title-input"
                />
              </div>
              <hr className={styles.divider} />
            </>
          )}
          {/* Input field for detail of todo */}
          {detailTask !== undefined && (
            <>
              <div className={styles.task_input__container}>
                <label htmlFor="detail" className={styles.form_label}>
                  Detail:{" "}
                </label>
                <input
                  type="text"
                  id="detail"
                  placeholder=" e.g. From Lidl"
                  className={styles.form_input}
                  value={detailTask}
                  onChange={onDetailTaskChange}
                  required
                  data-testid="detail-input"
                />
              </div>
              <hr className={styles.divider} />
            </>
          )}
          {/* Display a warning if the form is not valid and the Add/Update button is clicked */}
          {btnAddOrUpdateClicked && !isFormValid && (
            <p className={styles.warning}>{warning}</p>
          )}
          {/* Display a delete confirmation message before delete */}
          {deleteConfirmation && (
            <p className={styles.deleteConfirmation}>{deleteConfirmation}</p>
          )}
        </div>
        {/* Dialog buttons section */}
        <div className={styles.dialog__buttons}>
          {/* Cancel button */}
          {btnCancel && (
            <button
              type="button"
              className={styles.btnTask}
              onClick={btnCancel}
            >
              Cancel
            </button>
          )}
          {/* Confirm button for deleting a todo */}
          {btnConfirm && (
            <button
              type="button"
              className={styles.btnTask}
              onClick={btnConfirm}
            >
              Confirm
            </button>
          )}
          {/* Add button for adding a todo */}
          {btnAdd && (
            <button
              type="submit"
              className={styles.btnTask}
              onClick={(e) => handleButtonClick(btnAdd, e)}
            >
              Add
            </button>
          )}
          {/* Update button for updating a todo */}
          {btnUpdate && (
            <button
              type="submit"
              className={styles.btnTask}
              onClick={(e) => handleButtonClick(btnUpdate, e)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
