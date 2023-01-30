import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Signin from "../pages/Signin";
const UserRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/signin" element={<Signin />} />

    {/* <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} /> */}
  </Routes>
);

export default UserRoutes;
