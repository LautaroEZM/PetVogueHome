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
import validation  from './validation'
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
       // userID: '',
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
        //userID: 'a2d9d673-b9eb-4276-8845-b0ab9f5017e6',
    });

    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'weight' ? parseInt(value, 10) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));

        setError((prevError) => ({
            ...prevError,
            [name]: validation(name, value)
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
                    label="Nombre de la Mascota"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    inputProps={{
                        maxLength: 20,
                      }}
                />{error.name && (
                    <p style={{ color: 'red' }}>{error.name}</p>
                )}

                <TextField
                    label="Nacimiento"
                    name="birth"
                    type="date"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />{error.birth && (
                    <p style={{ color: 'red' }}>{error.birth}</p>
                )}

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
                </FormControl>{error.specie && (
                    <p style={{ color: 'red' }}>{error.specie}</p>
                )}

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
                </FormControl>{error.gender && (
                    <p style={{ color: 'red' }}>{error.gender}</p>
                )}

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
                )} {error.vacRecord && (
                    <p style={{ color: 'red' }}>{error.vacRecord}</p>
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
                /> {error.breed && (
                    <p style={{ color: 'red' }}>{error.breed}</p>
                )}

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
                </FormControl> {error.castrated && (
                    <p style={{ color: 'red' }}>{error.castrated}</p>
                )}

                <TextField
                    label="Peso (en kilogramos)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                /> {error.weight && (
                    <p style={{ color: 'red' }}>{error.weight}</p>
                )}

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
                </FormControl> {error.size && (
                    <p style={{ color: 'red' }}>{error.size}</p>
                )}

                <PhotoUpload photo={photo} setPhoto={setPhoto} />

                <Button type="submit" variant="contained" color="primary">
                    Crear 🦴
                </Button>

            </Box>
        </form>
    );
};

export default CreatePet;

