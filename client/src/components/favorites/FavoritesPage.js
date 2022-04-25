import React, { useContext, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { UserDataContext } from "../../contexts/UserDataContext";
import { getUserFavoritePets } from '../../common/serverApi';

const FavoritesPage = () => {
    const { id } = useContext(UserDataContext)
    const [favoritePets, setFavoritePets] = useState([])

    useEffect(()=>{
        const setUserFavoritePets = async (userId) => {
            const data = await getUserFavoritePets(userId);
            setFavoritePets(data)
        }
        setUserFavoritePets(id);
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
                <TableRow>
                <TableCell>Pet</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Association</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Kind</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {favoritePets.map((pet) => (
                <TableRow key={pet.name}>
                    <TableCell component="th" scope="row">
                    <Avatar
                        alt="Remy Sharp"
                        src={pet.media[0]}
                        sx={{ width: 56, height: 56 }}
                        /></TableCell>
                    <TableCell align="right">{pet.name}</TableCell>
                    <TableCell align="right">{pet.association}</TableCell>
                    <TableCell align="right">{pet.age}</TableCell>
                    <TableCell align="right">{pet.petKind}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FavoritesPage;


