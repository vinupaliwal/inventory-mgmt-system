import React, {useState} from 'react';
import axios from 'axios';
import './Registration.css';

function Registration() {
    const [user, setUser] = useState({
        firstname: "", lastname:"", email:"", psw:"", pswrepeat:""
      });

      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value }); 
       };

      //  form handler function
//    const handleForm = (e)=>{
//     console.log(user);
//     postDataToServer(user);
//     e.preventDefault();
//   }
   //  creating function for post data
//    const postDataToServer=(data)=>{
//      axios.post('http://localhost:8082/register',data).then(
//       (response)=>{
//         console.log(response);
//         console.log("success");
//       },
//       (error)=>{
//         console.log(error);
//         console.log("failed");
//       }
//     );
//   }

    const handleSubmit  = (e) => {
        e.preventDefault();
        const {firstname,lastname,email,psw,pswrepeat} = user;

      
        axios.post('http://localhost:8082/register', {firstname,lastname,email,psw,pswrepeat})
        .then((response) => {
            setUser(response.data);
        })
        .catch(err=>console.log(err));
    }

    return(
        <div className='main'>
         <div className='app'>
        <form onSubmit={handleSubmit} method='POST' className="login-form">
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstname">First Name :</label>
                    <input className="form__input" name='firstname' type="text" value={user.firstname} autoComplete="off" onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name :</label>
                    <input  type="text" name="lastname" id="lastName" value={user.lastname}  className="form__input" autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email :</label>
                    <input  type="email" name='email' id="email" className="form__input" value={user.email} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="psw">Password :</label>
                    <input className="form__input" name='psw' type="password"  id="password" value={user.psw} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="pswrepeat">Confirm Password :</label>
                    <input className="form__input" name='pswrepeat' type="password" id="confirmPassword" autoComplete="off" value={user.pswrepeat} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button  type="submit" class="btn">Register</button>
            </div>
        </div>
       </form>
       </div> 
       </div>
    )       
}

export default Registration;