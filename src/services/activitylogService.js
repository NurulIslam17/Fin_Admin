import api from "./api";

const getActivityLog = async (params = {}) => {

    const response = await api.get("activities/all", { params })
    return response?.data;

}


export default {
    getActivityLog
};