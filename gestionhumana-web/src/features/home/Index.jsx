import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./styles.css";
import Preloader from "../../utils/preloader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <Preloader isLoading={isLoading} /> */}
      {/* 
      {!isLoading && (
        
      )} */}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        height="100vh"
        width="100vw"
        fontFamily="Roboto, sans-serif"
        sx={{
          backgroundImage: 'url("/img/fondooechsle.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box position="absolute" bottom={10} width="100%" textAlign="center">
          <Typography
            variant="body2"
            color="white"
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)" }}
          >
            © 2024 por derechos de Tiendas Peruanas S.A. R.U.C. Nº 20493020618
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
