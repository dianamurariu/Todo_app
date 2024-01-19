import React, { useState, useEffect } from "react";
import styles from "./task_item.module.css";
import Title from "../title";
import ButtonTask from "./button_task";
import Dialog from "../dialog";
import { useAppDispatch } from "../../redux/hooks";
import { toggleComplete, deleteTodo, updateTodo } from "../../redux/todoSlice";

interface TaskItemProps {
  id: number;
  title: string;
  detail: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  detail,
  completed,
}) => {
  const dispatch = useAppDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const [detailTask, setDetailTask] = useState("");
  const [isTaskCompleted, setIsTaskCompleted] = useState(completed);

  // Synchronize the completion status when 'completed' prop changes
  useEffect(() => {
    setIsTaskCompleted(completed);
  }, [completed]);
  // Set task title and detail based on the field type
  const setTask = (field: "title" | "detail", value: string) => {
    if (field === "title") {
      setTitleTask(value);
    } else if (field === "detail") {
      setDetailTask(value);
    }
  };

  // Function to handle updating a task
  const handleUpdateTask = () => {
    dispatch(updateTodo({ id, title: titleTask, detail: detailTask }));
    //Reset the fields after updating the task
    setTitleTask("");
    setDetailTask("");
    //Close edit dialog box
    setShowEditDialog(false);
  };

  // Function to handle confirming the deletion of a task
  const handleConfirmDeleteTask = () => {
    dispatch(deleteTodo({ id: id }));
    //Close detele dialob box
    setShowDeleteDialog(false);
  };

  // Function to handle the completion button click
  const handleCompletedButtonClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
    setIsTaskCompleted((prevIsTaskCompleted) => !prevIsTaskCompleted);
  };

  return (
    <div className={styles.task_container} data-testid="task-container">
      <div className={styles.task_left}>
        <Title level="h3">{title}</Title>
        <Title level="h4">{detail}</Title>
      </div>

      <div className={styles.task_right}>
        {/* Button to edit task */}
        <ButtonTask
          imgSrc="/images/edit-purple.png"
          imgAlt="edit-icon"
          handleClick={() => {
            setShowEditDialog(true);
            setTitleTask(title);
            setDetailTask(detail);
          }}
        />
        {/* Edit Task Dialog */}
        <Dialog
          show={showEditDialog}
          title="Edit Task"
          titleTask={titleTask}
          detailTask={detailTask}
          warning="*Complete both fields before proceeding."
          onTitleTaskChange={(event) => setTask("title", event.target.value)}
          onDetailTaskChange={(event) => setTask("detail", event.target.value)}
          btnCancel={() => {
            setShowEditDialog(false);
            setTitleTask("");
            setDetailTask("");
          }}
          btnUpdate={handleUpdateTask}
        />
        {/* Button to delete task */}
        <ButtonTask
          imgSrc="/images/trash-purple.png"
          imgAlt="trash-icon"
          handleClick={() => setShowDeleteDialog(true)}
        />
        {/* Delete Task Dialog */}
        <Dialog
          show={showDeleteDialog}
          title="Delete Task"
          deleteConfirmation="Are you sure you want to delete this task ?"
          btnCancel={() => setShowDeleteDialog(false)}
          btnConfirm={handleConfirmDeleteTask}
        />
        {/* Button to mark task as completed */}
        <ButtonTask
          imgSrc={
            isTaskCompleted
              ? "/images/check-green.png"
              : "/images/check-purple.png"
          }
          imgAlt="check-icon"
          handleClick={handleCompletedButtonClick}
        />
      </div>
    </div>
  );
};

export default TaskItem;
