import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { LinkNoDeco } from '../../styledComponents';

const Failed = () => {


  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Su compra no se pudo concretar, inténtelo nuevamente.
      </Typography>
      <LinkNoDeco to={'/'}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f44336',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}

        >
          Volver a la página
        </Button>
      </LinkNoDeco>
    </Container>
  );

};



export default Failed;
