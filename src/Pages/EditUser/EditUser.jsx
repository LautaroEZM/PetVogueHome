import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../redux/actions';
import PhotoUpload from "../../Components/photoUpload";
import { TextField, Button, Box,  } from '@mui/material';

const EditUser = ({ closeDialog }) => {
 const dispatch = useDispatch();

 const currentUser = useSelector((state) => state.users[0]?.user);
//const users = useSelector((state)=> state.users[0].user)

 console.log(currentUser, "currentUser💚");

 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [phone, setPhone] = useState('');
 const [address, setAddress] = useState('');
 const [photo, setPhoto] = useState('');
 //const [birth, setBirth] = useState('');
 const [dni, setDni] = useState('');

 useEffect(() => {
 if (currentUser) {
 setFirstName(currentUser.firstName || '');
 setLastName(currentUser.lastName || '');
 setPhone(currentUser.phone || '');
 setAddress(currentUser.address || '');
 setPhoto(currentUser.photo || '');
 //setBirth(currentUser.birth || '');
 setDni(currentUser.dni || '');
 }
 }, [currentUser]);

 console.log(currentUser, "currentUser💜");
 console.log(currentUser);
 
 const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { firstName, lastName, phone, address, photo, dni };
    dispatch(updateUser(currentUser.userID, userData))
    .then(() => {
      // Despacho la acción getUser para obtener el usuario actualizado
      dispatch(getUser(currentUser.userID));
    })
    .catch((error) => {
      console.error('Failed to update user: ', error);
    });
    closeDialog();
   };
 

 return (
 <form onSubmit={handleSubmit}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
    <PhotoUpload photo={photo} setPhoto={setPhoto} />
    <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    <TextField label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
    <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
    
    <TextField label="Dni" value={dni} onChange={(e) => setDni(e.target.value)} />
    <Button type="submit" variant="contained" color="primary">
      Guardar cambios🐾
    </Button>
  </Box>
 </form>
 );
};

export default EditUser;