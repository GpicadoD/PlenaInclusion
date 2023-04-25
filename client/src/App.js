import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Barra from "./components/Navbar.js";
import ActivityProfile from "./components/ActivityProfile.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<><Barra/> <Dashboard/></>} />
          <Route path="/activityprofile" element={<><Barra/> <ActivityProfile/></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;