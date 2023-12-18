import React, {useEffect, useRef, useState} from 'react';
import MainForm from "../components/MainForm";
import Graph from "../components/Graph";
import ResultTable from "../components/ResultTable";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";

const MainPage = () => {
    const [currentR, setCurrentR] = useState("");
    const canvasRef = useRef(null);
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.token);
    const [rValue, setRValue] = useState('');
    const dispatch = useDispatch();


    const xAxisLabel = 'X';
    const yAxisLabel = 'Y';
    let xAxisScale;
    let yAxisScale;

    const axesToCanvasCoordinates = (canvas, xAxes, yAxes) => {
        let originX = canvas.width / 2;
        let originY = canvas.height / 2;

        let canvasX = originX + xAxes;
        let canvasY = originY - yAxes;

        return {x: canvasX, y: canvasY};
    };

    const drawShapesByR = (canvas, context, r) => {
        if (canvas.getContext) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            draw(canvas, context);

            // draw square
            let startPointInAxes = {x: 0, y: 0};
            let startPointInCanvas = axesToCanvasCoordinates(canvas, startPointInAxes.x, startPointInAxes.y);

            let endPointInAxes = {x: -r, y: -r};
            let endScaledPointInAxes = {
                x: scaleXAxesCoordinate(endPointInAxes.x),
                y: scaleYAxesCoordinate(endPointInAxes.y),
            };

            context.fillStyle = 'rgba(255,242,0,0.75)';

            context.beginPath();
            context.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);

            // draw triangle
            let secondTrianglePointInAxes = {x: r, y: 0};
            let thirdTrianglePointInAxes = {x: 0, y: r / 2};
            context.fillStyle = 'rgba(0,200,57,0.75)';
            drawTriangle(canvas, context, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);
            // draw 1/4 circle
            context.fillStyle = 'rgba(104,55,206,0.5)';

            let calculatedRadius = scaleXAxesCoordinate(r / 2);
            let startAngle = Math.PI / 2; // Начальный угол 0 радиан (0 градусов)
            let endAngle = 0; // Конечный угол Pi/2 радиан (90 градусов)

            context.beginPath();
            context.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, startAngle, endAngle, true);
            context.fill();

            // draw missing triangle
            let secondTrianglePointInAxesM = {x: r / 2, y: 0};
            let thirdTrianglePointInAxesM = {x: 0, y: -r / 2};
            drawTriangle(canvas, context, startPointInAxes, secondTrianglePointInAxesM, thirdTrianglePointInAxesM);
        }
    };
    const draw = (canvas, context) => {
        if (canvas.getContext) {
            context.fillStyle = 'rgb(255,255,255)';
            context.strokeStyle = "rgb(255,255,255)";
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;

            xAxisScale = canvasWidth / 10;
            yAxisScale = canvasHeight / 10;

            let originX = canvasWidth / 2;
            let originY = canvasHeight / 2;

            context.beginPath();
            context.moveTo(0, originY);
            context.lineTo(canvasWidth, originY);
            context.stroke();

            context.beginPath();
            context.moveTo(originX, 0);
            context.lineTo(originX, canvasHeight);
            context.stroke();

            context.font = '14px Arial';
            context.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 5);
            context.fillText(yAxisLabel, canvas.width / 2 + 5, 15);

            for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
                let scalePos = axesToCanvasCoordinates(canvas, i, 0);
                context.beginPath();
                context.moveTo(scalePos.x, scalePos.y - 5);
                context.lineTo(scalePos.x, scalePos.y + 5);
                context.stroke();
                context.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
            }

            for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
                let scalePos = axesToCanvasCoordinates(canvas, 0, j,);
                context.beginPath();
                context.moveTo(scalePos.x - 5, scalePos.y);
                context.lineTo(scalePos.x + 5, scalePos.y);
                context.stroke();
                context.fillText(rescaleYAxesCoordinate(j), scalePos.x + 10, scalePos.y + 5);
            }
        }
    };


    const rescaleXAxesCoordinate = (coordinate) => {
        return coordinate / xAxisScale;
    };

    const rescaleYAxesCoordinate = (coordinate) => {
        return coordinate / yAxisScale;
    };

    const scaleXAxesCoordinate = (coordinate) => {
        return coordinate * xAxisScale;
    };

    const scaleYAxesCoordinate = (coordinate) => {
        return coordinate * yAxisScale;
    };

    function drawPoint(canvas, context, x, y, result) {
        const pointSize = 4;
        let scaledPoint = {x: scaleXAxesCoordinate(x), y: scaleYAxesCoordinate(y)};
        let pointOnCanvas = axesToCanvasCoordinates(canvas, scaledPoint.x, scaledPoint.y);
        result ? context.fillStyle = "rgb(200,0,0)" : context.fillStyle = "rgb(255,255,255)";
        context.beginPath();
        context.fillRect(pointOnCanvas.x - pointSize / 2, pointOnCanvas.y - pointSize / 2, pointSize, pointSize);

    }

    const drawTriangle = (canvas, ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) => {
        if (canvas.getContext) {
            let startPointInCanvas = axesToCanvasCoordinates(canvas, startPointInAxes.x, startPointInAxes.y);
            let secondScaledTrianglePointInAxes = {
                x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
                y: scaleYAxesCoordinate(secondTrianglePointInAxes.y),
            };
            let thirdScaledTrianglePointInAxes = {
                x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
                y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y),
            };
            let secondTrianglePointInCanvas = axesToCanvasCoordinates(canvas, secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y);
            let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates(canvas,
                thirdScaledTrianglePointInAxes.x,
                thirdScaledTrianglePointInAxes.y
            );

            ctx.beginPath();
            ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
            ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
            ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
            ctx.fill();
        }
    };
    useEffect(() => {
        const url = 'http://89.104.70.26:8080/points/getMyPoints';
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
            if (response.status === 403) {
                window.location.href = '/';
                dispatch({ type: 'remove_user', payload: {username: "", token: ""}})
                localStorage.removeItem("token");
                return;
            }

            return response.json();
        })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {});
    }, []);
    const addToTable = (newRow) => {
        setData((prevData) => [newRow, ...prevData]);
    };
    const handleRChange = (newValue) => {
        setCurrentR(newValue);
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 1.5
            }}
        >
            <MainForm
                rValue={rValue}
                setRValue={setRValue}
                canvasRef={canvasRef}
                drawShapesByR={drawShapesByR}
                drawPoint={drawPoint}
                addToTable={addToTable}
            />
            <Graph
                canvasRef={canvasRef}
                rValue={rValue}
                setRValue={setRValue}
                addToTable={addToTable}
                xAxisScale={xAxisScale}
                yAxisScale={yAxisLabel}
                draw={draw}
                drawPoint={drawPoint}
                data={data}
            />
            <ResultTable
                data={data}
            />
        </motion.div>
    );
};
// сунуть форму в график и передать в пропсы дроубайр и дроупоинтс
export default MainPage;