import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Container,
} from "@mui/material";

import {
  ButtonTransparentMenu,
  LinkNoDeco,
  YellowButton,
} from "../styledComponents";

const TopBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        {/* Pet Vogue a la izquierda */}
        <Typography variant="h6" component="div" sx={{ marginRight: "auto" }}>
          Pet Vogue
        </Typography>

        {/* Botones centrados */}
        <Container>
          <LinkNoDeco to={"/"}>
            <ButtonTransparentMenu>Inicio</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to={"/Servicios"}>
            <ButtonTransparentMenu>Servicios</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to={"/"}>
            <ButtonTransparentMenu>Turnos</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to={"/MisMascotas"}>
            <ButtonTransparentMenu>Mascotas</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to={"/MarketPlace"}>
            <ButtonTransparentMenu>Tienda</ButtonTransparentMenu>
          </LinkNoDeco>
        </Container>

        {/* Avatar con botón "Iniciar Sesión" y menú desplegable para login/register */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <LinkNoDeco to={"/login"}>
            <YellowButton
              color="inherit"
              onClick={handleMenuOpen}
              style={{ marginRight: "8px" }}
            >
              Iniciar Sesión
            </YellowButton>
          </LinkNoDeco>

          {/* <Avatar
                        alt="Usuario"
                        src="/path/to/avatar.jpg"
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Registro</MenuItem>
                    </Menu> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarMenu;
