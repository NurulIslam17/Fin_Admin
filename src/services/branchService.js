import api from "./api"

const getAllBranch = async (params = {}) => {
    const response = await api.get("/branches", { params });
    return response?.data;
};

export default {
    getAllBranch
}