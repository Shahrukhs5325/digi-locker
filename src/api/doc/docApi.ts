import axios from "../apiInstance";

export const uploadDocApi = async (payload: any) => {
    const response = await axios.post(`/upload-doc`, payload);
    return response;
};

export const getDocApi = async (payload: any) => {
    const response = await axios.post(`/get-doc-list`, payload);
    return response;
};

export const postSharedDocApi = async (payload: any) => {
    const response = await axios.post(`/share-doc`, payload);
    return response;
};

export const getSharedDocApi = async (payload: any) => {
    const response = await axios.post(`/get-share-docs`, payload);
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


export const getSharedViewLink = async (payload: any) => {
    const response = await axios.post(`/get-view-link`, payload);
    return response;
};

export const verifyDoctype = async (payload: any) => {
    const response = await axios.post(`/verify-doctype`, payload);
    return response;
};

export const getDocViewLink = async (payload: any) => {
    const response = await axios.post(`/get-view-link-of-upload-files`, payload);
    return response;
};