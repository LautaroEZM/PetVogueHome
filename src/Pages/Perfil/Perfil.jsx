/*import { useNavigate } from "react-router-dom";
import React, { useState, } from 'react';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { Button, Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import { LinkNoDeco, YellowButton } from "../../styledComponents";
import toast, { Toaster } from "react-hot-toast";
import OrdersUser from "../OrdersUser/OrdersUser";
import EditUser from "../EditUser/EditUser";
import styles from "./Perfil.module.css"

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.length > 0 ? true : false;
  const userData = users[0].user;
  const isAdmin = userData.systemRole.includes("admin");
  console.log(isAdmin, "isAdmin");


  const [open, setOpen] = useState(false);//esto es para el modal, lo puedo sacar

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setTimeout(() => toast.success("Has cerrado sesion"), 200);
  };

  //esto tmb es del modal, sacar si no funciona:
  const handleClickOpen = () => {
    setOpen(true);
   };
  
   const handleClose = () => {
    setOpen(false);
   };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <div>
      <div className={styles.info}>
        <img src={userData.photo} alt="" className={styles.img} />
        <h3>{userData.firstName}</h3>
        <h3>{userData.lastName}</h3>
        <h3>{userData.email}</h3>
        </div>
       
        
      <Button onClick={handleClickOpen}>Editar Perfil</Button>
     <Dialog open={open} onClose={handleClose}>
      <EditUser closeDialog={handleClose} />
      </Dialog>

        <OrdersUser/>

        {isAdmin ? (
          <div>
            <LinkNoDeco to="/login">
              <YellowButton color="inherit" style={{ marginRight: "8px" }}>
                Dashboard
              </YellowButton>

            </LinkNoDeco>
            
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        )}
      </div>
    </div>
  );
};

export default Perfil;
*/

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Dialog } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { LinkNoDeco, YellowButton } from "../../styledComponents";
import OrdersUser from '../OrdersUser/OrdersUser';
import EditUser from '../EditUser/EditUser';
import styles from './Perfil.module.css';

const Perfil = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const users = useSelector((state) => state.users);
 const isLoggedIn = users.length > 0 ? true : false;
 const userData = users[0]?.user;

 console.log(userData, "Datos de perfil🎀");
 // Usa useRef para mantener un valor mutable que persista entre renders
 const isAdmin = useRef(false);

 useEffect(() => {
 if (userData && userData.systemRole) {
 isAdmin.current = userData.systemRole.includes("admin");
 }
 }, [userData]);

 

 console.log(isAdmin.current, "isAdmin");

 const [open, setOpen] = useState(false);

 const handleLogout = () => {
 dispatch(logoutUser());
 navigate("/");
 setTimeout(() => toast.success("Has cerrado sesion"), 200);
 };

 const handleClickOpen = () => {
 setOpen(true);
 };

 const handleClose = () => {
 setOpen(false);
 };

 return (
 <div className={styles.container}>
 <Toaster position="top-center" />
 <div>
   <div className={styles.info}>
     <img src={userData && userData.photo} alt="" className={styles.img} />
     <h3>{userData && userData.firstName}</h3>
     <h3>{userData && userData.lastName}</h3>
     <h3>{userData && userData.email}</h3>
   </div>

   <Button onClick={handleClickOpen}>Editar Perfil</Button>
   <Dialog open={open} onClose={handleClose}>
     <EditUser closeDialog={handleClose} />
   </Dialog>

   <OrdersUser/>

   {isAdmin.current ? (
     <div>
       <LinkNoDeco to="/login">
         <YellowButton color="inherit" style={{ marginRight: "8px" }}>
           Dashboard
         </YellowButton>
       </LinkNoDeco>

       <Button
         variant="contained"
         color="secondary"
         onClick={handleLogout}
       >
         Cerrar Sesión
       </Button>
     </div>
   ) : (
     <Button variant="contained" color="secondary" onClick={handleLogout}>
       Cerrar Sesión
     </Button>
   )}
 </div>
 </div>
 );
};

export default Perfil;