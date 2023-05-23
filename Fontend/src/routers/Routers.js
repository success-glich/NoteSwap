import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Note from "../pages/Note";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NoteDetails from "../pages/NoteDetails";
import AddNote from "../pages/AddNote";
import PageNotFound from "../pages/404Page";
// import AddNotes from "../pages/admin/AddNotes";
import AllNotes from "../pages/admin/AllNotes";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import NoteApprove from "../pages/admin/NoteApprove";
import RequireAuth from "../auth/RequireAuth";
import RequireAdminAuth from "../auth/RequireAdminAuth";
import User from "../pages/admin/User";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="note" element={<Note />} />
      <Route path="note/:id" element={<NoteDetails />} />
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
          <>
            <RequireAdminAuth>
              {" "}
              <Dashboard />
            </RequireAdminAuth>
          </>
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
