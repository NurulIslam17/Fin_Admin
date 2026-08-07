import api from "./api";

const getPermissions = async (page = 1) => {
    const response = await api.get(`/configuration/permissions?page=${page}`);
    return response.data;
};

export default {
    getPermissions,
};