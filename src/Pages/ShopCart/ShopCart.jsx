import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";


export const ShopCart = () =>{
    const [productsCart, setproductsCart] = useLocalStorage("product", []);
    
    const [total, setTotal] = useState(
        productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) 
      );
      


      useEffect(() => {
        setTotal(
          productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) 
        );
      }, [productsCart]);


//       const handleAddToCartWithQuantity = (item, quantity, i) => {
//         const { serviceID } = item;
//         if (serviceID) {
//           const newServices = [...servicesCart];
//           newServices[i]["quantity"] = parseInt(quantity);
//           setServicesCart(newServices);
//         }if(item.quantity > item.stock){
//             alert('Stock Insuficiente')
//             item.quantity = item.stock
          
//         } else {
//           const newproducts = [...productsCart];
//           newproducts[i]["quantity"] = parseInt(quantity);
//           setproductsCart(newproducts);
//         }
//     };


//     const handleDeleteFromCart = (prodServ) => {
//         // Eliminar el producto del carrito
//         const { serviceID } = prodServ;
//         if (serviceID) {
//           const updatedCart = servicesCart.filter(
//             (item) => item.serviceID !== prodServ.serviceID
//           );
    
//           setServicesCart(updatedCart);
//         } else {
          
//           const updatedCart = productsCart.filter(
//             (item) => item.productID !== prodServ.productID
//           );
//           console.log(updatedCart)
//           setproductsCart(updatedCart);
//         }
//       };
 }