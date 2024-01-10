import React, { useEffect } from 'react';
import styles from './MyPets.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPets } from '../../redux/actions';
import { Typography , CardHeader,}  from '@mui/material';

const MyPets = () => {
  const dispatch = useDispatch();
  const petsData = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  //🎀.rows
  const pets = Array.isArray(petsData.rows) ? petsData.rows : [];

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
 


