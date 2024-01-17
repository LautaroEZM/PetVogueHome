// DetailOrder.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail, resetDetailOrders } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import { Typography } from '@mui/material';
import styles from './DetailOrder.module.css';

const DetailOrder = () => {
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { id } = useParams();

    const submitReview = async () => {
      try {
        // Verifica que se haya ingresado un comentario y una calificación
        if (!reviewComment || reviewRating <= 0) {
          console.error('Por favor, ingresa un comentario y una calificación válida');
          return;
        }
    
        // Aquí debes enviar la reseña al servidor
        const response = await fetch('/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderDetails.order,
            review: reviewComment,
            rating: reviewRating,
          }),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          // La reseña se envió con éxito
          console.log('Reseña enviada con éxito');
          
          } else {
          // Ocurrió un error al enviar la reseña
          console.error('Error al enviar la reseña:', response.status);
        }
      } catch (error) {
        console.error('Error inesperado al enviar la reseña:', error.message);
        // Puedes mostrar un mensaje de error al usuario si es necesario
      };
      
    console.log('Reseña enviada:', reviewComment, reviewRating);
  };
  

  useEffect(() => {
    dispatch(getOrderDetail(id));
    return () => {
      dispatch(resetDetailOrders());
    };
  }, [id, dispatch]);

  if (!orderDetail || !orderDetail.rows || orderDetail.rows.length === 0) {
    return (
      <div>
        <p>Orden no encontrada</p>
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

      <div>
        <h2>Reseñas</h2>
        {orderDetail.reviews && Array.isArray(orderDetail.reviews) ? (
          orderDetail.reviews.map((review) => (
            <div key={review.id}>
              <p>{review.comment}</p>
              <p>Calificación: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas disponibles</p>
        )}

        {orderDetail.canReview && (
         <div>
          <TextField
            label="Comentario"
            variant="outlined"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
         <TextField
            label="Calificación"
            type="number"
            variant="outlined"
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
         />

         <Button variant="contained" color="primary" onClick={submitReview}>
           Enviar Reseña
         </Button>

    </div>
  )}
      </div>

    </div>
  );
};

export default DetailOrder;
