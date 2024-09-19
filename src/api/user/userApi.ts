import axios from "../apiInstance";


export const addCustomPostApi = async (payload: any) => {
    const response = await axios.post(`/customers/addNewCustomer`, payload);
    return response;
};

export const addCustomerPostApi = async (payload: any) => {
    const response = await axios.post('/save-user-data', payload);
    return response;
};

