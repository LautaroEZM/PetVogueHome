import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";


export const ShopCart = () =>{
    const [productsCart, setproductsCart] = useLocalStorage("product", []);
    const [servicesCart, setServicesCart] = useLocalStorage("service", []);
    const [total, setTotal] = useState(
        productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) +
            servicesCart.reduce((acc, p) => acc + p.price * p.quantity, 0)
      );
      


      useEffect(() => {
        setTotal(
          productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) +
            servicesCart.reduce((acc, p) => acc + p.price * p.quantity, 0)
        );
      }, [productsCart, servicesCart]);
}