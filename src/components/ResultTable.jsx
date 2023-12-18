import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import {useSelector} from 'react-redux';
import Graph from "./Graph";

function convertTimeFormat(inputDateTimeStr) {
    const originalTime = new Date(inputDateTimeStr);
    const day = originalTime.getDate();
    const month = originalTime.getMonth() + 1;
    const year = originalTime.getFullYear();
    const hours = originalTime.getHours();
    const minutes = originalTime.getMinutes();
    const seconds = originalTime.getSeconds();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function parseDecimal(number) {
    return parseFloat(number.toFixed(2));
}

const ResultTable = ({data}) => {
    const [page, setPage] = useState(0); // Current page index
    const rowsPerPage = 8;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const token = useSelector((state) => state.token);

    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <>

            <Grid item xs={12} sm={6} md={4} className={'result-table-container'}>
                <TableContainer component={Paper} style={{background: 'transparent'}}>
                    <Table size={'medium'} className={'result-table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>x</TableCell>
                                <TableCell>y</TableCell>
                                <TableCell>r</TableCell>
                                <TableCell>result</TableCell>
                                <TableCell>executedAt</TableCell>
                                <TableCell>executionTime</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{parseDecimal(row.x)}</TableCell>
                                    <TableCell>{parseDecimal(row.y)}</TableCell>
                                    <TableCell>{row.r}</TableCell>
                                    <TableCell>{row.result ? 'Попадание' : 'Промах'}</TableCell>
                                    <TableCell>{convertTimeFormat(row.executedAt)}</TableCell>
                                    <TableCell>{row.executionTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[]}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </TableContainer>
            </Grid>
        </>
    );
};

export default ResultTable;