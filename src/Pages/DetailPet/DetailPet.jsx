import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPetDetail } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import styles from './DetailPet.module.css';

const DetailPet = () => {
 const { petID } = useParams();
 const dispatch = useDispatch();
 const petDetail = useSelector((state) => state.petDetail);
 console.log(petDetail);

 useEffect(() => {
   dispatch(getPetDetail(petID));
 }, [petID, dispatch]);

 if (!petDetail) {
   return <div>Loading...</div>;
 }

 return (
    <div className={styles.container}>
    <h1>Estas en Detalles de Mascota</h1>
    <h1>Nombre: {petDetail.name}</h1>
    <h2>Fecha de nacimiento: {petDetail.birth}</h2>
    <h2>Género: {petDetail.gender}</h2>
    <h2>Especie: {petDetail.specie}</h2>
    <h2>Raza: {petDetail.breed}</h2>
    <h2>Castración: {petDetail.castrated ? 'Sí' : 'No'}</h2>
    <h2>Registro de vacunas: {petDetail.vacRecord ? petDetail.vacRecord.join(', ') : ''}</h2>
    <h2>Peso: {petDetail.weight} kg</h2>
  </div>
 );}

export default DetailPet;