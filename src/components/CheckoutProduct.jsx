import React ,{useContext,useEffect}from 'react'
import "./CheckoutProduct.css"
import StarIcon from '@mui/icons-material/Star';
import { useDispatch,useSelector } from 'react-redux';
import {del} from "../store/cartSlice"
import myContext from '../context/MyContext'


const CheckoutProduct = ({id,title,imageUrl,description,price,rating}) => {
    const item={id,title,imageUrl,description,price,rating}
    const context=useContext(myContext)

    const cartItems=useSelector((state)=>state.cart)
    const{mode}=context
    const dispatch = useDispatch()
    const delProd=(item)=>{
        console.log(id)
        dispatch(del(item))
    }

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])
   
  return (
    <>
     <div className="checkoutProduct">
     <img  src={imageUrl} alt=''/>
            <div className="chekoutProduct_info">
            <h4 style={{color:mode==="dark"?"white":""}}>{title}</h4>
            <p>{description}</p>
            <p className="product_price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct_rating">
                {Array(Number(rating))
                .fill()
                .map((_)=>(
                    <p><StarIcon/></p>
                ))
                }
            </div>
            <button onClick={()=>delProd(item)}>Remove from Basket</button>
            </div>
           
            
        </div>
    </>
  )
}

export default CheckoutProduct