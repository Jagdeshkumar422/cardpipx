import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const DashboardDirectRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    // If no user is logged in, allow access to sign-in/register pages
    if (!currentUser) {
        return <Outlet />;
    }

    // If a user is logged in, redirect based on role
    return currentUser.isAdmin ? (
        <Navigate to="/adminDash?tab=dash" replace />
    ) : (
        <Navigate to="/dashboard" replace />
    );
};

export default DashboardDirectRoute;
