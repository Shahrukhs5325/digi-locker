import axios from "../apiInstance";

export const postDocApi = async (payload: any) => {
    const response = await axios.post(`/upload-doc`, payload);
    return response;
};

export const getDocApi = async (payload: any) => {
    const response = await axios.post(`/get-doc-list`,payload);
    return response;
};