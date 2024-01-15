import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { Card, Box, CardMedia } from "@mui/material";


export const ShopCart = () =>{


    // const [productsCart, setproductsCart] = useLocalStorage("product", []);
    
    // const [total, setTotal] = useState(
    //     productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) 
    //   );
      


    //   useEffect(() => {
    //     setTotal(
    //       productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) 
    //     );
    //   }, [productsCart]);


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
return (
  <div>
    <h1 style={{color: "Black", textAlign: "center"}}>Shop Cart</h1>

    {/* Productos */}
    {/* {productsCart && productsCart.length > 0
      ? productsCart.map((product, i) => ( */}
          {/* <div key={i}>
            <div>
              <Card sx={{ display: 'flex', backgroundColor:"white", border:"orange 2px solid"}}>

              <Box sx={{ width: "90%", marginBottom: "40px", display:"flex",flexDirection:"row" }}>
                <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product.image}
                style={{
                  color: "#fff",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
                />
              <h3>{product.name}</h3>
                <h3>{product.price} US$</h3>
            <button style={{
              marginTop:"70px",
              width: "50px",
              height: "50px",
            }}
              >
            </button >
            </Box>
            </Card>
            </div>
          </div>
        {/* )) */}
  </div>
);
} 