import todoReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  setShowCompleted,
} from ".";

describe("Todo Slice tests", () => {
  test("it should handle adding a todo", () => {
    const initialState = { todos: [], showCompleted: false };
    const action = addTodo({ title: "Test Todo", detail: "Test Detail" });
    const newState = todoReducer(initialState, action);

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].title).toBe("Test Todo");
    expect(newState.todos[0].completed).toBe(false);
  });

  test("it should handle updating a todo", () => {
    const initialState = {
      todos: [{ id: 1, title: "Todo 1", detail: "Detail 1", completed: false }],
      showCompleted: false,
    };
    const action = updateTodo({
      id: 1,
      title: "Updated Title",
      detail: "Updated Detail",
    });
    const newState = todoReducer(initialState, action);

    expect(newState.todos[0].title).toBe("Updated Title");
    expect(newState.todos[0].detail).toBe("Updated Detail");
  });

  test("it should handle deleting a todo", () => {
    const initialState = {
      todos: [{ id: 1, title: "Todo 1", detail: "Detail 1", completed: false }],
      showCompleted: false,
    };
    const action = deleteTodo({ id: 1 });
    const newState = todoReducer(initialState, action);

    expect(newState.todos).toHaveLength(0);
  });

  test("it should handle toggling a todo to be completed", () => {
    const initialState = {
      todos: [{ id: 1, title: "Todo 1", detail: "Detail 1", completed: false }],
      showCompleted: false,
    };
    const action = toggleComplete({ id: 1, completed: true });
    const newState = todoReducer(initialState, action);

    expect(newState.todos[0].completed).toBe(true);
  });

  test("it should handle setting showCompleted", () => {
    const initialState = { todos: [], showCompleted: false };
    const action = setShowCompleted(true);
    const newState = todoReducer(initialState, action);

    expect(newState.showCompleted).toBe(true);
  });
});
