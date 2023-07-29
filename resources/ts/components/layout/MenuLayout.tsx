import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { FooterMenu } from "./FooterMenu";

export const MenuLayout = () => {
    const navigate = useNavigate();
    // const [cookie, setCookie] = useCookies();

    const checkCookie = () => {
        if (localStorage.getItem("kakebo")) {
            return localStorage.getItem("kakebo");
        } else {
            alert("ログインしてください");
            return "";
        }
    };

    return (
        <>
            {checkCookie() ? (
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
