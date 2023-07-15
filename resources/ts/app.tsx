import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { Register } from "./components/pages/Auth/Register";
import { Login } from "./components/pages/Auth/Login";
import { EventRegister } from "./components/pages/EventRegister";
import { AuthLayout } from "./components/layout/AuthLayout";

const App = () => {
    const title: string = "Hello TypeScript React";
    return (
        <div id="main">
            <RecoilRoot>
                <CookiesProvider>
            <BrowserRouter>
                <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                </Routes>
            </BrowserRouter>
                </CookiesProvider>
            </RecoilRoot>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
