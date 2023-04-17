import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/" element={LandingPage()}/>
           
          <Route exact path="/login" element={LoginPage()}/>
          
          <Route exact path="/register" element={RegisterPage()}/>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;