import api from "./api";

const getRoles = async () => {
    const response = await api.get("/configuration/roles");
    return response.data;
};

export default {
    getRoles,
};