import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidation } from "@/util/validation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/util/firebase";
import styles from "./Auth.module.css";
import { FirebaseError } from "firebase/app";
import { authApi } from "@/api/authApi";
import { googleLogin } from "@/util/googleLogin";
import { Button, TextField } from "@mui/material";
import { RegisterForm } from "@/types";

export const JoinRegister = () => {
    const navigate = useNavigate();
    const { group } = useParams();

    // react-hook-formの設定
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({ resolver: zodResolver(registerValidation) });

    // メールアドレスで新規登録ボタンが押されたときの処理
    const onSubmit = async (data: RegisterForm) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const token = await userCredential.user.getIdToken(true); // トークンを取得
            const uid = userCredential.user.uid;
            // DBに新規登録
            const registerData = {
                uid: uid,
                name: data.name,
                type: 1,
                group: group,
            };
            apiRegister(registerData, token);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/email-already-in-use") {
                    alert("すでに使用されているメールアドレスです");
                } else {
                    alert(err);
                }
            } else {
                alert(err);
            }
        }
    };

    // Googleで新規登録ボタンが押されたときの処理
    const handleGoogle = async () => {
        try {
            // googleアカウントにログインして登録を行う
            const { uid, token, name } = await googleLogin();
            if (token !== undefined) {
                const registerData = {
                    uid: uid,
                    name: name,
                    type: 2,
                    group: group,
                };
                apiRegister(registerData, token);
            }
        } catch (err) {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/popup-closed-by-user") {
                    // ユーザがキャンセルした場合
                    // 何も処理を行わない
                } else {
                    alert(err);
                }
            } else {
                alert(err);
            }
        }
    };

    //APIサーバへのユーザ新規登録処理
    const apiRegister = async (data: object, token: string) => {
        try {
            const res = await authApi.joinRegister(data);
            if (res.status === 200) {
                localStorage.setItem("kakebo", token);
                navigate("/event-register");
            } else {
                alert("新規登録に失敗しました");
            }
        } catch (err) {
            alert("エラーが発生しました");
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <h2>新規登録フォーム</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form}>
                    <TextField
                        id="email"
                        label="メールアドレス"
                        {...register("email")}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        sx={{ width: "90%" }}
                    />
                </div>
                <div className={styles.form}>
                    <TextField
                        id="name"
                        label="表示名"
                        {...register("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        sx={{ width: "90%" }}
                    />
                </div>
                <div className={styles.form}>
                    <TextField
                        id="password"
                        label="パスワード"
                        type="password"
                        {...register("password")}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        sx={{ width: "90%" }}
                    />
                </div>
                <div className={styles.form}>
                    <TextField
                        id="confirmPassword"
                        label="確認用パスワード"
                        type="password"
                        {...register("confirmPassword")}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}
                        sx={{ width: "90%" }}
                    />
                </div>
                <div className={styles.form}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="info"
                        sx={{
                            width: "90%",
                            height: "45px",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        メールアドレスで新規登録
                    </Button>
                </div>
            </form>
            <p className={styles.subText}>または</p>
            <div className={styles.form}>
                <button className={styles.google} onClick={handleGoogle}>
                    Googleアカウントで新規登録
                </button>
            </div>
        </div>
    );
};
