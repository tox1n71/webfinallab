import {Alert, Button, Snackbar, Stack, TextField} from "@mui/material";
import {motion} from "framer-motion";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const UserForm = ({buttonText, url, formName, navigateTo}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate(); // Используйте хук useNavigate для навигации

    const isFormValid = username !== "" && password !== "";
    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        if (value === "") {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Закрытие Snackbar
    };

    const handleSubmit = async (e, url) => {
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'set_user', payload: { username: username, token: data.token } });
                console.log(data.message);
                navigate(navigateTo, {replace: true});
            } else {
                const error = await response.text();
                setResponseError(error);
                setSnackbarOpen(true);
                // здесь вы можете выполнить другие действия в случае ошибки
            }
        } catch (error) {

            console.error('Произошла ошибка при отправке запроса:', error);
            setResponseError("Сервер не отвечает, повторите попытку позже :(");
            setSnackbarOpen(true);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value === "") {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };
    return(
        <motion.form
            onSubmit={(e) => handleSubmit(e,url)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 1.5
            }}
        >
            <Stack direction="column" spacing={1.5} className={"user-form-stack"}>
                <h3>{formName}</h3>
                <TextField
                    label="Username"
                    variant="filled"
                    value={username}
                    onChange={handleUsernameChange}
                    error={usernameError}
                    helperText={usernameError ? "Введите имя пользователя" : ""}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                    helperText={passwordError ? "Введите пароль" : ""}
                />
                <Button size="medium" variant="outlined" type="submit" disabled={!isFormValid} >{buttonText}</Button>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}

                >
                    <Alert severity="error" sx={{ width: '100%'}}>
                        {responseError}
                    </Alert>
                </Snackbar>

            </Stack>
        </motion.form>
    )
}
export default UserForm;