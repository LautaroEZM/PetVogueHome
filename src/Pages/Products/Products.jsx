import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import { Typography, CardHeader } from '@mui/material';

const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const applyFilters = (filters) => {
    const filtered = productsData.rows.filter((product) => {
      const { name, type } = product;
      const nameFilter = filters.name ? name.toLowerCase().includes(filters.name.toLowerCase()) : true;
      const typeFilter = filters.type ? type.toLowerCase().includes(filters.type.toLowerCase()) : true;
      return nameFilter && typeFilter;
    });

    const sortedProducts = filters.name_order
      ? filtered.sort((a, b) => (filters.name_order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
      : filtered;

    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (filters) => {
    dispatch(getAllProducts(filters));
    applyFilters(filters);
  };

  // rows
  const productsToDisplay = Array.isArray(filteredProducts) && filteredProducts.length > 0 ? filteredProducts : productsData.rows;

  return (
    <div className={styles.productCardsContainer}>
      {productsToDisplay.map((product) => (
        <div key={product.name} className={styles.productCard}>
          <CardHeader title={product.name} />
          <div>
            <Link key={product.name} to={`https://petvogue.onrender.com/${product.name}`}>
              <img src={product.image} alt={product.name} className={styles.CardImg} />
            </Link>
          </div>
          <Typography>
            <strong>Precio:</strong> {product.price}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default Products;
