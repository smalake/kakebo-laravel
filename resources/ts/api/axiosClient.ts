import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config: any) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        throw err.response;
    }
);
