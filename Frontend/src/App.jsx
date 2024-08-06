// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Chat from "./pages/Chat";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import {Loader} from "./components/shared/Loader";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";
// let user = false;

const App = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}api/v1/auth/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route
          element={
            <SocketProvider>
              <PrivateRoute user={user} redirect="/login" />
            </SocketProvider>
          }
        >
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute user={!user} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster postition="bottom-center" />
    </Router>
  );
};

export default App;
