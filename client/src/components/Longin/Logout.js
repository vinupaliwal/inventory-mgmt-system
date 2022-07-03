import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../../App";

function Logout() {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  axios.get('/logout')
        .then((response) => {
             console.log(response.data)
             window.alert(response.data);
             dispatch({type:'USER',payload:false})
             navigate('/login');
        })
        .catch(err=>{
          window.alert("all ready logged in")
          // console.log(err); 
        });

  return (
    <div>Logout</div>
  )
}

export default Logout