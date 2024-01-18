import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail, resetOrders  } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import styles from "./DetailOrder.module.css";
import Reviews from '../Reviews/Reviews'; 


const DetailOrder = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const orderDetail = useSelector((state) => state.orderDetail);
 console.log(orderDetail);

 useEffect(() => {
   dispatch(getOrderDetail(id));
   return () => {
    dispatch(resetOrders());
  };
 }, [id, dispatch]);


 if (!orderDetail || !orderDetail.rows || orderDetail.rows.length === 0) {
  return (
    <div>
      <p>Order no encontrada</p>
    </div>
  );
}

//.rows🎀
const orderDetails = orderDetail.rows[0];

console.log(orderDetails, "Detalles de orden🎀");

 return (
  <div className={styles.container}>
  <h1 className={styles.title}> {orderDetails.Product.name}</h1>
  <img src={orderDetails.Product.image} alt={orderDetails.name} style={{ width: '45%' }} />
  <p className={styles.description}> Descripcion: {orderDetails.Product.description}</p>
  <p className={styles.description}>Tipo: {orderDetails.Product.type}</p>
  <p className={styles.price}>Precio: ${orderDetails.Product.price}</p>
  <p className={styles.category}>Stock: {orderDetails.Product.stock} unidades</p>
  <div>
  <Reviews orderID={id} productID={orderDetails.productID} />
  </div>
</div>
 );}

export default DetailOrder;