import React,{useContext} from 'react'
import{Link,Outlet} from 'react-router-dom';
import { UserContext } from '../../App';

function SideBar() {
    const {state,dispatch} = useContext(UserContext)
    const RenderMenu = ()=>{
        
            if(state){
                return(
                <ul>
                    <li><Link to="/home"><span className='bx bxs-dashboard'></span><span>Home</span></Link></li>
                    <li><Link to="/updateProfile"><span className='bx bx-home-circle'></span><span>Update Profile</span></Link></li>
                    <li><Link to="/addProduct"><span className='bx bx-user-circle'></span><span>Add Product</span></Link></li>
                    <li><Link to="/viewProducts"><span className='bx bx-user-plus'></span><span>View Prodcut</span></Link></li>
                    <li><Link to="/logout"><span className='bx bx-user-plus'></span><span>Log out</span></Link></li>
                </ul>
                )
            }
           else{
                return(
                    <ul>
                    <li><Link to="/home"><span className='bx bxs-dashboard'></span><span>Dashboard</span></Link></li>
                    <li><Link to="/home"><span className='bx bx-home-circle'></span><span>Home</span></Link></li>
                    <li><Link to="/addProduct"><span className='bx bx-user-circle'></span><span>Add Product</span></Link></li>
                    <li><Link to="/viewProducts"><span className='bx bx-user-plus'></span><span>View Prodcut</span></Link></li>
                    <li><Link to="/login"><span className='bx bx-user-plus'></span><span>Login</span></Link></li>
                    <li><Link to="/registration"><span className='bx bx-user-plus'></span><span>Register</span></Link></li>
                </ul>  
                )
            }
        
    }

  return (
    <>
        <div className="sidebar">
            <div className="brand">
                <h1><span className='bx bxs-bank'></span><span>Shail Group</span></h1>
            </div>
            <div className="sidebar-menu">
                <RenderMenu/>
            </div>
        </div>
        <Outlet/>
    </>
  )
}

export default SideBar;