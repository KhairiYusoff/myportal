import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Portal from "./Portal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </div>
  );
}

export default App;
