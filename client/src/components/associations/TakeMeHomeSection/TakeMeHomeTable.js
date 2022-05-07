import React, { useContext, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { AdminContext } from "../../../contexts/AdminContext";

const TakeMeHomeTable = ({}) => {
    const { takeMeRequests } = useContext(AdminContext);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
                <TableRow>
                <TableCell>User Details</TableCell>
                <TableCell>Pet Details</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Association</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Kind</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {takeMeRequests && takeMeRequests.map((request) => {
                    const {userData, petData} = request
                    return( 
                    <TableRow key={userData.firstName}>
                        <TableCell component="th" scope="row">
                            <div style={{display: 'flex'}}>
                                <Avatar
                                alt="Remy Sharp"
                                src={''}
                                sx={{ width: 56, height: 56, mr: 3 }}
                                />
                                <div>
                                    <div>Name: {userData.firstName + ' ' + userData.lastName}</div>
                                    <div>Email: {userData.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell><Avatar
                                alt="Remy Sharp"
                                src={petData.images[0]?.url}
                                sx={{ width: 56, height: 56, mr: 3 }}
                                /></TableCell>
                        <TableCell>{petData.name}</TableCell>
                        <TableCell>{petData.association}</TableCell>
                        <TableCell>{petData.age}</TableCell>
                        <TableCell>{petData.petKind}</TableCell>
                    </TableRow>
                )})}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TakeMeHomeTable;


