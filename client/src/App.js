import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/loginNewUser" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;