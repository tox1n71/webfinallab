import React, {useRef, useState} from 'react';
import MainForm from "../components/MainForm";
import Graph from "../components/Graph";
import ResultTable from "../components/ResultTable";

const MainPage = () => {
    const [currentR, setCurrentR] = useState("");

    const handleRChange = (newValue) => {
        setCurrentR(newValue);
    };

    return (
        <>
            {/*<MainForm onRChange={handleRChange}/>*/}
            {/*<Graph  rValue={currentR}/>*/}
            {/*<Graph/>*/}
            <ResultTable/>
        </>
    );
};
// сунуть форму в график и передать в пропсы дроубайр и дроупоинтс
export default MainPage;