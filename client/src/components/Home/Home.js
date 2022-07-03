import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Home.css';


function Home() {
   const[user,setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/home')
       setUser(req.data);
      console.log(user);
    }

    fetchData()
  }, [])

  return (
    <>   
        
        <div className="main">
                
                <h1 style={{textAlign:'center',marginTop:'30px'}}>Welcome to Inventory Managment System</h1>
                <div className="recent-grid">
                    <div className="projects">
                    
                            <p>{user.firstname}</p>
                            <p>{user.lastname}</p>
                            <p>{user.email}</p>
                            <p>{user.psw}</p>
                            <p>{user.psw}</p>
                          
                        
                    </div>
                    
                </div>

            </div>
    
    </>
  )
}

export default Home;