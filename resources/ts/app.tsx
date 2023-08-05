import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { Register } from "./components/pages/Auth/Register";
import { Login } from "./components/pages/Auth/Login";
import { EventRegister } from "./components/pages/EventRegister";
import { AuthLayout } from "./components/layout/AuthLayout";
import { SetupCheck } from "./components/layout/SetupCheck";
import { NoMenuLayout } from "./components/layout/NoMenuLayout";
import { EventEdit } from "./components/pages/EventEdit";
import { MenuLayout } from "./components/layout/MenuLayout";
import { EventLayout } from "./components/layout/EventLayout";
import { Calendar } from "./components/pages/Calendar";
import { Graph } from "./components/pages/Graph";
import { ChangeName } from "./components/pages/Setting/ChangeName";
import { Setting } from "./components/pages/Setting/Setting";
import { Start } from "./components/pages/Setup/Start";
import { Select } from "./components/pages/Setup/Select";
import { Create } from "./components/pages/Setup/Create";
import { CreateOK } from "./components/pages/Setup/CreateOK";
// import { AxiosClientProvider } from "./api/axiosClientProvider";

const App = () => {
    return (
        <div id="main">
            <RecoilRoot>
                <CookiesProvider>
                    <BrowserRouter>
                        {/* <AxiosClientProvider> */}
                        <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path="/" element={<SetupCheck />}>
                                <Route path="/" element={<NoMenuLayout />}>
                                    <Route
                                        path="event-edit/:id"
                                        element={<EventEdit />}
                                    />
                                    <Route
                                        path="change-name"
                                        element={<ChangeName />}
                                    />
                                </Route>
                                <Route path="/" element={<MenuLayout />}>
                                    <Route
                                        path="event-register"
                                        element={<EventRegister />}
                                    />
                                    <Route path="/" element={<EventLayout />}>
                                        <Route
                                            path="calendar"
                                            element={<Calendar />}
                                        />
                                        <Route
                                            path="graph"
                                            element={<Graph />}
                                        />
                                    </Route>
                                    <Route
                                        path="setting"
                                        element={<Setting />}
                                    />
                                </Route>
                            </Route>
                            <Route path="/" element={<NoMenuLayout />}>
                                <Route path="setup" element={<Start />} />
                                <Route
                                    path="setup-select"
                                    element={<Select />}
                                />
                                <Route
                                    path="setup-create"
                                    element={<Create />}
                                />
                                <Route
                                    path="setup-complete"
                                    element={<CreateOK />}
                                />
                            </Route>
                        </Routes>
                        {/* </AxiosClientProvider> */}
                    </BrowserRouter>
                </CookiesProvider>
            </RecoilRoot>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
