import React,{ useContext } from 'react'
import "./AddProduct.css"
import { Link } from 'react-router-dom'
import myContext from '../context/MyContext'
import Loader from '../loader/Loader'

const UpdateProduct = () => {
    const context= useContext(myContext)
    const {loading,products,setProducts,updateProducthandle} = context
  return (
    <>
<div className="login">
            <Link to="/">
            <img 
            className='login_logo'
            src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" alt="" />
           </Link>


           <div className="addproduct_container">
            <h1>UPDATE PRODUCT</h1>
              
            <form>
            {loading && <div style={{display:"flex", justifyContent:"center", alignItem:"center"}}><Loader/></div>}
                <h5>Product Title</h5>
                <input type="text"value={products.title} onChange={(e)=>setProducts({...products,title:e.target.value})}/>

                <h5>Product Category</h5>
                <input type="text"value={products.category} onChange={(e)=>setProducts({...products,category:e.target.value})}/>

                <h5>Product Price</h5>
                <input type="number" value={products.price} onChange={(e) => setProducts({ ...products, price: e.target.value })} />

                <h5>Product Rating</h5>
                <input type="number" value={products.rating} onChange={(e) => setProducts({ ...products, rating: e.target.value })} />

                <h5>Product ImageUrl</h5>
                <input type="url"onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}/>

                <h5>Product Description</h5>
                <input type="text"value={products.description} onChange={(e) => setProducts({ ...products, description: e.target.value })}/>
                

                <button className='login_addproductButton' onClick={updateProducthandle}>UPDATE PRODUCT</button>
            </form>

           

    
        </div>
           
        </div>

    </>
  )
}

export default UpdateProduct