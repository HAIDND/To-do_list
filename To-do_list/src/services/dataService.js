const getLocalData = (nameSpace) => {
  const todolist = localStorage.getItem(nameSpace);
  if (todolist) {
    return JSON.parse(todolist);
  } else {
    localStorage.setItem(nameSpace, "[]");
    return [];
  }
};
const updateLocalData = (nameSpace, data) =>
  localStorage.setItem(nameSpace, JSON.stringify(data));
const removeLocalData = (nameSpace) => localStorage.removeItem(nameSpace);
export { getLocalData, updateLocalData, removeLocalData };
