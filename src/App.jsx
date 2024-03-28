import { Provider } from "react-redux";
import "./App.css";
import { HomePage } from "./pages/HomePage";
// import { NotFoundPage } from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
