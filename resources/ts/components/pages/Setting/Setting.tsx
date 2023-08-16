import React, { useLayoutEffect } from "react";
import styles from "./Setting.module.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "@/util/firebase";

export const Setting = () => {
    const navigate = useNavigate();

    // 画面を上までスクロールさせる
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const logout = async () => {
        const res = window.confirm("ログアウトしてもよろしいですか？");
        if (res) {
            try {
                await auth.signOut();
                localStorage.removeItem("kakebo");
                alert("ログアウトしました");
                navigate("/login");
            } catch (err) {
                alert("ログアウトできませんでした");
            }
        }
    };
    return (
        <div className={styles.container}>
            <h2>設定</h2>
            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    sx={{
                        fontSize: "18px",
                        width: "80%",
                        marginBottom: "30px",
                    }}
                    onClick={() => {
                        navigate("/change-name");
                    }}
                >
                    表示名の変更
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        fontSize: "18px",
                        width: "80%",
                        marginBottom: "30px",
                    }}
                    onClick={() => {
                        navigate("/invite-group");
                    }}
                >
                    共有家計簿への招待
                </Button>
                <Button
                    variant="contained"
                    sx={{ fontSize: "18px", width: "80%" }}
                    onClick={logout}
                >
                    ログアウト
                </Button>
            </Box>
        </div>
    );
};
