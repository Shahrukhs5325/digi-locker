import axios from "../apiInstance";


export const addCustomerPostApi = async (payload: any) => {
    const response = await axios.post(`/customers/addNewCustomer`, payload);
    return response;
};

export const getCustomerByIdApi = async (id: number | string) => {
    const response = await axios.get(`/customers/getCustomerById?customerId=${id}`);
    return response;
};

