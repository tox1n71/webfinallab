import React from "react";
import {Button, createTheme, Switch, ThemeProvider} from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {useNavigate, Route, Routes, Navigate} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import {useSelector} from "react-redux";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    const token = useSelector((state) => state.token);

    const isAuthenticated = token !== "";


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        {/* Сделать продуманую штуку, если авторизованый чел, то на mainpage
            если нет то на login*/}
                        <Route index element={!isAuthenticated ? <LoginPage/> : <Navigate to={"/main"}/>}/>

                        <Route path={"register"} element={!isAuthenticated ? <RegisterPage/> : <Navigate to={"/main"}/>}/>
                        <Route path={"main"} element={isAuthenticated ? <MainPage/> : <Navigate to={"/"}/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </>


    );
}

export default App;
