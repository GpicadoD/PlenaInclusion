import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/*Medio apaño para hacer funcionar el login como primera página de React*/}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
