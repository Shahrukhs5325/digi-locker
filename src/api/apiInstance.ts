import axios from 'axios'
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://n94xfbiiv0.execute-api.us-east-1.amazonaws.com/secure-doc-dev';

const currentSession = async () => {
    try {
        const data = await Auth.currentSession();
        return data
    } catch (err) {
        console.log(err);
        return null;
    }
}

const instance = axios.create({
    baseURL: API_URL
})

// global request from all apis,
instance.interceptors.request.use(
    async (config) => {
        const lang = await AsyncStorage.getItem('language');
        const token = await currentSession();

        config.headers.Accept = "application/json";
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept-Language'] = lang;
 
        if (token) {
            config.headers.Authorization = `Bearer ${token?.accessToken?.jwtToken}`;
        }

        console.log("\n\n\n** url **\n", (API_URL + config?.url))
        // console.log("\n\n\n** token **\n",(token?.accessToken?.jwtToken))
        return config;
    },
    (error) => Promise.reject(error)
),

    // global response from all apis
    instance.interceptors.response.use(
        async (response) => {
            // console.log("\n\n\n** responseURL **\n", (response?.request?.responseURL))
            // console.log("** response **\n\n\n", (JSON.stringify(response?.data)))

            return response
        },

        (error) => {
            if ([401].includes(error.response.status)) {
                console.log("Invalid token or expired token.");

            }
            return Promise.reject(error)
        }
    )

export default instance