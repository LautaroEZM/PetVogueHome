import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createService } from '../../redux/actions';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import PhotoUpload from '../../Components/photoUpload';

const categories = [
    'Consulta',
    'Cirugias',
    'Especialidades',
    'Vacunacion',
    'Peluqueria',
    'Baños',
    'Estetica general',
];

function CreateService() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        status: 'enabled',
        petID: null,
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

        try {
             // Despatcha la acción createService
             const newService = await dispatch(createService({
                ...formData,
                image: photo, // Utiliza directamente la URL de la imagen desde el estado photo
            }));

            console.log('Solicitud POST exitosa:', newService);
            // Puedes realizar alguna acción adicional después de un envío exitoso
            navigate('/Servicios');
        } catch (error) {
            console.error('Error al enviar la solicitud POST:', error.message);
            // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
                <TextField
                    label="Nombre del servicio"
                    name="name"
                    value={formData.name}
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
                    <InputLabel id="select-pet-type">Tipo de mascota</InputLabel>
                    <Select
                        label="Tipo de mascota"
                        labelId="select-pet-type"
                        name="petType"
                        value={formData.petType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Perro">Perro</MenuItem>
                        <MenuItem value="Gato">Gato</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <FormControl>
                    <InputLabel id="select-category">Categoría</InputLabel>
                    <Select
                        label="Categoría"
                        labelId="select-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <PhotoUpload photo={photo} setPhoto={setPhoto} />
                <Button type="submit" variant="contained" color="primary">
                    Crear Servicio
                </Button>
            </Box>
        </form>
    );
}

export default CreateService;
