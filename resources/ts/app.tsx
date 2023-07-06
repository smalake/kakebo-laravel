import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { TopPage } from "./components/TopPage";
import { PostPage } from "./components/PostPage";

const App = () => {
    const title: string = "Hello TypeScript React";
    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/posts" element={<PostPage />} />
                </Routes>
                <ul>
                    <li>
                        <Link to="/">Top</Link>
                    </li>
                    <li>
                        <Link to="/posts">Post</Link>
                    </li>
                </ul>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
