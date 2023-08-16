import { axiosClient } from "./axiosClient";

export const inviteApi = {
    getURL: () => axiosClient.get("/invite-group"),
};
