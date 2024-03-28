import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Portal from "./Portal";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/portal"
          element={
            <PrivateRoute>
              <Portal />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
