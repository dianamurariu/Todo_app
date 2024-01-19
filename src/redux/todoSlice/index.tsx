import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a Todo item
interface Todo {
  id: number;
  title: string;
  detail: string;
  completed: boolean;
}

// Define the structure of the global state
export interface RootState {
  todos: Todo[];
  showCompleted: boolean;
}

// Function to get initial todos from local storage or return an empty array
const getInitialTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

// Function to get initial showCompleted value from local storage or return false
const getInitialShowCompleted = () => {
  const storedShowCompleted = localStorage.getItem("showCompleted");
  return storedShowCompleted ? JSON.parse(storedShowCompleted) : false;
};

// Initial state for the Redux slice
const initialState: RootState = {
  todos: getInitialTodos(),
  showCompleted: getInitialShowCompleted(),
};

// Define a Redux slice for todos
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Action to add a new todo
    addTodo: (
      state,
      action: PayloadAction<{ title: string; detail: string }>
    ) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        detail: action.payload.detail,
        completed: false,
      };
      // Update todos array and store it in local storage
      state.todos = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Action to update an existing todo
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; title: string; detail: string }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      // Update todos array and store it in local storage
      state.todos = state.todos.map((todo, i) =>
        i === index
          ? {
              ...todo,
              title: action.payload.title,
              detail: action.payload.detail,
            }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Action to delete a todo
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      // Remove the specified todo from todos array
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      // Update todos array and store it in local storage
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Action to toggle the completion status of a todo
    toggleComplete: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      // Update the completion status of the specified todo
      state.todos = state.todos.map((todo, i) =>
        i === index ? { ...todo, completed: action.payload.completed } : todo
      );
      // Update todos array and store it in local storage
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Action to set the 'showCompleted' todos list
    setShowCompleted: (state, action: PayloadAction<boolean>) => {
      // Update the showCompleted flag and store it in local storage
      state.showCompleted = action.payload;
      localStorage.setItem("showCompleted", JSON.stringify(action.payload));
    },
  },
});

export const {
  addTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
  setShowCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
