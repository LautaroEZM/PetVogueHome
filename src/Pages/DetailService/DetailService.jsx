//import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getServiceDetail, resetDetailService } from "../../redux/actions";
import styles from './DetailService.module.css';

const DetailService = () => {
  const serviceDetails = useSelector((state) => state.detailServices);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(resetDetailService());
    };
  }, [id, dispatch]);

  //.rows
  if (!serviceDetails || !serviceDetails.rows || serviceDetails.rows.length === 0) {
    return (
      <div>
        <p>Service not found</p>
      </div>
    );
  }

  const serviceDetail = serviceDetails.rows[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nombre: {serviceDetail.name}</h1>
      <img src={serviceDetail.image} alt={serviceDetail.name} style={{ width: '100%' }} />
      <p className={styles.description}>Descripción: {serviceDetail.description}</p>
      <p className={styles.category}>Categoría: {serviceDetail.category}</p>
      <p className={styles.price}>Precio: {serviceDetail.price}</p>
    </div>
  );
};

export default DetailService;