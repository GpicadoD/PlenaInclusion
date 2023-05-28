
// Import all the components into the App, in the case of the Navbar, it's just necessary import it just as it is because its a persistent element in the web
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import ProtoDash from "./components/ProtoDash.js";
import Barra from "./components/Navbar.js";
import ActivityProfile from "./components/ActivityProfile.js";
import UserProfile from "./components/UserProfile.js";
import AddNewUser from "./components/AddUser.js";

//Lacal
import AddNewActivity from "./components/AddActivity.js";

import AddImage from "./components/AddImage.js";
import ShowImage from "./components/ShowImage.js";

import ActivityInfo from "./components/ActivityInfo.js";
import AddNewActivity from "./components/AddActivity.js";
import Pie from "./components/Footer.js";

// App has many components like Login or Dashboard inside so it can be reached with the url or buttons with their links
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/activityprofile" element={<><Barra/><ActivityProfile/><Pie/></>} />
          <Route path="/userprofile" element={<><Barra/> <UserProfile/></>} />
          <Route path="/dashboard" element={<><Barra/><Dashboard/><Pie/></>} />
          <Route path="/addnewuser" element={<><Barra/><AddNewUser/></>} />
//lacal
          <Route path="/addnewActivity" element={<><Barra/><AddNewActivity/></>} />

          <Route path="/addnewactivity" element={<><Barra/><AddNewActivity/></>} />
          <Route path="/protodash" element={<><Barra/><ProtoDash/><Pie/></>} />
          <Route path="/addImage" element={<><Barra/><AddImage/></>} />
          <Route path="/showImage" element={<><Barra/><ShowImage/></>} />
          <Route path="/protodash" element={<><Barra/><ProtoDash/></>} />
          <Route path="/ActivityInfo" element={<><Barra/><ActivityInfo/></>} />
          {/*Medio apaño para hacer funcionar el login como primera página de React*/}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Then the App is exported into the index.js
export default App;