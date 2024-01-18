//import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPetDetail, resetDetailPet } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import styles from './DetailPet.module.css';

const DetailPet = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const petDetail = useSelector((state) => state.petDetail);

 useEffect(() => {
   dispatch(getPetDetail(id));
   return () => {
    dispatch(resetDetailPet());
  };
 }, [id, dispatch]);


 if (!petDetail || !petDetail.rows || petDetail.rows.length === 0) {
  return (
    <div>
      <p>Pet not found</p>
    </div>
  );
}

//petDetail.rows🎀
const petDetails = petDetail.rows[0];


 return (
  <div className={styles.container}>
  <h1 className={styles.title}> {petDetails.name}</h1>
  <img src={petDetails.image} alt={petDetails.name} style={{
    borderRadius: 15,
    width: '60%',
    }} />
  <p className={styles.description}> Fecha de nacimiento: {petDetails.birth}</p>
  <p className={styles.description}>Género: {petDetails.gender}</p>
  <p className={styles.description}>Especie: {petDetails.specie}</p>
  <p className={styles.description} >Raza: {petDetails.breed}</p>
  <p className={styles.description}>Castración: {petDetails.castrated ? 'Sí' : 'No'}</p>
  <p className={styles.description}>Registro de vacunas: {petDetails.vacRecord ? petDetails.vacRecord.join(', ') : ''}</p>
  <p className={styles.description}>Peso: {petDetails.weight} kg</p>
</div>
 );}

export default DetailPet;