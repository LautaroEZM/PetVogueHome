import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Menu,
  MenuItem,
  Avatar,
  styled,
} from "@mui/material";
import {
  ButtonTransparentMenu,
  LinkNoDeco,
  YellowButton,
} from "../styledComponents";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const TopBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setTimeout(() => toast.success("Has cerrado sesion"), 200);
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
            <>
              <YellowButton
                onClick={handleMenuOpen}
                color="inherit"
                style={{ marginRight: "8px" }}
              >
                <Avatar
                  alt={`${user.firstName} Avatar`}
                  src={user.photo}
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
                {user.firstName}
              </YellowButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <StyledMenuItem component={RouterLink} to="/perfil">
                  Mi Perfil
                </StyledMenuItem>
                <StyledMenuItem component={RouterLink} onClick={handleLogout}>
                  Cerrar sesion
                </StyledMenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <LinkNoDeco to="/ingresar">
                <YellowButton color="inherit" style={{ marginRight: "8px" }}>
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
