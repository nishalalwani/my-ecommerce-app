import React, { useContext, useEffect } from 'react'
import "./Product.css"
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import {add} from "../store/cartSlice"
import myContext from '../context/MyContext';
import { useNavigate } from 'react-router-dom';


const Product = () => {

    const cartItems=useSelector((state)=>state.cart)

    const context=useContext(myContext)
    const{product,searchkey,filterType,selecttitle,mode}=context

    const dispatch=useDispatch()
    const navigate = useNavigate();
    const addToCart=(item)=>{
       
        dispatch(add(item))
        console.log(item.rating)
    }
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
        console.log("products",product)
    },[cartItems])
    
  return (
        <>
        {product
        .filter((obj) => obj.title.toLowerCase().includes(searchkey))
        .filter((obj) => obj.title.includes(selecttitle))
        .filter((obj) => obj.category.includes(filterType))
         .map((item,index)=>{
            const{id,title,price,imageUrl, description,category,rating}=item
            return(
                    
                <div className="product col-3 col-md-7 col-sm-7" style={{backgroundColor:mode==="dark"?"black":"",color:mode==="dark"?"white":"" ,border:mode==="dark"?"white 1px solid ":"",borderRadius:mode==="dark"?"20px ":""}}>
                <div onClick={()=>navigate(`/productinfo/${id}`)}className="product_information">
                    <button className='product_category_button'  style={{backgroundColor:mode==="dark"?"white":""}}>{category}</button>
                <h4 >{title}</h4>
                <p>{description}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(Number(rating))
                    .fill()
                    .map((_)=>(
                        <p><StarIcon/></p>
                    ))
                    }
                </div>
                </div>
                <img className='product__img' onClick={()=>navigate(`/productinfo/${id}`)}src={imageUrl} alt=''/>
               
                <button onClick={()=>addToCart(item)}>Add to basket</button>
            </div>
            )
        })
    }
       
        
        </>

    
  )
}

export default Product