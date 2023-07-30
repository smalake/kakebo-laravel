import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setupApi } from "@/api/setupApi";
import styles from "./Setup.module.css";
import { useRecoilState } from "recoil";
import { checkAtom } from "@/recoil/CheckAtom";

export const Create = () => {
    const navigate = useNavigate();
    const [check, setCheck] = useRecoilState(checkAtom);
    const setup = async () => {
        try {
            // 家計簿を作成する
            const res = await setupApi.create();
            if (res.status === 200) {
                // Atomに保存
                setCheck((prevCheck) => ({
                    ...prevCheck,
                    setup: Number(res.data.data),
                }));
                navigate("/setup-complete");
            } else {
                alert(
                    "家計簿の作成に失敗しました\nお手数ですが、サポートにご連絡ください"
                );
                console.log(res);
            }
        } catch (err: any) {
            if (err.status === 401) {
                alert("認証エラー\n再ログインしてください");
                navigate("/login");
            } else {
                alert(
                    "家計簿の作成に失敗しました\nお手数ですが、サポートにご連絡ください"
                );
                console.log(err);
            }
        }
    };
    return (
        <div className={styles.container}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    alignItems: "center",
                    margin: "auto",
                }}
            >
                <Box
                    component="h2"
                    sx={{ position: "relative", bottom: "50px" }}
                >
                    家計簿を新規作成します
                </Box>
                <Button
                    variant="contained"
                    onClick={setup}
                    sx={{
                        width: "70%",
                        height: "45px",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    作成する
                </Button>
            </Box>
        </div>
    );
};
