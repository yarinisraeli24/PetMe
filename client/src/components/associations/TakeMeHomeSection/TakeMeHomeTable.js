import React, { useContext, useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer,TableHead,TableRow, Paper, Avatar, Button} from '@mui/material'
import { AdminContext } from "../../../contexts/AdminContext";
import { mailtoBuilder } from "../../../common/utils";
import {removeTakeMeHome} from '../../../common/serverApi'

const TakeMeHomeTable = ({}) => {
    const { takeMeRequests, setTakeMeRequests } = useContext(AdminContext);
    const deleteRequset = async (index) => {
        const currentTakeMeHome = takeMeRequests[index];
        setTakeMeRequests(prevState => prevState.filter((data,idex) => idex !==index))
        console.log(currentTakeMeHome)
        await removeTakeMeHome(currentTakeMeHome.requestId)
    }
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
                <TableCell>Contact</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {takeMeRequests && takeMeRequests.map((request, index) => {
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
                        <TableCell>
                            <Button href={mailtoBuilder(petData,userData)}>Send Email</Button>
                        </TableCell>
                        <TableCell>
                        <Button>View Pet</Button>
                        <Button onClick={() => deleteRequset(index)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                )})}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TakeMeHomeTable;


