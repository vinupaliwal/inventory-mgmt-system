import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import './Login.css';

function Login() {
   const {state,dispatch} = useContext(UserContext);

   const navigate = useNavigate();
  // User Login info
  const [user, setUser] = useState({
    email:"", psw:""
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
   };

  const handleSubmit = (event) => { 
      event.preventDefault();  //Prevent page reload
      const {email,psw} = user;
     
        axios.post('/login', {email,psw,withCredentials: true})
        .then((response) => {
             setUser(response.data);
             console.log(response.data)
             window.alert(response.data.message);
             dispatch({type:'USER',payload:true})
             navigate('/home');
        })
        .catch(err=>{
          window.alert("all ready loged in")
          // console.log(err); 
        });
  };


  return (
    <div className="main">
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
       <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input  type="email" name='email' id="email" className="form__input" value={user.email} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
       
        </div>
        <div className="input-container">
          <label>Password </label>
          <input className="form__input" name='psw' type="password"  id="password" value={user.psw} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
         
        </div>
        <div className="button-container">
         
            <input type="submit" />
          
        </div>
      </form>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Login;