import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
} from "@mui/material";
import { ButtonTransparentMenu, LinkNoDeco, YellowButton } from "../styledComponents";
import { Link as RouterLink } from "react-router-dom";

const TopBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Verificar el inicio de sesión al cargar el componente
  const isLoggedIn = localStorage.getItem("user") !== null;

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
          <LinkNoDeco to="/">
            <ButtonTransparentMenu>Inicio</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to="/Servicios">
            <ButtonTransparentMenu>Servicios</ButtonTransparentMenu>
          </LinkNoDeco>
          <LinkNoDeco to="/">
            <ButtonTransparentMenu>Turnos</ButtonTransparentMenu>
          </LinkNoDeco>
          {isLoggedIn && (
            <LinkNoDeco to="/MisMascotas">
              <ButtonTransparentMenu>Mis Mascotas</ButtonTransparentMenu>
            </LinkNoDeco>
          )}
        </Container>

        {/* Avatar con botón "Iniciar Sesión" o "Mi Perfil" y menú desplegable para login/register */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn ? (
            <LinkNoDeco to="/login">
              <YellowButton color="inherit" style={{ marginRight: "8px" }}>
                Mi Perfil
              </YellowButton>
            </LinkNoDeco>
          ) : (
            <LinkNoDeco to="/login">
              <YellowButton
                color="inherit"
                onClick={handleMenuOpen}
                style={{ marginRight: "8px" }}
              >
                Iniciar Sesión
              </YellowButton>
            </LinkNoDeco>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarMenu;