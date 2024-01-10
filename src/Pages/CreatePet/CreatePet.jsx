import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { createPet } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PhotoUpload from '../../Components/photoUpload';

const size = ['Chico', 'Mediano', 'Grande'];

const vaccinesForSpecies = {
    Perro: ['Parvovirus', 'Hepatitis infecciosa canina', 'Tos de las perreras', 'Rabia'],
    Gato: ['Panleucopenia felina', 'Rinotraqueitis felina', 'Calicivirus felino', 'Leucemia felina', 'Rabia'],
};

const CreatePet = () => {
    const [formData, setFormData] = useState({
        userID: "",
        name: '',
        birth: '',
        gender: '',
        specie: '',
        breed: '',
        castrated: '',
        vacRecord: [],
        weight: 0,
        size: '',
        status: 'enabled',
        //userID: "5d62de1f-5fe4-4525-a002-d9bd7e98896c",
    });

    const [photo, setPhoto] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'weight' ? parseInt(value, 10) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };

    const handleVacRecordChange = (selectedVacRecords) => {
        setFormData((prevData) => ({
            ...prevData,
            vacRecord: selectedVacRecords,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPet = await dispatch(
                createPet({
                    ...formData,
                    image: photo,
                })
            );

            console.log('Solicitud POST exitosa:', newPet);
            if (newPet) {
                navigate('/MisMascotas');
            } else {
                // Manejar el caso en que la creación no fue exitosa
                console.error('Error al crear la mascota');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud POST:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>


            <TextField
                    label="Por el momento ingresa un id de usuario"
                    name="userID"
                    value={formData.userID}
                    onChange={handleChange}
                    required
            
                />

                <TextField
                    label="Nombre de la Mascota"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    inputProps={{
                        maxLength: 20,
                      }}
                />
                <TextField
                    label="Nacimiento"
                    name="birth"
                    type="date"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />
                <FormControl>
                    <InputLabel id="select-pet-specie">Especie</InputLabel>
                    <Select
                        label="Especie"
                        labelId="select-pet-specie"
                        name="specie"
                        value={formData.specie}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Perro">Perro</MenuItem>
                        <MenuItem value="Gato">Gato</MenuItem>
                    </Select>
                </FormControl>
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
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                    </Select>
                </FormControl>
                {formData.specie && (
                    <FormControl>
                        <InputLabel id="select-pet-vacRecord">Vacunas</InputLabel>
                        <Select
                            label="Vacunas"
                            labelId="select-pet-vacRecord"
                            name="vacRecord"
                            value={formData.vacRecord}
                            onChange={(e) => handleVacRecordChange(e.target.value)}
                            required
                            multiple
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {vaccinesForSpecies[formData.specie].map((vaccine) => (
                                <MenuItem key={vaccine} value={vaccine}>
                                    <Checkbox checked={formData.vacRecord.indexOf(vaccine) > -1} />
                                    <ListItemText primary={vaccine} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <TextField
                    label="Raza"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                    inputProps={{
                        maxLength: 20,
                      }}
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
                        <MenuItem value="SI">Si</MenuItem>
                        <MenuItem value="NO">No</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Peso (en kilogramos)"
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

export default CreatePet;

