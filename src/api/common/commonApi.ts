import instance from "../apiInstance";

export const getActivationCodeDetails = async (code: any) => {

    const response = await instance.get(`/customers/getActivationCodeDetails?activationCode=${code}`);

    return response;
};


export const getAllCity = async (user: any) => {
    const response = await instance.get(`/cities/getAllCities?countryId=${user?.countryId}`);

    return response;
};


export const getNearByStores = async (user: any, location: any) => {
    // const response = await instance.get(`/customers/getNearByStores?latitude=${location?.coords?.latitude ? location?.coords?.latitude : ""}&longitude=${location?.coords?.longitude ? location?.coords?.longitude : ""}&distance=${150}&clientId=${user?.correlationId ? user?.correlationId : "1"}&countryCode=${user?.countryId}`);

    const response = await instance.get(`/customers/getNearByStores?latitude=${"24.7136"}&longitude=${"46.6753"}&distance=${100}&clientId=${user?.correlationId ? user?.correlationId : "1"}&countryCode=${user?.countryId}`);

    return response;
};

export const getStoresByCityName = async (user: any, cityName: any) => {
    const response = await instance.get(`/customers/getStoresByCityName?countryId=${155}&cityName=${cityName}&clientId=${user?.correlationId}`);
    return response;
};

export const getNearByCoupon = async (user: any, location: any) => {
    // const response= await instance.get(`/customers/getNearByCoupon?latitude=${location?.coords?.latitude ? location?.coords?.latitude : ""}&longitude=${location?.coords?.longitude ? location?.coords?.longitude : ""}&distance=${DEFAULT_DISTANCE}&clientId=${user?.correlationId ? user?.correlationId : DEFAULT_CLIENT_ID}&couponTypeName=Promo Code&countryCode=${user?.countryId}`);
    const response = await instance.get(`/customers/getNearByCoupon?latitude=${24.7136}&longitude=${46.6753}&distance=${100}&clientId=${user?.correlationId ? user?.correlationId : "1"}&couponTypeName=Vallet Card&countryCode=${user?.countryId}`);

    return response;
};

export const getCustomerCoupons = async (user: any,) => {
    const response = await instance.get(`/customers/getCustomerCoupons?customerId=${user?.customerId}&couponTypeName=Vallet Card&generic=Unique`);

    return response;
};

export const getCustomerCouponsByStoreIdNMerchantId = async (user: any, store: any) => {
    const response = await instance.get(`/customers/getCustomerCouponsByStoreIdNMerchantId?customerId=${user?.customerId}&couponTypeName=Vallet Card&merchantId=${store?.merchantId}&storeId=${store?.storeId}`);

    return response;
};

export const getTransactionByCustomerId = async (user: any,) => {
    const response = await instance.get(`/customers/getTransactionByCustomerId?customerId=${user?.customerId}&couponTypeName=Vallet Card`);

    return response;
};

export const redeemCouponByqrCode = async (payload: any) => {
    const response = await instance.post(`/customers/redeemCouponByqrCode`, payload);
    return response;
};

// export const getStoresByMerchantId = async (merchantId: number, temId: any) => {
//     const response = await instance.get(`/customers/getStoresByMerchantId?merchantId=${merchantId}&couponId=${temId}`);

//     return response;
// };


export const getClientTheme = async (id: any,) => {
    const response = await instance.get(`/customers/getClientTheme?clientId=${id}`);

    return response;
};