import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createPet } from '../../redux/actions';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import PhotoUpload from '../../Components/photoUpload';

const size = [
    'Chico',
    'Mediano',
    'Grande',
];

function CreatePet() {
    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        gender: '',
        specie: '',
        breed: '',
        castrated: "",
        vacRecord: "",
        weight: "",
        size: "",
        petType: '',
    });

    const [photo, setPhoto] = useState(null);
    //🎀Agregado:
    const dispatch = useDispatch(); // Usa useDispatch para obtener la función dispatch
    //🎀Agregado:
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Despatcha la acción createService
         try {
            // Despatcha la acción createService
            const newPet = await dispatch(createPet({
               ...formData,
               image: photo, // Utiliza directamente la URL de la imagen desde el estado photo
           }));

           console.log('Solicitud POST exitosa:', newPet);
           // Puedes realizar alguna acción adicional después de un envío exitoso
           navigate('/MisMascotas');
       } catch (error) {
           console.error('Error al enviar la solicitud POST:', error.message);
           // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
       }
            
    return (
        
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
                <TextField
                    label="Nombre de la Mascota"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                  <TextField
                    label="Cumpleaños"
                    name="birth"
                    type="date"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <FormControl>
                    <InputLabel id="select-pet-gender">Genero</InputLabel>
                    <Select
                        label="Genero"
                        labelId="select-pet-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Especie"
                    name="specie"
                    value={formData.specie}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Raza"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />
                <FormControl>
                    <InputLabel id="select-pet-castrated">Castrado:</InputLabel>
                    <Select
                        label="Castrado"
                        labelId="select-pet-castrated"
                        name="castrated"
                        value={formData.castrated}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl>
                    <InputLabel id="select-pet-vacRecord">Esta vacunado?</InputLabel>
                    <Select
                        label="Esta vacunado?"
                        labelId="select-pet-vacRecord"
                        name="vacRecord"
                        value={formData.vacRecord}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                    </Select>
                    </FormControl>

                <TextField
                    label="Peso"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />
                <FormControl>
                    <InputLabel id="select-tamaño">Tamaño</InputLabel>
                    <Select
                        label="Tamaño"
                        labelId="select-tamaño"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    >
                        {size.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <PhotoUpload photo={photo} setPhoto={setPhoto} />
                <Button type="submit" variant="contained" color="primary">
                    Crear 🦴
                </Button>
            </Box>
        </form>
    );
};
};

export default CreatePet;
