import axios from "../apiInstance";

export const uploadDocApi = async (payload: any) => {
    const response = await axios.post(`/upload-doc`, payload);
    return response;
};

export const getDocApi = async (payload: any) => {
    const response = await axios.post(`/get-doc-list`, payload);
    return response;
};

export const getSharedDocApi = async (payload: any) => {
    const response = await axios.post(`/share-doc`, payload);
    return response;
};

export const deleteDocApi = async (payload: any) => {
    const response = await axios.post(`/delete-doc`, payload);
    return response;
};


export const deleteSharedDocApi = async (payload: any) => {
    const response = await axios.post(`/delete-shared-docs`, payload);
    return response;
};