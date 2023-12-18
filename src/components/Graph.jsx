import React, {useEffect, useRef, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import MainForm from "./MainForm";
import mainForm from "./MainForm";
import {useSelector} from "react-redux";

const Graph = ({addToTable, rValue, setRValue, xAxisScale, yAxisScale, draw, drawPoint, canvasRef, data}) => {

    // const canvasRef = useRef(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const token = useSelector((state) => state.token);


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {

        const canvas = canvasRef.current;

        const context = canvas.getContext('2d');


        draw(canvas, context);


        const handleCanvasClick = (event) => {

            if (rValue === "") setSnackbarOpen(true)
            else {
                const rect = canvas.getBoundingClientRect();
                const xCanvas = event.clientX - rect.left;
                const yCanvas = event.clientY - rect.top;
                xAxisScale = canvas.width / 10;
                yAxisScale = canvas.height / 10;
                const xAxes = (xCanvas - canvas.width / 2) / xAxisScale;
                const yAxes = -(yCanvas - canvas.height / 2) / yAxisScale;
                const url = 'http://89.104.70.26:8080/points/add';
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Помещение JWT токена в заголовок Authorization
                    },
                    body: JSON.stringify({
                        x: xAxes,
                        y: yAxes,
                        r: rValue
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        drawPoint(canvas, context, data.x, data.y, data.result);
                        addToTable(data);
                        drawPoint(canvas, context, data.x, data.y, data.result);

                    })
                    .catch((error) => console.log(error));

                console.log(`Кликнуто на точку (${xAxes}, ${yAxes})`);
            }

        };
        canvas.addEventListener('click', handleCanvasClick);

        // Cleanup event listener on component unmount
        return () => {
            canvas.removeEventListener('click', handleCanvasClick);
        };
    }, [rValue]);

    return (
        <>
            {/*<MainForm*/}
            {/*    drawShapesByR={drawShapesByR}*/}
            {/*    drawPoint={drawPoint}*/}
            {/*    canvasRef={canvasRef}*/}
            {/*    rValue={rValue}*/}
            {/*    setRValue={setRValue}*/}
            {/*    addToTable={addToTable}*/}

            {/*/>*/}
            <div className={"graph round-container"}>
                <canvas id="graph" ref={canvasRef}
                        width={
                            window.innerWidth <= 855
                                ? 300
                                : window.innerWidth > 855 && window.innerWidth < 1113
                                    ? 400
                                    : 500
                        }
                        height={
                            window.innerWidth <= 855
                                ? 300
                                : window.innerWidth > 855 && window.innerWidth < 1113
                                    ? 400
                                    : 500
                        }
                />
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}

                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        Выберите R
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default Graph;
