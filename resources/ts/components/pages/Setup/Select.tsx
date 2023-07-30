import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Setup.module.css";

export const Select = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Box
                sx={{ display: "flex", flexDirection: "column", width: "60%" }}
            >
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate("/setup-create");
                    }}
                    sx={{
                        marginBottom: "40px",
                        height: "45px",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    共有家計簿を作成する
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate("/setup-join");
                    }}
                    sx={{
                        height: "45px",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    共有家計簿に参加する
                </Button>
            </Box>
        </div>
    );
};
