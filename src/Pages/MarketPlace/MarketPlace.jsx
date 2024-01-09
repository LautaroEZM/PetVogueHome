import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import {
   fetchProductsRequest,
   fetchProductsSuccess,
   fetchProductsFailure,
 } from '../../redux/actions';
import styles from './Market.module.css'; // Importa tus estilos CSS




const Market = () =>{
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state);
   
     useEffect(() => {
       const fetchData = async () => {
         dispatch(fetchProductsRequest());
         try {
           const response = await axios.post('https://petvogue.onrender.com/products/get', {
           page:1,
           itemsPerPage:10,
          });
           dispatch(fetchProductsSuccess(response.data.rows)); // Asegúrate de acceder correctamente a los datos
           console.log(response.data.rows)
          } catch (err) {
            dispatch(fetchProductsFailure(err.message));
          }
       };
  
       fetchData();
     }, [dispatch]);
  

    if (!products) {
        return <div>Loading...</div>;
        }
    return(
        <div className={styles.productCardsContainer}>
        {products.map((product) => (
            <div key={product.productID} className={styles.productCard}>
              <div className={styles.Cardh1} >
              <h4>{product.name} </h4>
              </div>
              <div>
              {/* <Link key={product.productID} to={`/detallesProd/${product.productID}`} className={styles.productCard}> */}
              <img src={product.image} alt={product.name} className={styles.CardImg} />
              {/* </Link> */}
              </div>
              <div className={styles.Cardh2} >
              <h5>{product.description}</h5>
              <h3>Precio: {product.price}</h3>
              </div>
            </div>
          ))}
         </div>
    )
}


export default Market;