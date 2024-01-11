import React from "react";

import { Box } from "@mui/system";

import pets from "../../media/pets.png"

function Home() {


  return (
    <Box>
      <Box>
        <img src={pets}></img>
      </Box>
    </Box>
  );
}

export default Home;
