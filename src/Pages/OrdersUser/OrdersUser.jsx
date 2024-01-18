import React, { useEffect, } from 'react';
import { OrdersByUserId, resetDetailOrders  } from "../../redux/actions";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Typography , CardHeader,} from '@mui/material';
import  styles from './OrdersUser.module.css';

const OrdersUser = () => {
    const dispatch = useDispatch();
    const ordersUser = useSelector(state => state.ordersUser);
    const userData = useSelector(state => state.user);
   
    useEffect(() => {
        if (userData) {
          dispatch(OrdersByUserId(userData.userID));
        }
   
      return () => {
        dispatch(resetDetailOrders());
      };
    }, [dispatch, userData]);
   
    //🎀.rows
   
    let orders = [];
    if (ordersUser && ordersUser.rows) {
    orders = Array.isArray(ordersUser.rows) ? ordersUser.rows : [];
    }
    //console.log(OrdersByUserId, "Estado💜");
    return (
        <div className={styles.container}>
          <div className={styles.cards}>
            <h2>Historial de Compras:</h2>
          </div>
          <div className={styles.cardContainer}>
            {orders.map((order) => (
                <div className={styles.cartas}>

          <div key={order.orderID}>
      
        <Typography>
         <strong>Fecha de compra:</strong> {new Date(order.date).toLocaleString()}
       </Typography>
       {/*      
       <Typography>
         <strong>Quantity:</strong> {order.quantity}
       </Typography>
      */}
         <Typography>
         <strong>Producto: </strong> {order.Product.name}
         </Typography>
         <Typography>
         <strong>Total abonado: $</strong>{order.amount}
        </Typography>
        {/* <Typography>
         <strong>Product Price:</strong> {order.Product.price}
        </Typography>
        */}   
         <img src={order.Product.image} alt={order.Product.name} className={styles.CardImg} />     
           
             </div> 
            </div>
            ))}
          </div>
        </div>
      );
     };
     
     export default OrdersUser;
