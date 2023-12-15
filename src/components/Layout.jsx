import React from 'react';
import {Link, Outlet} from "react-router-dom";

import '../styles/app.css';
import {useDispatch, useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";


const Layout = () => {
    const username = useSelector((state) => state.username);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const handleLogOut = () =>{
        dispatch({ type: 'remove_user', payload: {id: null, username: "", token: ""}})
        localStorage.removeItem("reduxState");

    }
    return (
        <>
            <div className={"psglgd"}>
                <div  className={"layot-title"}>
                    <h2 className={"layot-title"}>FinalBoss</h2>

                </div>
                {
                    token === ""
                        ?
                        <>
                            <Link to={"/"} className={"links-margin"}>Sign in</Link>
                            <Link to={"/register"} className={"links-margin"}>Sign up</Link>
                        </>
                        :
                        <div className="container">
                            <span className="username">{username}</span>
                            <AccountCircle className="account-icon" />
                            <Tooltip title="Sign out">
                                <Link to={"/"} className="link-margin" onClick={handleLogOut}>
                                    <LogoutIcon className="logout-icon" />
                                </Link>
                            </Tooltip>
                        </div>
                }

            </div>
            <Outlet/>

        </>
    );
}

export default Layout;