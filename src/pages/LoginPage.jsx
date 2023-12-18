import React, {useState} from 'react';
import {Alert, Button, createTheme, Snackbar, Stack, TextField} from "@mui/material";
import {ThemeProvider} from "@mui/material";
import {motion} from "framer-motion";
import '../styles/app.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import UserForm from "../components/UserForm";


const LoginPage = () => {

    return (
       <>
            <Header/>
            <UserForm navigateTo={"/main"} buttonText={"Войти"} url={"http://89.104.70.26:8080/users/login"} formName={"Авторизация"}/>
        </>

    );
};

export default LoginPage;