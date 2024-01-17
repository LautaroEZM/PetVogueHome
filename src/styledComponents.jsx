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

export const YellowButtonNoBorderRadius = styled(Button)`
color: black;
font-weight: bold;
border: none;
min-width: 150px;
margin: 3px;
background-color: #ffd100;
&:hover {
    background-color: #ffbb00;
}
`;

export const YellowButtonNoBorderRadiusEmpty = styled(Button)`
color: black;
font-weight: bold;
border: 1px solid #ffd100;
min-width: 150px;
margin: 3px;
background-color: transparent;
&:hover {
    border: 1px solid red;
    color: red;
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

export const YellowButtonCart = styled(Button)`
position: absolute;
    bottom: 10px; /* Ajusta según tu diseño */
    left: 50%;
    transform: translateX(-50%); /* Centra el botón horizontalmente */
    color: black;
    font-weight: bold;
    height: 35px;
    width: 100px;
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