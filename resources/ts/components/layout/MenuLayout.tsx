import { Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { FooterMenu } from "./FooterMenu";

export const MenuLayout = () => {
    // const [cookie, setCookie] = useCookies();

    const checkToken = () => {
        if (localStorage.getItem("kakebo")) {
            return localStorage.getItem("kakebo");
        } else {
            alert("ログインしてください");
            return "";
        }
    };

    return (
        <>
            {checkToken() ? (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        position: "absolute",
                        top: "0",
                    }}
                >
                    <Box sx={{ flexGrow: 1, width: "max-content" }}>
                        <Outlet />
                    </Box>
                    <Box sx={{ width: "max-content" }}>
                        <FooterMenu />
                    </Box>
                </Box>
            ) : (
                <Navigate to={"/login"} />
            )}
        </>
    );
};
