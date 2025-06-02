import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages
const MainLayout = lazy(() => import("../layout/MainLayout"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage"));
const HomePage = lazy(() => import("../pages/public/home"));
const HotelsPage = lazy(() => import("../pages/public/hotels"));
const HotelDetailsPage = lazy(
    () => import("../pages/public/hotels/HotelDetailsPage")
);
const PlanesPage = lazy(() => import("../pages/public/planes"));
const BlogsPage = lazy(() => import("../pages/public/blogs"));
const BlogPreviewPage = lazy(
    () => import("../pages/public/blogs/BlogPreviewPage")
);
const QuestionsPage = lazy(() => import("../pages/public/questions"));
const PrivacyPage = lazy(() => import("../pages/public/privacy"));
const TermsPage = lazy(() => import("../pages/public/terms"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const ResetPasswordPage = lazy(() => import("../pages/auth/resetPassword"));
const ProfilePage = lazy(() => import("../pages/auth/profile"));

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes With Layout*/}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/* Hotels */}
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/hotels/:id" element={<HotelDetailsPage />} />
                {/* Planes */}
                <Route path="/planes" element={<PlanesPage />} />

                {/* Blogs */}
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:id" element={<BlogPreviewPage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Auth */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Catch-All for Undefined Routes */}
            <Route path="*" element={<NotFoundPage />} />

            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
    );
}

export default AppRoutes;
