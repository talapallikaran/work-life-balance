const FIRST_TODO = 0;
export const ensureTodoData = (data) => {
  const todosFromStorage = localStorage.getItem("todos");
  let todoData = [];
  if (todosFromStorage) {
    const parseTodo = JSON.parse(todosFromStorage);
    todoData = parseTodo;
    todoData.push({
      id: parseTodo.length + 1,
      ...data,
    });
  } else {
    todoData.push({
      id: FIRST_TODO,
      ...data,
    });
  }
  // Update storage before returning data
  localStorage.setItem("todos", JSON.stringify(todoData));
  return todoData;
};
