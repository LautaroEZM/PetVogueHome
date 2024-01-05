import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions'; // Asegúrate de tener la acción correspondiente importada
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        dni: '',
        // ... otros campos del modelo Users.js
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

// middleware para tokens (para rutas protegidas)
// guardar token en localstorage

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newUser = await dispatch(createUser(formData));
            console.log('Registro exitoso:', newUser);
            navigate('/Login'); // Puedes redirigir a la página de inicio de sesión después del registro exitoso
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
                <TextField label="Nombre" name="firstName" value={formData.firstName} onChange={handleChange} />
                <TextField label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} />
                <TextField label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
                <TextField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} />
                <TextField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />
                <TextField label="DNI" name="dni" value={formData.dni} onChange={handleChange} />
                {/* ... otros campos del modelo Users.js */}
                <Button type="submit" variant="contained" color="primary">
                    Registrarse
                </Button>
            </Box>
        </form>
    );
}

export default Register;