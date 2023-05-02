// Import all the components into the App, in the case of the Navbar, it's just necessary import it just as it is because its a persistent element in the web
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import ProtoDash from "./components/ProtoDash.js";
import Barra from "./components/Navbar.js";
import ActivityProfile from "./components/ActivityProfile.js";
import AddNewUser from "./components/AddUser.js";

// App has many components like Login or Dashboard inside so it can be reached with the url or buttons with their links
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/activityprofile" element={<><Barra/> <ActivityProfile/></>} />
          <Route path="/dashboard" element={<><Barra/><Dashboard/></>} />
          <Route path="/addnewuser" element={<><Barra/><AddNewUser/></>} />
          <Route path="/protodash" element={<><Barra/><ProtoDash/></>} />
          {/*Medio apaño para hacer funcionar el login como primera página de React*/}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Then the App is exported into the index.js
export default App;
