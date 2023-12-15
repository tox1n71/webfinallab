import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    InputLabel, MenuItem, Select, Stack, TextField,
} from "@mui/material";
import {useSelector} from "react-redux";

const MainForm = ({drawShapesByR, drawPoint, onRChange, canvasRef, rValue, setRValue, addToTable}) => {
    const xOption = ['-2','-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
    const rOption = ['0.5', '1', '1.5', '2'];

    const [xValue, setXValue] = useState('');
    // const [rValue, setRValue] = useState('');
    const [yValue, setYValue] = useState('');
    const [isYError, setYError] = useState(false);
    const token = useSelector((state) => state.token);




    let isFormValid = xValue !== '' && rValue !== '' && yValue !== '' && yValue < 6 && yValue > -6;
    const handleYValueChange = (event) => {
        const value = event.target.value;

        // Проверяем, входит ли значение в диапазон от -5 до 5
        if (value < -5 || value > 5) {
            isFormValid = false;
            setYError(true);
        } else {
            setYError(false);
        }
        setYValue(value);
    };
    const handleXValueChange = (event) => {
        const value = event.target.value;
        setXValue(value);

    };
    const handleRValueChange = (event) => {
        const value = event.target.value;
        setRValue(value);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawShapesByR(canvas, context, value, true);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/points/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Помещение JWT токена в заголовок Authorization
            },
            body:JSON.stringify({
                x: xValue,
                y: yValue,
                r: rValue
            })
        })
            .then((response) => response.json())
            .then((data) =>{
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                drawPoint(canvas, context, xValue, yValue, data.result);
                addToTable(data);
            })
            .catch((error) => console.log(error));


        console.log("x: ", xValue, "y: ", yValue, "r: ", rValue)
    }
    //

    return (
        <form className={"xyr-form"} onSubmit={(e) => handleSubmit(e)}
        >
            <Stack className={"main-form"} spacing={2}>
                <FormControl fullWidth size={"small"}>
                    <InputLabel id="x-label">Choose X</InputLabel>
                    <Select
                        labelId={"x-label"}
                        label={"Choose X"}
                        variant={"outlined"}
                        onChange={handleXValueChange}
                        value={xValue}
                    >
                        {xOption.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                            >{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    label={"Choose Y"}
                    size={"small"}
                    type={"number"}
                    value={yValue}
                    onChange={handleYValueChange}
                    error={isYError}
                    helperText={isYError ? "Значение должно быть в диапазоне от -5 до 5" : ""}
                />
                <FormControl fullWidth size={"small"}>
                    <InputLabel id="r-label">Choose R</InputLabel>
                    <Select
                        labelId={"r-label"}
                        label={"Choose R"}
                        variant={"outlined"}
                        onChange={handleRValueChange}
                        value={rValue}
                    >
                        {rOption.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                            >{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button size="medium" variant="outlined" type="submit" disabled={!isFormValid} >SHOOT</Button>

            </Stack>
        </form>
    );
};

export default MainForm;