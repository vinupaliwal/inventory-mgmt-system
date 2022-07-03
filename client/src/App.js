import './App.css';
import Login from './components/Longin/Login';
import Logout from './components/Longin/Logout';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import AddProduct from './components/Product/AddProduct';
import SideBar from './components/Home/SideBar';
import Header from './components/Home/Header';
import UpdateProfile from './components/Registration/UpdateProfile';
import ViewProducts from './components/Product/ViewProducts';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './components/Home/Home.css';
import { createContext, useReducer } from 'react';
import { initialState,reducer } from './reducer/UseReducer';
import UpdateProduct from './components/Product/UpdateProduct';

// Context Api
export const UserContext = createContext();

const Routing = ()=>{
   return(
    <Routes>                
        <Route index element={<Home/>} />
        <Route path='/home' element={<Home/>}  />
        <Route path='/updateProfile' element={<UpdateProfile/>}  />
        <Route path='/addProduct' element={<AddProduct/>}  />
        <Route path='/viewProducts' element={<ViewProducts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/updateProduct' element={<UpdateProduct/>}  /> 
    </Routes>
   )
}

function App() {

   const [state,dispatch] = useReducer(reducer,initialState);


  return (
    <> 
      <UserContext.Provider value={{state,dispatch}}>
       <Router>
         <SideBar/>
         <div className="main-content">   
            <Header/>
            <Routing/>
         </div>
       </Router>  
      </UserContext.Provider>    
    </>
  );
}

export default App;
