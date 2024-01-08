import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ButtonTransparentMenu = styled(Button)`
color: black;
font-weight: bold;
border: none;
min-width: 150px;
border-radius: 50px;
&:hover {
  background-color: white;
}
`;

export const YellowButton = styled(Button)`
color: black;
font-weight: bold;
border: none;
min-width: 150px;
border-radius: 50px;
background-color: #ffd100;
&:hover {
    background-color: #ffbb00;
}
`;

export const YellowButtonSmall = styled(Button)`
color: black;
font-weight: bold;
border: none;
border-radius: 50px;
background-color: #ffd100;
&:hover {
    background-color: #ffbb00;
}
`;

//----------------------- OTROS ELEMENTOS

export const LinkNoDeco = styled(Link)`
text-decoration: none;
`;