//import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail, resetDetailProduct } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import styles from './DetailProduct.module.css';
import { LinkNoDeco, YellowButton } from '../../styledComponents';

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  console.log(productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(resetDetailProduct());
    };
  }, [id, dispatch]);


  if (!productDetail || !productDetail.rows || productDetail.rows.length === 0) {
    return (
      <div>
        <p>Product not found</p>
      </div>
    );
  }

  //.rows🎀
  const productDetails = productDetail.rows[0];


  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {productDetails.name}</h1>
      <img src={productDetails.image} alt={productDetails.name} style={{ width: '45%' }} />
      <p className={styles.description}> Descripcion: {productDetails.description}</p>
      <p className={styles.description}>Tipo: {productDetails.type}</p>
      <p className={styles.price}>Precio: ${productDetails.price}</p>
      <p className={styles.category}>Stock: {productDetails.stock} unidades</p>
      <LinkNoDeco to={'/Productos'}><YellowButton>Volver atras</YellowButton></LinkNoDeco>
    </div>
  );
}

export default DetailProduct;