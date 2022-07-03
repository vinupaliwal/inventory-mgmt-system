import React, {useState} from 'react';
import axios from 'axios';
import '../Registration/Registration.css';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productid: "", name:"", category:"", brand:"", amount:""
      });

      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setProduct({ ...product, [name]: value });
      };

    const handleSubmit  = (e) => {
        e.preventDefault();
        const {productid,name,category,brand,amount} = product;

      
        axios.post('http://localhost:8082/addProduct', {productid,name,category,brand,amount})
        .then((response) => {
            setProduct(response.data);
            window.alert("product added successfully");
            navigate('/addProduct');
        })
        .catch(err=>console.log(err));
    }

    return(
        <div className='main'>
        <div className='app'>
        <form onSubmit={handleSubmit} method='POST' className="login-form">
        <div className="form">
        <h2 style={{textAlign:'center'}}>Add Product</h2>
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
                    <input  type="text" name="category" id="name" value={product.category}  className="form__input" autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="name"/>
                </div>
                <div className="password">
                    <label className="form__label" for="brand">Brand :</label>
                    <input className="form__input" name='brand' type="text"  id="brand" value={product.brand} autoComplete="off" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="amount">Amount :</label>
                    <input className="form__input" name='amount' type="text" id="amount" autoComplete="off" value={product.amount} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button  type="submit" class="btn">Add Product</button>
            </div>
        </div>
       </form>
       </div>  
       </div>
    )       
}

export default AddProduct;