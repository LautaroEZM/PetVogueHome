// DetailOrder.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail, resetDetailOrders } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styles from './DetailOrder.module.css';

const DetailOrder = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetail(id));
    return () => {
      dispatch(resetDetailOrders());
    };
  }, [id, dispatch]);

  if (!orderDetail || !orderDetail.rows || orderDetail.rows.length === 0) {
    return (
      <div>
        <p>Order not found</p>
      </div>
    );
  }

  const orderDetails = orderDetail.rows[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalle de la Orden</h1>
      <Typography>
        <strong>Fecha de compra:</strong> {new Date(orderDetails.date).toLocaleString()}
      </Typography>
      <Typography>
        <strong>Producto: </strong> {orderDetails.Product.name}
      </Typography>
      <Typography>
        <strong>Total abonado: $</strong>
        {orderDetails.amount}
      </Typography>
      <img src={orderDetails.Product.image} alt={orderDetails.Product.name} className={styles.CardImg} />
    </div>
  );
};

export default DetailOrder;
