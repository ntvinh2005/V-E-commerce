import React from "react";
import './App.css'
import "react-datepicker/dist/react-datepicker.css";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Auth/Profile";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import { MallProvider } from "./contexts/MallContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Mall from "./components/Mall/Mall";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MallProvider>
            <Routes>
              {/* Private Route Profile*/}
              <Route
                exact
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>

              {/* Auth Route */}
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>

              <Route
                path="/forgotpassword"
                element={<ForgotPassword />}
              ></Route>

              {/*Personal Dashboard*/}
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/folder/:folderId"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/mall" element={<Mall></Mall>}></Route>
            </Routes>
          </MallProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
