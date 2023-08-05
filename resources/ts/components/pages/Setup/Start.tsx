import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Setup.module.css";

export const Start = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    margin: "auto",
                }}
            >
                <Box
                    component="span"
                    sx={{
                        fontSize: "18px",
                        marginBottom: "50px",
                        textAlign: "center",
                    }}
                >
                    初期設定を行います
                </Box>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate("/setup-select");
                    }}
                    sx={{
                        height: "45px",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    次へ
                </Button>
            </Box>
        </div>
    );
};
