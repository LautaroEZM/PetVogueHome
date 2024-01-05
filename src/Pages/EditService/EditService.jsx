import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import PhotoUpload from '../../Components/photoUpload';

const categories = ['Consulta', 'Cirugias', 'Especialidades', 'Vacunacion', 'Peluqueria', 'Baños', 'Estetica general'];

function EditService({ match }) {
    const { id } = useParams();

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

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.post('https://petvogue.onrender.com/services/get', { filters: { serviceID_filter: id } });
                const serviceData = response.data;
                setFormData(serviceData);
            } catch (error) {
                console.error('Error al obtener datos del servicio:', error.message);
            }
        };

        fetchServiceData();
    }, [id]);

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
            const response = await axios.put(`https://petvogue.onrender.com/Services/${id}`, {
                ...formData,
                image: photo,
            });

            console.log('Solicitud PUT exitosa:', response.data);
        } catch (error) {
            console.error('Error al enviar la solicitud PUT:', error.message);
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
                    Actualizar Servicio
                </Button>
            </Box>
        </form>
    );
}

export default EditService;
