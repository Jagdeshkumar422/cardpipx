import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./Pages/Profile";
import DashboardDirectRoute from "./components/DashboardDirectRoute";
import DepositToken from "./components/DepositToken.jsx";
import WithdrawPage from "./components/WithdrawPage.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";
import AdminProfile from "./components/AdminProfile.jsx";
const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Route - Only accessable when Login */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<DepositToken />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
        </Route>

        {/* Admin Only Dashboard */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/adminDash" element={<AdminDashboard />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
        </Route>

        {/* Can not be accessable after login */}
        <Route element={<DashboardDirectRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>


      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
