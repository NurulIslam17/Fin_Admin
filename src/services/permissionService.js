import api from "./api";

const getPermissions = async (page = 1) => {
    const response = await api.get(`/configuration/permissions?page=${page}`);
    return response.data;
};

const getPermissionsByRole = async (role_name) => {
    const response = await api.get(`configuration/permissions-by-role?role=${role_name}`);
    return response?.data;
}

const permissionSync = async (payload) => {
    const response = await api.post(`configuration/permissions-sync`, payload);
    return response?.data;
}

export default {
    getPermissions,
    getPermissionsByRole,
    permissionSync
};