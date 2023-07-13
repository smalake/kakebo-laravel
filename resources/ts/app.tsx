import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { TopPage } from "./components/TopPage";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";

const App = () => {
    const title: string = "Hello TypeScript React";
    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
