import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "../../../views/private/HomeView";
import UserProfileView from "../../../views/private/UserProfileView";
import LoginView from "../../../views/public/LoginView";
import NotFound from "../../common/NotFound";
import PrivatePageLayout from "../../layouts/PrivatePageLayout";
import PublicRoute from "../PublicRoute/PublicRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginView />
            </PublicRoute>
          }
        />
        <Route path="/" element={<PrivatePageLayout />}>
          <Route path="home" index element={<HomeView />} />
          <Route path="profile/:username" element={<UserProfileView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
