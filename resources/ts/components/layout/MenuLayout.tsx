import { Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { FooterMenu } from "./FooterMenu";

export const MenuLayout = () => {
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
                <Box>
                    <Box>
                        <Box sx={{ paddingBottom: "60px" }}>
                            <Outlet />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: "60px",
                            position: "fixed",
                            bottom: "0",
                        }}
                    >
                        <FooterMenu />
                    </Box>
                </Box>
            ) : (
                <Navigate to={"/login"} />
            )}
        </>
    );
};
