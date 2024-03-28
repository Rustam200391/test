export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log("Current state:", store.getState());
  localStorage.setItem("reduxState", JSON.stringify(store.getState())); // Исправлено "tasks" на "reduxState"
  console.log("Redux state saved to localStorage:", store.getState());
  return result;
};
