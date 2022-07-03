import React,{useState,useEffect} from 'react';
import axios from 'axios';

function UpdateProduct({vals}) {
    console.log(vals);
    const [product, setProduct] = useState([]);
    const [val, setVal] = useState(vals); 
       const handleInputChange = (e) => {
         e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setProduct({ ...product, [name]: value });
      };


// // get product data 
// useEffect(() => {
//     console.log(val);
//     async function fetchData(val) {
//       const req = await axios.get(`/viewProduct/${val}`)
//        setProduct(req.data)
//       console.log(req.data);
//     }
//    fetchData(val);  
//   }, [val])

  //update data 
  const updateProduct = (productid) => { 
    const {name,category,brand,amount} = product;
    axios.patch(`http://localhost:8082/updateProduct/${productid}`, {name,category,brand,amount})
    .then((response) => {
        // setUser(response.data);
        console.log(response.data);
        window.alert("data updated succesfully");
    })
    .catch(err=>console.log(err));
    
}

  return (
    <>
      <div className='main'>
      <div className='app'>
        
        <form onSubmit={updateProduct} method='POST' className="login-form">
        <div className="form">
        <h2 style={{textAlign:'center'}}>Update Product</h2>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="product">Product Id :</label>
                    <input className="form__input" name='productid' type="text" value={product.productid} autoComplete="off" onChange = {(e) => handleInputChange(e)} id="product" placeholder="Product id"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="name">Product Name :</label>
                    <input  type="text" name="name" id="name" value={product.name}  className="form__input" autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="name">Category :</label>
                    <input  type="text" name="category" id="name" value={product.category}  className="form__input" autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Category"/>
                </div>
                <div className="password">
                    <label className="form__label" for="brand">Brand :</label>
                    <input className="form__input" name='brand' type="text"  id="brand" value={product.brand} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Brand"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="amount">Amount :</label>
                    <input className="form__input" name='amount' type="text" id="amount" autoComplete="off" value={product.amount} onChange = {(e) => handleInputChange(e)} placeholder="Amount"/>
                </div>
            </div>
            <div class="footer">
                <button  type="submit" class="btn">Update Product</button>
            </div>
        </div>
       </form>
           
          </div>
        </div>
      
    </>
  )
}

export default UpdateProduct