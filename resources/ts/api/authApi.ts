import { axiosClient } from "./axiosClient";

export const authApi = {
    login: (params: object) => axiosClient.post("/login", params),
    register: (params: object) => axiosClient.post("/register", params),
    joinRegister: (params: object) =>
        axiosClient.post("/join-register", params),
};
