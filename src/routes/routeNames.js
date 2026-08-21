const ROUTES = {
    HOME: "/",

    LOGIN: "/login",
    REGISTER: "/register",

    DASHBOARD: "/dashboard",

    ROLES: "/roles",
    ROLE_CREATE: "/roles/create",
    ROLE_EDIT: "/roles/:id/edit",

    PERMISSIONS: "/permissions",
    MANAGE_ROLES: "/manage-roles",

    USER_LIST: "/users",

    PROFILE: "/profile",
    EDIT_PROFILE: "/profile/edit",
    CHANGE_PASSWORD: "/profile/change-password",

    CUSTOMER: "/customers",
    ACCOUNT: "/accounts",


    UNAUTHORIZED: "/403",

    NOT_FOUND: "*",
};

export default ROUTES;