import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
} from "@mui/material";
import {
  ButtonTransparentMenu,
  LinkNoDeco,
  YellowButton,
} from "../styledComponents";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
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
        <Container>
          <LinkNoDeco to={"/"}>
            <ButtonTransparentMenu>Productos</ButtonTransparentMenu>
          </LinkNoDeco>
        </Container>

        {/* Avatar con botón "Iniciar Sesión" o "Mi Perfil" y menú desplegable para login/register */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <LinkNoDeco to="/perfil">
              <YellowButton color="inherit" style={{ marginRight: "8px" }}>
                Mi Perfil
              </YellowButton>
            </LinkNoDeco>
          ) : (
            <div>
              <LinkNoDeco to="/ingresar">
                <YellowButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  style={{ marginRight: "8px" }}
                >
                  Ingresar
                </YellowButton>
              </LinkNoDeco>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarMenu;
