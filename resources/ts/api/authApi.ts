import { axiosClient } from "./axiosClient";

export const authApi = {
    register: (params: object) => axiosClient.post("/register", params),
    login: (params: object) => axiosClient.post("/login", params),
};
