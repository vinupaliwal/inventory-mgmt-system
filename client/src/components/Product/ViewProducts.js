import React, { useState,useEffect } from 'react'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import{Link,Outlet} from 'react-router-dom';
import UpdateProduct from './UpdateProduct';



function ViewProducts() {

 const [product,setProduct] = useState([]);
 const [val,setVal] = useState("jewellery");
 
// get product data 
   useEffect(() => {
    console.log(val);
    async function fetchData(val) {
      const req = await axios.get(`/viewProduct/${val}`)
       setProduct(req.data)
      console.log(req.data);
    }
   fetchData(val);  
  }, [val])

  // Delete Proudct 
     const deleteProduct = (productid) =>{
    
      axios.delete(`http://localhost:8082/deleteProduct/${productid}`)
      .then((response) => {
          // setUser(response.data);
          console.log(response.data);
          window.alert("product deleted succesfully");
          setProduct(product.filter((value)=>{
            return value.productid !== productid;
          }));
          
      })
      .catch(err=>console.log(err));
   }
 
 

  function Update(productid){
    return(
    <p>honey singh is the king{productid}</p>
    )
  }

  return (
    
    <div className='main'>
            
            <div class="recent-grid">
                <div class="projects">
                    <div class="recent-card">
                    <div class="table" style={{paddingBottom: '6px'}}>
                            <table>
                              <thead >
                                      <tr>
                                          <button onClick={()=>setVal('jewellery')}>Jewellery</button>
                                          <button onClick={()=>setVal('menswear')}>Men's Wear</button>
                                          <button onClick={()=>setVal('womenswear')}>Women's Wear</button>
                                           <button onClick={()=>setVal("footwear")}>Footwear</button> 
                                          <button onClick={()=>setVal('electronics')}>Electronics</button>
                                          <button onClick={()=>setVal('mobilephone')}>Mobile Phones</button>
                                           <button onClick={()=>setVal('books')}>Books</button> 
                                          <button onClick={()=>setVal('sports')}>Sports good </button>
                                          <button onClick={()=>setVal("fitness")}>Fitness Equipment </button>  
                                      </tr>
                                  </thead>
                            </table>
                      </div>
                        <div class="table">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Prodcut Id</td>
                                        <td>Prodcut Name</td>
                                        <td>Category</td>
                                        <td>Brand</td>
                                        <td>Amount</td>
                                         <td>Update</td>
                                        <td>Delete</td>  
                                    </tr>
                                </thead>
                                 
                                <tbody>        
                                    {
                                      product.map((product)=>{
                                            return(
                                              <> 
                                              <tr>
                                                <td>{product.productid}</td>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.amount} </td>
                                                <td>
                                                    <button style={{fontSize:'10px'}}><Link to={{pathname:"/updateProduct",state:product.productid}}><span>Update</span></Link></button>
                                                    
                                                </td>
                                                <td>
                                                    <button  onClick={()=>( deleteProduct(product.productid))} style={{fontSize:'10px'}}>Delete</button>
                                                </td>
                                                </tr>
                                              </>
                                            )

                                          })
                                      }
                                       
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div> 

           

</div>
   

  )
}

export default ViewProducts;