import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { Register } from "./components/pages/Auth/Register";
import { Login } from "./components/pages/Auth/Login";
import { EventRegister } from "./components/pages/EventRegister";
import { AuthLayout } from "./components/layout/AuthLayout";
import { NoMenuLayout } from "./components/layout/NoMenuLayout";
import { EventEdit } from "./components/pages/EventEdit";
import { MenuLayout } from "./components/layout/MenuLayout";
import { Calendar } from "./components/pages/Calendar";
import { Graph } from "./components/pages/Graph";
import { ChangeName } from "./components/pages/Setting/ChangeName";
import { Setting } from "./components/pages/Setting/Setting";
import { Loading } from "./components/pages/Loading";
import { InviteGroup } from "./components/pages/Setting/InviteGroup";
import { JoinRegister } from "./components/pages/Auth/JoinRegister";

const App = () => {
    return (
        <div id="main">
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route
                                path="join-register/:group"
                                element={<JoinRegister />}
                            />
                        </Route>

                        <Route path="/" element={<NoMenuLayout />}>
                            <Route
                                path="event-edit/:id"
                                element={<EventEdit />}
                            />
                            <Route
                                path="change-name"
                                element={<ChangeName />}
                            />
                            <Route
                                path="invite-group"
                                element={<InviteGroup />}
                            />
                        </Route>
                        <Route path="/" element={<MenuLayout />}>
                            <Route
                                path="event-register"
                                element={<EventRegister />}
                            />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="graph" element={<Graph />} />
                            <Route path="setting" element={<Setting />} />
                            <Route path="loading/:base" element={<Loading />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
