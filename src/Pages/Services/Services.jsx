import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const drawerWidth = 240;

const Services = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Contenido principal */}
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {/* Tu contenido principal aquí */}
        <h1>Contenido Principal</h1>
      </main>

      {/* Menú a la izquierda */}
      <Drawer
        variant="permanent"
        style={{
          width: drawerWidth,
          flexShrink: 0,
        }}
        anchor="left"
      >
        <div style={{ width: drawerWidth }}>
          <List>
            {/* Categoría 1 */}
            <ListItem button>
              <ListItemText primary="Categoría 1" />
            </ListItem>

            {/* Opción 1.1 */}
            <ListItem button>
              <ListItemText inset primary="Opción 1.1" />
            </ListItem>

            {/* Opción 1.2 */}
            <ListItem button>
              <ListItemText inset primary="Opción 1.2" />
            </ListItem>

            {/* Categoría 2 */}
            <ListItem button>
              <ListItemText primary="Categoría 2" />
            </ListItem>

            {/* Opción 2.1 */}
            <ListItem button>
              <ListItemText inset primary="Opción 2.1" />
            </ListItem>

            {/* Opción 2.2 */}
            <ListItem button>
              <ListItemText inset primary="Opción 2.2" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Services;
