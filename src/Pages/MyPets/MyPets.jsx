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

  //🎀.rows
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
 
//       {/* Iterar sobre los nombres únicos para renderizar las tarjetas */}
//       {nombresUnicos.map(nombre => {
//         const mascota = mascotas.find(m => m.nombre === nombre); // Encontrar la mascota por nombre
//         return (
//           <div key={nombre} className={styles.petCard}>
//             <img src={mascota.imagen} alt={mascota.nombre} />
//             <h2>{mascota.nombre}</h2>
//             <p>Tipo: {mascota.tipo}</p>
//             <p>Edad: {mascota.edad} años</p>
//             <p>Raza: {mascota.raza}</p>
//             <p>{mascota.descripcion}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };


