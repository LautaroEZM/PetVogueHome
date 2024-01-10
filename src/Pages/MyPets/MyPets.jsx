import React from 'react';
import styles from './MyPets.module.css'; // Importa tus estilos CSS
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPets } from '../../redux/actions';
import { Typography , CardHeader,}  from '@mui/material';

const MyPets = () => {
 const dispatch = useDispatch();
 const pets = useSelector((state) => state.pets);

 useEffect(() => {
 dispatch(getAllPets());
 }, [dispatch]);

 if (!pets) {
 return <div>Loading...</div>;
 }

  return (
    <div className={styles.petCardsContainer}>
      {pets.map((pet) => (
        <div key={pet.petID} className={styles.petCard}>
           <CardHeader title={pet.name} />
          <div>
            <Link key={pet.petID} to={`/detallesMascotas/${pet.petID}`} >
              <img src={pet.image} alt={pet.name} className={styles.CardImg} />
            </Link>
          </div>
          

          <Typography>
                  <strong>Especie:</strong> {pet.specie}
                </Typography>
                <Typography>
                  <strong>Género:</strong> {pet.gender}
                </Typography>
    </div>
  ))}
 </div>
 );
};

export default MyPets;
 


