import api from "./api"


const getAllOfficeUsers = async () => {
    const response = await api.get("office-users");
    return response?.data;
}

export default {
    getAllOfficeUsers
};