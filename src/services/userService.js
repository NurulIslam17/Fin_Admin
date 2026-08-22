import api from "./api"


const getAllOfficeUsers = async (params = {}) => {
    const response = await api.get("office-users", { params });
    return response?.data;
}

const addOfficeUser = async (data) => {
    const response = await api.post("user", data);
    return response?.data;
}

export default {
    getAllOfficeUsers,
    addOfficeUser
};