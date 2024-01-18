import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviews } from '../../redux/actions';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Reviews.module.css'

//import { LinkNoDeco } from '../../styledComponents';

const Reviews = ({ orderID, productID }) => {
 const dispatch = useDispatch();
 const [reviewContent, setReviewContent] = useState('');

  const handleSubmit = (event) => {
   event.preventDefault();
   dispatch(createReviews({ orderID, productID, review: reviewContent }));
  
 };
//console.log(orderID, productID, reviewContent, "HOLA⭐");



 return (
    <div className={styles.container}>

  <form onSubmit={handleSubmit}>
<div className={styles.Rev}>
    <TextField
      label="Deja un comentario⭐"
      value={reviewContent}
      inputProps={{
        maxLength:40
    }}
      onChange={(e) => setReviewContent(e.target.value)}
      />
      </div>
      <Link to={`/detallesProductos/${productID}`} style={{ textDecoration: 'none' }}>
    <Button type="submit" variant="contained" color="primary">

      Enviar Reseña⭐
        
    </Button>
    </Link>
  </form>
      </div>
 );
};

export default Reviews;