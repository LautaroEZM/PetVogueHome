import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax'; // Modificación en la importación
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dogSil from "../../media/dogSil.png";
import catSil from "../../media/catSil.png";
import vetCons from "../../media/vetCons.png";
import vetFemale from "../../media/vetFemale.png";
import vetMale from "../../media/vetMale.png";
import { YellowButtonNoBorderRadius } from "../../styledComponents";

function Home() {
  const navigationRef = useRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ParallaxProvider>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "auto",
      }}
      >
        {/* Barra de navegación con efecto parallax */}
        <ParallaxBanner
          layers={[
            {
              amount: 0.2,
              image: '', // Puedes dejarlo vacío o proporcionar una imagen
            },
          ]}
          style={{
            height: '50px', // Ajusta la altura según tus necesidades
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
          }}
        >
          <YellowButtonNoBorderRadius
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Inicio
          </YellowButtonNoBorderRadius>
          <YellowButtonNoBorderRadius
            onClick={() => {
              const servicesSection = document.getElementById("servicesSection");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            NUESTROS SERVICIOS
          </YellowButtonNoBorderRadius>
        </ParallaxBanner>

        {/* Contenido principal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", marginTop: '50px' }}>
          <img src={dogSil} alt="Dog" style={{ width: "455px", height: "455px" }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              <strong>LOREM IPSUM</strong>
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lobortis tellus. Sed suscipit, risus
              efficitur interdum ultrices, nibh risus egestas quam, eu iaculis ipsum leo aliquet massa. In finibus mauris
              sem, vitae molestie turpis sagittis in. Nulla faucibus sapien vel augue bibendum, at imperdiet velit
              facilisis. Fusce ut risus.
            </Typography>
          </Box>
          <img src={catSil} alt="Cat" style={{ width: "455px", height: "455px" }} />
        </Box>

        {/* SEPARADOR */}
        <Box sx={{
          backgroundColor: 'black', height: "20px", width: '100%'
        }}></Box>

        {/* Sección NUESTROS SERVICIOS */}
        <Box id="servicesSection" sx={{ padding: "20px", backgroundColor: "#e5eeff", width: '95%', marginBottom: "10px" }}>
          <Typography variant="h3" sx={{ textAlign: "center", marginBottom: "30px" }}>
            NUESTROS SERVICIOS
          </Typography>
          <Slider {...settings}>
            <div>
              <Typography variant="h5" sx={{ textAlign: "center", background: '#ffd100', borderRadius: '25px' }}>
                <strong>CONSULTA VETERINARIA</strong>
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <img src={vetCons} alt="Consulta veterinaria" style={{ width: "1200px", height: "600px" }} />
                <Typography variant="h5" sx={{ textAlign: "center", width: "400px" }}>
                  <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lobortis tellus. Sed suscipit, risus
                    efficitur interdum ultrices, nibh risus egestas quam, eu iaculis ipsum leo aliquet massa. In finibus mauris
                    sem, vitae molestie turpis sagittis in.</strong>
                </Typography>
              </Box>
            </div>
            <div>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Cirugias
              </Typography>
            </div>
            <div>
              <img src="imagen_servicio_3.jpg" alt="Servicio 3" style={{ width: "100%", height: "300px" }} />
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Especialidades
              </Typography>
            </div>
          </Slider>
        </Box>

        {/* SEPARADOR */}
        <Box sx={{
          backgroundColor: 'black', height: "20px", width: '100%'
        }}></Box>

        {/* Sección NOSOTROS */}
        <Box id="aboutUsSection" sx={{ padding: "20px", backgroundColor: "#f5f5f5", width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Imagen a la izquierda */}
          <Box sx={{ width: "433px", height: "433px", marginRight: "20px" }}>
            <img src={vetMale} alt="Vet Male" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
          </Box>
          {/* Contenido en el medio */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "45%" }}>
            <Typography variant="h3" sx={{ textAlign: "center", marginBottom: "30px" }}>
              NOSOTROS
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h4" sx={{ marginBottom: "15px" }}>
                <strong>Nuestra Historia</strong>
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lobortis tellus. Sed suscipit, risus efficitur
                interdum ultrices, nibh risus egestas quam, eu iaculis ipsum leo aliquet massa. In finibus mauris sem, vitae
                molestie turpis sagittis in. Nulla faucibus sapien vel augue bibendum, at imperdiet velit facilisis. Fusce ut risus.
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h4" sx={{ marginBottom: "15px" }}>
                <strong>Nuestra Misión</strong>
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lobortis tellus. Sed suscipit, risus efficitur
                interdum ultrices, nibh risus egestas quam, eu iaculis ipsum leo aliquet massa. In finibus mauris sem, vitae
                molestie turpis sagittis in. Nulla faucibus sapien vel augue bibendum, at imperdiet velit facilisis. Fusce ut risus.
              </Typography>
            </Box>
            {/* Botón para desplazarse a esta sección */}
            <YellowButtonNoBorderRadius
              onClick={() => {
                const aboutUsSection = document.getElementById("aboutUsSection");
                if (aboutUsSection) {
                  aboutUsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{ marginTop: "20px", alignSelf: 'center' }}
            >
              Conoce más sobre nosotros
            </YellowButtonNoBorderRadius>
          </Box>
          {/* Imagen a la derecha */}
          <Box sx={{ width: "433px", height: "433px", marginLeft: "20px" }}>
            <img src={vetFemale} alt="Vet Female" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
          </Box>
        </Box>
      </Box>
    </ParallaxProvider>
  );
}

export default Home;
