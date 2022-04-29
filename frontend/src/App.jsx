import React, { useContext } from "react";
// import Home from "@pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Feed from "@components/feed/feed";
import FullPage from "@components/fullpage/fullPage";
import Vimeo from "@components/Vimeo/vimeo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgetPassword from "./pages/ForgetPassword";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
// import Weather from "./components/Weather";
import Topbar from "./components/navbar/topbar";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userToken");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // setUser(foundUser);
      dispatch({ type: "LOGIN_SUCCESS", payload: foundUser.data });
      console.log("you are logged in");
    } else {
      //  REDIRECT TO LOGIN
      // return <Navigate to="/register" />;
      return;
    }
  }, []);
  return (
    <BrowserRouter>
      <nav className="App">
        <Topbar />
      </nav>
      <div className="bodyContainer">
        <Routes>
          {/* <Route exact path="/" element={<FullPage />}>
            <Route path="" element={<Feed />} />
            <Route path="vimeo" element={<Vimeo />} />
          </Route> */}

          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <FullPage />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Feed />} />
            <Route path="vimeo" element={<Vimeo />} />
          </Route>
          {/* <Route exact path="/" element={user ? <FullPage /> : <Login />}>
            <Route path="" element={<Feed />} />
            <Route path="vimeo" element={<Vimeo />} />
            {<Route path='weather' element={<Weather />} />}
          </Route> */}
          {/* <Route
            path="/"
            element={ */}

          {/* } */}
          {/* /> */}

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Registration />}
          />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
