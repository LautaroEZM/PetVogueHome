import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReviewsByProductId } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const ReviewsProduct = ( {productID} ) => {
 const dispatch = useDispatch();
 const reviews = useSelector((state) => state.reviewsProductId);

 //useEffect(() => {
 // dispatch(ReviewsByProductId(productID));
 //}, [productID, dispatch]);

 useEffect(() => {
    console.log("Product ID: en el componente reviews", productID); // Asegúrate de que id sea el productID correcto
    dispatch(ReviewsByProductId(productID));
  }, [productID, dispatch]);

 if (!reviews || !reviews.rows || reviews.rows.length === 0) {
 return <p>Este producto aun no contiene reseñas⭐!</p>;
 }

 return (
 <div>
  {reviews.rows.map((review) => (
    <div key={review.reviewID} >
      <p> Reseñas: {review.review}
        </p>
    </div>
  ))}
 </div>
 );
};

export default ReviewsProduct;