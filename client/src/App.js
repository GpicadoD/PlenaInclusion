import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;