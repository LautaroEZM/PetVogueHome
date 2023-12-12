// Importa las bibliotecas necesarias
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Typography,
    Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Estilo personalizado para el avatar
const avatarStyle = {
    cursor: 'pointer',
    marginLeft: 'auto',
};

const TopBarMenu = () => {
    // Estado para controlar el menú desplegable
    const [anchorEl, setAnchorEl] = useState(null);

    // Funciones para abrir y cerrar el menú desplegable
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Botones en el lado izquierdo */}
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mi App
                </Typography>

                {/* Botones en el lado derecho */}
                <Button color="inherit">Botón 1</Button>
                <Button color="inherit">Botón 2</Button>
                <Button color="inherit">Botón 3</Button>

                {/* Avatar con menú desplegable para login/register */}
                <div style={avatarStyle}>
                    <Avatar
                        alt="Usuario"
                        src="/path/to/avatar.jpg"
                        onClick={handleMenuOpen}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Registro</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default TopBarMenu;
