import { BrowserRouter, Routes, Route } from "react-router-dom";

import ROUTES from "./routeNames";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";


import Roles from "../pages/roles/Roles";
import Permissions from "../pages/permissions/Permissions";
import NotFound from "../pages/errors/NotFound";
import ManagePermissions from "../pages/permissions/ManageRoles";
import ManageRoles from "../pages/permissions/ManageRoles";
import ProfileView from "../pages/profile/ProfileView";
import CustomerList from "../pages/customers/CustomerList";
import AccountList from "../pages/accounts/AccountList";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />

                {/* Protected */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<DashboardLayout />}>

                        <Route
                            path={ROUTES.DASHBOARD}
                            element={<Dashboard />}
                        />
                        <Route
                            path={ROUTES.ROLES}
                            element={<Roles />}
                        />

                        <Route
                            path={ROUTES.PERMISSIONS}
                            element={<Permissions />}
                        />

                        <Route
                            path={ROUTES.MANAGE_ROLES}
                            element={<ManageRoles />}
                        />

                        <Route
                            path={ROUTES.PROFILE}
                            element={<ProfileView />}
                        />

                        <Route
                            path={ROUTES.CUSTOMER}
                            element={<CustomerList />}
                        />

                        <Route
                            path={ROUTES.ACCOUNT}
                            element={<AccountList />}
                        />


                        {/*

                        <Route
                            path={ROUTES.ROLE_CREATE}
                            element={<CreateRole />}
                        />

                        <Route
                            path={ROUTES.ROLE_EDIT}
                            element={<EditRole />}
                        />

                        <Route
                            path={ROUTES.EDIT_PROFILE}
                            element={<EditProfile />}
                        />

                        <Route
                            path={ROUTES.CHANGE_PASSWORD}
                            element={<ChangePassword />}
                        /> */}

                    </Route>

                </Route>

                {/* <Route
                    path={ROUTES.UNAUTHORIZED}
                    element={<Unauthorized />}
                /> */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}