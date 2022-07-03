import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './Registration.css';


function UpdateProfile() {
    const [user, setUser] = useState({
        firstname: "", lastname:"", email:"", oldpsw:"", newpsw:""
      });
    
      const [val,setVal] = useState(true);

//Input change 
      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value }); 
       };
      
//  get UserData from backend 
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/getData')
       setUser(req.data);
    //   console.log(user);
    }
    fetchData()
   }, [])
  
  //update data 
  const handleSubmit  = (e) => {
    e.preventDefault();
    const {firstname,lastname,email} = user;
  
    axios.patch('http://localhost:8082/updateProfile', {firstname,lastname,email})
    .then((response) => {
        // setUser(response.data);
        console.log(response.data);
        setUser({...user,firstname:'',lastname:''})
        window.alert("data updated succesfully");
    })
    .catch(err=>console.log(err));
}

//  change password
 const handleSubmitPsw = (e) =>{
    e.preventDefault();
    const {oldpsw,newpsw,email} = user;
  
    axios.patch('/updatePassword', {oldpsw,newpsw,email})
    .then((response) => {
        // setUser(response.data);
        console.log(response.data);
        // setUser({...user,firstname:'',lastname:''})
        window.alert("password updated succesfully");
    })
    .catch(err=>console.log(err));
 }

  const UpdateData=()=>{
    if(val){
       return(
           <form onSubmit={handleSubmit} method='POST' className="login-form" style={{padding:'1rem'}}>
           <div className="form">
           <button style={{marginLeft:'340px',marginTop:'-1px'}} onClick={()=>setVal(false)}>Change Password</button>
           <h2 style={{textAlign:'center'}}>Update Profile</h2>
           
               <div className="form-body" >
                   <div className="email">
                       <label className="form__label" for="email">Email :</label>
                   <input  type="email" name='email' id="email" className="form__input"  value={user.email} autoComplete="off" onChange = {(e) => handleInputChange(e)} style={{border:'none',color:'	rgb(128, 128, 128)'}} placeholder="Email"/>
                   </div>
                   <div className="username">
                       <label className="form__label" for="firstname">First Name :</label>
                       <input className="form__input" name='firstname' type="text" value={user.firstname} autoComplete="off" onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                   </div>
                   <div className="lastname">
                       <label className="form__label" for="lastName">Last Name :</label>
                       <input  type="text" name="lastname" id="lastName" value={user.lastname}  className="form__input" autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                   </div><br/>
                   <button className='btn' type='submit' style={{marginLeft:'100px'}} >Update Profile</button><br/>
               </div>
           </div>
          </form>
       )
    } 
    else{
       return(
        <form  onSubmit={handleSubmitPsw} method='POST'  className="login-form" style={{padding:'1rem'}}>
           <div className="form">
           <button style={{marginLeft:'365px',marginTop:'-1px'}} onClick={()=>setVal(true)}>Update Profile</button>
           <h2 style={{textAlign:'center'}}>Change Password</h2>
           <input  type="email" name='email' id="email" className="form__input" hidden value={user.email} autoComplete="off" onChange = {(e) => handleInputChange(e)} style={{border:'none',color:'	rgb(128, 128, 128)'}} placeholder="Email"/>
               <div className="form-body" >    
                   <div className="password">
                       <label className="form__label" for="psw" > Old Password :</label>
                       <input className="form__input" name='oldpsw' type="password"  id="password" value={user.oldpsw} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                   </div>
                   <div className="confirm-password">
                       <label className="form__label" for="pswrepeat">New Password :</label>
                       <input className="form__input" name='newpsw' type="password" id="confirmPassword" autoComplete="off" value={user.newpsw} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                   </div><br/>
                   <button className='btn' type='submit' style={{marginLeft:'100px'}}>Change Password</button>
                 
               </div>
           </div>
          </form>
       )
    }
}

    return(
        <div className='main'>
         <div className='app'>
           <UpdateData/>
        
       </div> 
       </div>
    )       
}

export default UpdateProfile;