import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

type Props = {
    children: React.ReactNode;
};

export const AxiosClientProvider = (props: Props) => {
    const { children } = props;
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(["kakebo"]);

    useEffect(() => {
        console.log(cookie);
        const requestInterceptors = axiosClient.interceptors.request.use(
            (config: any) => {
                if (config.headers !== undefined) {
                    config.headers.Authorization = `Bearer ${cookie.kakebo}`;
                }
                return config;
            }
        );

        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                throw err.response;
            }
        );

        return () => {
            axiosClient.interceptors.request.eject(requestInterceptors);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return <>{children}</>;
};
