import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviews } from '../../redux/actions';
import { TextField, Button } from '@mui/material';
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
  <form onSubmit={handleSubmit}>
    <TextField
      label="Deja un comentario⭐"
      value={reviewContent}
      onChange={(e) => setReviewContent(e.target.value)}
    />
    <Button type="submit" variant="contained" color="primary">
      Enviar Reseña⭐
    </Button>
  </form>
 );
};

export default Reviews;