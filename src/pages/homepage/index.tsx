import React, { useState } from "react";
import Header from "../../components/header";
import NavBar from "../../components/nav_bar";
import styles from "./homepage.module.css";
import ButtonAdd from "../../components/button_add";
import Dialog from "../../components/dialog";
import TodoList from "../../components/todo-list";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo } from "../../redux/todoSlice";

const Homepage = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const [detailTask, setDetailTask] = useState("");
  const dispatch = useAppDispatch();

  // Set task title and detail based on the field type
  const setTask = (field: "title" | "detail", value: string) => {
    if (field === "title") {
      setTitleTask(value);
    } else if (field === "detail") {
      setDetailTask(value);
    }
  };
  // Function to handle adding a task
  const handleAddTask = () => {
    dispatch(
      addTodo({
        title: titleTask,
        detail: detailTask,
      })
    );
    //Reset the fields after adding the task
    setTitleTask("");
    setDetailTask("");
    //Close add dialog box
    setShowAddDialog(false);
  };

  return (
    <div
      className={styles.homepage__container}
      data-testid="homepage-container"
    >
      <div data-testid="header-container">
        <Header />
      </div>

      <div className={styles.tasks__container}>
        <TodoList />
      </div>

      <div className={styles.btn_add_task} data-testid="button-container">
        <ButtonAdd handleClick={() => setShowAddDialog(true)} />
      </div>

      <Dialog
        show={showAddDialog}
        title="Add Task"
        titleTask={titleTask}
        detailTask={detailTask}
        warning="*Complete both fields before proceeding."
        onTitleTaskChange={(event) => setTask("title", event.target.value)}
        onDetailTaskChange={(event) => setTask("detail", event.target.value)}
        btnCancel={() => {
          setShowAddDialog(false);
          setTitleTask("");
          setDetailTask("");
        }}
        btnAdd={handleAddTask}
      />

      <div className={styles.nav_bar__container} data-testid="navbar-container">
        <NavBar />
      </div>
    </div>
  );
};

export default Homepage;
