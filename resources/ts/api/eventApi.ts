import { EventID } from "../types";
import { axiosClient } from "./axiosClientProvider";

export const eventApi = {
    getAll: () => axiosClient.get("/events"),
    getOne: (id: number) => axiosClient.get(`/events/${id}`),
    create: (params: any) => axiosClient.post("/events", params),
    update: (params: any) => axiosClient.put("/events", params),
    delete: (param: EventID) => axiosClient.delete("/events", { data: param }),
};
