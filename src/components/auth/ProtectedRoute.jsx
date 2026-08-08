import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FullPageLoader from "../common/FullPageLoader";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <FullPageLoader />;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}