import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

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
          {/* 해당 path에서 다음 메소드가 실행되도록*/ }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;