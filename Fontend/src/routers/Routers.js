import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Note from "../pages/Note";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NoteDetails from "../pages/NoteDetails";
import Favorite from "../pages/Favorite";
import AddNote from "../pages/AddNote";
import PageNotFound from "../pages/404Page";
import AddNotes from "../admin/AddNotes";
import AllNotes from "../admin/AllNotes";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import Category from "../admin/Category";
import NoteApprove from "../admin/NoteApprove";
import User from "../admin/User";
import RequireAuth from "../auth/RequireAuth";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="note" element={<Note />} />
      <Route path="note/:id" element={<NoteDetails />} />
      <Route path="favorite" element={<Favorite />} />
      <Route
        path="add-note"
        element={
          <RequireAuth>
            <AddNote />
          </RequireAuth>
        }
      />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route path="all-notes" element={<AllNotes />} />
        <Route path="category" element={<Category />} />
        <Route path="approve" element={<NoteApprove />} />
        <Route path="users" element={<User />} />
      </Route>
    </Routes>
  );
};

export default Routers;
