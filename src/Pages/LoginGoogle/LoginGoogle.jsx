 
import {gapi} from "gapi-script"
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
const store = useSelector(state => state.users)
console.log(store, "store");
  const clientId ="558014372124-0pc7j2jcjaspojf7s5cj82do4okm05nt.apps.googleusercontent.com";
  const [user, setUser]= useState({});

  useEffect(()=>{
    const start = () =>{
      gapi.auth2.init({
        clientId: clientId,
      })
    }
    gapi.load("client:auth2", start) 
  }, [])

  const onSuccess = async (response) => {
    setUser(response.profileObj);
  
    // Hacer el dispatch a la base de datos con el email, el nombre y la foto
    try {
      const userData = {
        email: response.profileObj.email,
        firstName: response.profileObj.name, 
        photo: response.profileObj.imageUrl, 
      };
  
     
      await dispatch(createUser(userData));
    } catch (error) {
      console.error(`Error dispatching user data: ${error}`);
    }
  }
  

  
  const onFailure = () =>{
    console.log("Something went wrong")
  }

  const handleLogout = () => {
    setUser({});
    console.log('User has logged out');
  };
  

  return (
    <div className="App">

     <div className='btn'>
        <GoogleLogin 
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_policy"}
        />
     </div>
     <div className={user? "profile":"hidden"}>
      <img src={user.imageUrl} alt=""/>
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      <h3>{user.googleId}</h3>
       

      </div>
     <div>
     <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={handleLogout}
    />

     </div>
    </div>
  );
}

export default Login;
