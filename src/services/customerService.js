import api from "./api"

const getAll = async () => {
    const response = await api.get("/customer");
    return response?.data;
}

const addCustomer = async (data) => {
    const response = await api.post("customer", data);
    return response?.data;

}

export default {
    getAll,
    addCustomer
}