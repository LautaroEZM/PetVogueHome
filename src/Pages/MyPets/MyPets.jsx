 /*import React from 'react';
import styles from './MyPets.module.css'; 
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPets } from '../../redux/actions';

const MyPets = () => {
 const dispatch = useDispatch();
 const pets = useSelector((state) => state.pets);

 useEffect(() => {
 dispatch(getAllPets());
 }, [dispatch]);

// Verifica que petsData.rows sea un array antes de intentar mapear
const pets = Array.isArray(petsData.rows) ? petsData.rows : [];

//  if (!pets) {
//  return <div>Loading...</div>;
//  }

 return (
 <div className={styles.petCardsContainer} >
{pets.map((pet) => (
    <div key={pet.petID} className={styles.petCard}>
      <div className={styles.Cardh1} >
      <h1>{pet.name} </h1>
      </div>
      <div>
      <Link key={pet.petID} to={`/detallesMascotas/${pet.petID}`} className={styles.petCard}>
      
      <img src={pet.image} alt={pet.name} className={styles.CardImg} />
      </Link>
      </div>
      <div className={styles.Cardh2} >
      <h2>Especie: {pet.specie}</h2>
      <h2>Género: {pet.gender}</h2>
      </div>
    </div>
  ))}
 </div>
 );
};

export default MyPets;
 
*/

import React, { useEffect } from 'react';
import styles from './MyPets.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPets } from '../../redux/actions';

const MyPets = () => {
  const dispatch = useDispatch();
  const petsData = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  // Verifica que petsData.rows sea un array antes de intentar mapear
  const pets = Array.isArray(petsData.rows) ? petsData.rows : [];

  return (
    <div className={styles.petCardsContainer}>
      {pets.map((pet) => (
        <div key={pet.petID} className={styles.petCard}>
          <div className={styles.Cardh1}>
            <h1>{pet.name} </h1>
          </div>
          <div>
            <Link key={pet.petID} to={`/detallesMascotas/${pet.petID}`} >
              <img src={pet.image} alt={pet.name} className={styles.CardImg} />
            </Link>
          </div>
          <div className={styles.Cardh2}>
            <h2>Especie: {pet.specie}</h2>
            <h2>Género: {pet.gender}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPets;
