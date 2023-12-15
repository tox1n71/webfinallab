// import React, {useEffect, useRef} from 'react';
//
// function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
//     let originX = canvas.width / 2;
//     let originY = canvas.height / 2;
//     let canvasX = originX + xAxes;
//     let canvasY = originY - yAxes;
//     return {x: canvasX, y: canvasY};
// }
//
// function rescaleXAxesCoordinate(coordinate, xAxisScale) {
//     return coordinate / xAxisScale;
// }
//
// function rescaleYAxesCoordinate(coordinate, yAxisScale) {
//     return coordinate / yAxisScale;
// }
//
// function scaleXAxesCoordinate(coordinate, xAxisScale) {
//     return coordinate * xAxisScale;
// }
//
// function scaleYAxesCoordinate(coordinate, yAxisScale) {
//     return coordinate * yAxisScale;
// }
//
// const Graph = ({r}) => {
//
//     const xAxisLabel = "X";
//     const yAxisLabel = "Y";
//     const canvasRef = useRef(null);
//
//     useEffect(() => {
//         drawGraph();
//         drawShapesByR({r})
//     }, []);
//
//     const drawGraph = () => {
//         const canvas = canvasRef.current;
//
//         const context = canvas.getContext('2d');
//
//         let canvasWidth = canvas.width;
//         let canvasHeight = canvas.height;
//
//         let xAxisScale = canvasWidth / 10;
//         let yAxisScale = canvasHeight / 10;
//
//         let originX = canvasWidth / 2;
//         let originY = canvasHeight / 2;
//         context.fillStyle = "rgb(255,255,255)";
//         context.strokeStyle = "rgb(255,255,255)";
//         context.beginPath();
//         context.moveTo(0, originY);
//         context.lineTo(canvasWidth, originY);
//
//         context.stroke();
//
//         context.beginPath();
//         context.moveTo(originX, 0);
//         context.lineTo(originX, canvasHeight);
//         context.stroke();
//
//         context.font = '14px Arial';
//         context.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 5);
//         context.fillText(yAxisLabel, canvas.width / 2 + 5, 15);
//
//         for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
//             let scalePos = axesToCanvasCoordinates(i, 0, canvas);
//             context.beginPath();
//             context.moveTo(scalePos.x, scalePos.y - 5);
//             context.lineTo(scalePos.x, scalePos.y + 5);
//             context.stroke();
//             context.fillText(rescaleXAxesCoordinate(i, xAxisScale), scalePos.x - 10, scalePos.y + 20);
//         }
//
//         for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
//             let scalePos = axesToCanvasCoordinates(0, j, canvas);
//             context.beginPath();
//             context.moveTo(scalePos.x - 5, scalePos.y);
//             context.lineTo(scalePos.x + 5, scalePos.y);
//             context.stroke();
//             context.fillText(rescaleYAxesCoordinate(j, yAxisScale), scalePos.x + 10, scalePos.y + 5);
//         }
//     }
//     const handleCanvasClick = (event) => {
//         const canvas = canvasRef.current;
//         let xAxisScale = canvas.width / 10;
//         let yAxisScale = canvas.height / 10;
//         const rect = canvas.getBoundingClientRect();
//         const xCanvas = event.clientX - rect.left;
//         const yCanvas = event.clientY - rect.top;
//
//         const xAxes = (xCanvas - canvas.width / 2) / xAxisScale;
//         const yAxes = -(yCanvas - canvas.height / 2) / yAxisScale;
//
//         console.log(`Кликнуто на точку (${xAxes}, ${yAxes})`);
//     }
//
//     // эта шляпа не рисует нихуя
//     const drawShapesByR = (r) => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//
//         console.log("context est")
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         drawGraph();
//
//         // draw square
//         let startPointInAxes = {x: 0, y: 0};
//         let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
//
//
//         let endPointInAxes = {x: -r, y: -r};
//         let endScaledPointInAxes = {
//             x: scaleXAxesCoordinate(endPointInAxes.x),
//             y: scaleYAxesCoordinate(endPointInAxes.y)
//         };
//
//
//         context.fillStyle = "rgba(255,242,0,0.75)";
//
//         context.beginPath();
//         context.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);
//
//
//         // draw triangle
//         let secondTrianglePointInAxes = {x: r, y: 0};
//         let thirdTrianglePointInAxes = {x: 0, y: r / 2};
//         context.fillStyle = "rgba(0,200,57,0.75)";
//         drawTriangle(context, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);
//         // draw 1/4 circle
//         context.fillStyle = "rgba(104,55,206,0.5)";
//
//         let calculatedRadius = scaleXAxesCoordinate(r / 2);
//         let startAngle = Math.PI / 2; // Начальный угол 0 радиан (0 градусов)
//         let endAngle = 0; // Конечный угол Pi/2 радиан (90 градусов)
//
//         context.beginPath();
//         context.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, startAngle, endAngle, true);
//         context.fill();
//
//         // draw missing triangle
//         let secondTrianglePointInAxesM = {x: r / 2, y: 0};
//         let thirdTrianglePointInAxesM = {x: 0, y: -r / 2};
//         drawTriangle(context, startPointInAxes, secondTrianglePointInAxesM, thirdTrianglePointInAxesM);
//
//     }
//
//     function drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) {
//         const canvas = canvasRef.current;
//
//         let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
//         let secondScaledTrianglePointInAxes = {
//             x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
//             y: scaleYAxesCoordinate(secondTrianglePointInAxes.y)
//         }
//         let thirdScaledTrianglePointInAxes = {
//             x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
//             y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y)
//         };
//         let secondTrianglePointInCanvas = axesToCanvasCoordinates
//         (secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y, canvas);
//         let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates
//         (thirdScaledTrianglePointInAxes.x, thirdScaledTrianglePointInAxes.y, canvas);
//
//         ctx.beginPath();
//         ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
//         ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
//         ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
//         ctx.fill();
//         console.log("треугольник")
//     }
//
//
//     return (
//         <div className={"graph round-container"}>
//             <canvas ref={canvasRef} width={500} height={500} onClick={handleCanvasClick} />
//         </div>
//     );
// }
// export default Graph;