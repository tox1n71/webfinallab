import {Link} from "react-router-dom";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import React from "react";


const RegisterPage = () =>{
    return(
        <div>
            <Header/>
            <UserForm navigateTo={"/"} buttonText={"Подтвердить"} url={"http://89.104.70.26:8080/users/registration"} formName={"Регистрация"}/>
        </div>
    )
}
export default RegisterPage;