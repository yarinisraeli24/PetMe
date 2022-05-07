import React, { useContext, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {Button} from '@mui/material'
import { UserDataContext } from "../../contexts/UserDataContext";
import { AdminContext } from "../../contexts/AdminContext";

import { getUserFavoritePets } from '../../common/serverApi';
import PetPage from "../../pets/PetPage";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({}) => {
    const { userData, isAdmin } = useContext(UserDataContext)
    const { petsData } = useContext(AdminContext);
    const [favoritePets, setFavoritePets] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAdmin) {
            setFavoritePets(petsData);
            } else{
            const setUserFavoritePets = async () => {
                const data = await getUserFavoritePets(userData.id);
                setFavoritePets(data)
            }
            setUserFavoritePets();
        }
    }, [userData.id, isAdmin])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
                <TableRow>
                <TableCell>Pet</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Association</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Kind</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {favoritePets && favoritePets.map((pet) => (
                <TableRow key={pet.name}>
                    <TableCell component="th" scope="row">
                    <Avatar
                        alt="Remy Sharp"
                        src={pet.images[0]}
                        sx={{ width: 56, height: 56 }}
                        /></TableCell>
                    <TableCell align="right">{pet.name}</TableCell>
                    <TableCell align="right">{pet.association}</TableCell>
                    <TableCell align="right">{pet.age}</TableCell>
                    <TableCell align="right">{pet.petKind}</TableCell>
                    <TableCell align="right">
                        <Button onClick={() => navigate('/petPage', {state: {pet}})}>
                            View Pet
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FavoritesPage;


