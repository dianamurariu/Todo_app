import React, { useEffect } from "react";
import styles from "./todo-list.module.css";
import TaskItem from "../task_item";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setShowCompleted } from "../../redux/todoSlice";

const TodoList = () => {
  const dispatch = useAppDispatch();

  // Fetch the initial 'showCompleted' value from local storage and update the Redux store
  useEffect(() => {
    const storedShowCompleted = localStorage.getItem("showCompleted");
    if (storedShowCompleted !== null) {
      dispatch(setShowCompleted(false));
    }
  }, [dispatch]);
  //Fetch the todos from the store
  const todos = useAppSelector((state) => state.todos.todos);
  //Fetch the completed todos from the store
  const showCompleted = useAppSelector((state) => state.todos.showCompleted);
  // Filter the todos based on the 'showCompleted' prop
  const filteredTodos = showCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div data-testid="todo-list">
      {filteredTodos.length === 0 ? (
        // If there are no tasks, display a message
        <h2 className={styles.add_first_title}>Add a task ⬇</h2>
      ) : (
        // Otherwise, render the list of tasks
        <ul className={styles.todo_list__container}>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TaskItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                detail={todo.detail}
                completed={todo.completed}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
