import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { PropsWithChildren } from "react";
import Loading from "../components/ui/Loading";
import MainLayout from "../layout/MainLayout";

interface ProtectedRouteProps extends PropsWithChildren {
    role?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { user, isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) return <Loading />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // Check if user is authenticated and has admin role
    const isAuthorized =
        isAuthenticated && role?.includes(user?.accountType || "");

    if (!isAuthorized) return <Navigate to={"/unauthorized"} replace />;
    return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
