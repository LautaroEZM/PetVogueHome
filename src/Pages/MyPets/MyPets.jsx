import React from 'react';
import styles from './MyPets.module.css'; // Importa tus estilos CSS

const MyPets = () => {
  const mascotas = [
    {
      nombre: 'Bobby',
      tipo: 'Perro',
      imagen: 'https://tse3.mm.bing.net/th?id=OIP.VssOJm-fQCSX8Uw19R2EagHaE7&pid=Api&P=0&h=180',
      edad: 3,
      raza: 'Labrador',
      descripcion: 'Juguetón y cariñoso.'
    },
    {
      nombre: 'Tachi',
      tipo: 'Gato',
      imagen: 'https://tse4.mm.bing.net/th?id=OIP.wr0n0e4d6sQvRoP1TBI2gwHaE8&pid=Api&P=0&h=180',
      edad: 5,
      raza: 'Siamés',
      descripcion: 'Tranquilo y curioso.'
    },
    {
      nombre: 'Momo',
      tipo: 'Gato',
      imagen: 'https://tse3.mm.bing.net/th?id=OIP.6aUf79km2P712h9mPSBYXgHaE7&pid=Api&P=0&h=180',
      edad: 9,
      raza: 'Romano',
      descripcion: 'Cariñoso y travieso.'
    },
    {
      nombre: 'Mora',
      tipo: 'Caballo',
      imagen: 'http://mariacarolinamirabal.com/wp-content/uploads/2020/06/razas-de-caballos-tennesse.jpg',
      edad: 5,
      raza: 'Andaluz',
      descripcion: 'Energetico.'
    },
    {
      nombre: 'Cleo',
      tipo: 'Pajaro',
      imagen: 'https://4.bp.blogspot.com/-mueXdDG_SJY/XDgFR1ui9zI/AAAAAAAABPg/-K9ALDOEt6kS5ePxN2Q59_mucZG2Jg12ACK4BGAYYCw/s1600/cotorra-argentina.jpg',
      edad: 1,
      raza: 'Cotorra',
      descripcion: 'Tranquilo.'
    },
    {
      nombre: 'Teo',
      tipo: 'Perro',
      imagen: 'https://wakyma.com/blog/wp-content/uploads/2017/03/Maine-Coon',
      edad: 2,
      raza: 'Maine coon',
      descripcion: 'Energetico y jugueton.'
    }
    // Puedes agregar más objetos para más mascotas
  ];

  // Crear un conjunto de nombres únicos
  const nombresUnicos = [...new Set(mascotas.map(mascota => mascota.nombre))];

  return (
    <div className={styles.petCardsContainer}>
      {/* Iterar sobre los nombres únicos para renderizar las tarjetas */}
      {nombresUnicos.map(nombre => {
        const mascota = mascotas.find(m => m.nombre === nombre); // Encontrar la mascota por nombre
        return (
          <div key={nombre} className={styles.petCard}>
            <img src={mascota.imagen} alt={mascota.nombre} />
            <h2>{mascota.nombre}</h2>
            <p>Tipo: {mascota.tipo}</p>
            <p>Edad: {mascota.edad} años</p>
            <p>Raza: {mascota.raza}</p>
            <p>{mascota.descripcion}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyPets;
