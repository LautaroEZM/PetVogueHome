import React from "react";
import {
    LinkNoDeco,
  } from "../../styledComponents";

function Login() {
  return (
    <div>
      <div>Iniciar sesion</div>
      <div>
        <LinkNoDeco to='/register'>
        Registrarse
        </LinkNoDeco>
        </div>
    </div>
  );
}

export default Login;
