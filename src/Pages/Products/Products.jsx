import React, { useEffect } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import { Typography , CardHeader,CardActions}  from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  //🎀.rows
  const productss = Array.isArray(productsData.rows) ? productsData.rows : [];

  return (
    <div className={styles.productCardsContainer}>
      {productss.map((product) => (
        <div key={product.productID} className={styles.productCard}>
          <CardHeader title={product.name} />
          <div>
            <Link key={product.productID} to={`/detallesProductos/${product.productID}`} >
              <img src={product.image} alt={product.name} className={styles.CardImg} />
            </Link>
          </div>
          
            
          <Typography>
                  <strong>Precio:</strong> {product.price}
                </Typography>

          <CardActions sx={{ justifyContent:"right" }}>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              sx={{fontSize: '13px' }}
            //  onClick={()=>setSelectedProducts([...selectedProducts, {...product,quantity:1}])}
            >
                <AddShoppingCartIcon />
            </IconButton>
          </CardActions>      
          
        </div>
      ))}
    </div>
  );
};

export default Products;