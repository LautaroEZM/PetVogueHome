import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';

function UserForm() {
    const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //confirmar contraseña validacion!!
      phone: '',
      photo: '',
      address: '',
      birth: '',
      dni: '',
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // envía el formulario
      dispatch(createUser(formState));
      alert("Usuario creado con éxito");
  
      // Restablecer los valores del formulario
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        photo: '',
        address: '',
        birth: '',
        dni: '',
  
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="firstName" onChange={handleChange} value={formState.firstName} />
        </label>
  
        <br />
        <label>
          Apellido:
          <input type="text" name="lastName" onChange={handleChange} value={formState.lastName} />
        </label>
  
        <br />
       
        <label>
          Contraseña:
          <input type="password" name="password" onChange={handleChange} value={formState.password} />
        </label>
  
  
        <br />
        <label>
          Teléfono:
          <input type="text" name="phone" onChange={handleChange} value={formState.phone} />
        </label>
  
        <br />
        <label>
          Foto:
          <input type="text" name="photo" onChange={handleChange} value={formState.photo} />
        </label>
  
        <br />
        <label>
          Dirección:
          <input type="text" name="address" onChange={handleChange} value={formState.address} />
        </label>
  
        <br />
        <label>
          Fecha de nacimiento:
          <input type="date" name="birth" onChange={handleChange} value={formState.birth} />
        </label>
  
        <br />
        <label>
          DNI:
          <input type="text" name="dni" onChange={handleChange} value={formState.dni} />
        </label>
  
        <br />
        
  
        <label>
          Correo electrónico:
          <input type="email" name="email" onChange={handleChange} value={formState.email} />
        </label>
  
        <br />
  
        <button type="submit">Crear usuario</button>
      </form>
    );
  }
  
  export default UserForm;
  