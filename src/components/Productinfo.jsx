import React, { useState,useContext, useEffect } from 'react'
import "./Productinfo.css"
import Layout from './Layout'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import myContext from '../context/MyContext';
import { useParams } from 'react-router-dom';
import { fireDB } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { getDoc ,doc} from 'firebase/firestore';
import { useDispatch,useSelector } from 'react-redux';
import {add} from "../store/cartSlice"



const Productinfo = () => {

    const params = useParams()
    const dispatch=useDispatch()
    const cartItems = useSelector((state) => state.cart)
    const context=useContext(myContext)

    const[myproduct,setMyproduct]=useState('')

    const getMydata=async()=>{
        try{
            const productTemp= await getDoc(doc(fireDB,"products",params.id))
     
            setMyproduct(productTemp.data())
            
            
        }
        catch(error){

            toast.error("error found.!")
        }
    }
    useEffect(()=>{
        getMydata()
    
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    

    const addTocart=(myproduct)=>{
        dispatch(add(myproduct))
        toast.success('add to cart');
    }
    

   

  return (
    <>
    <Layout>
        <div>
        
           {myproduct&&
            
           <div className="container product_info ">
        
                    <div className="productinfo_content">
                        <img
                            alt="ecommerce"
                            className="productinfo_img"
                            src={myproduct.imageUrl}
                        />
                        <div className="productinfo_desc">
                            <h2 className="productinfo_heading">
                                BRAND NAME
                            </h2>
                            <h1 className="productinfo_title">
                                {myproduct.title}
                            </h1>
                            <div className="productinfo_icon">
                                <span className="productinfo_rating">
                                    {Array(Number(myproduct.rating))
                                        .fill()
                                        .map((_)=>(
                                            <p><StarIcon/></p>
                                        ))
                                    }
                                    
                                </span>
                                <span className="productinfo_social">
                                    <Link >
                                    <FacebookIcon/>
                                    </Link>
                                    <Link >
                                    <TwitterIcon/>
                                    </Link>
                                    <Link >
                                    <MapsUgcIcon/>
                                    </Link>
                                </span>
                            </div>
                            <p className="productinfo_info">
                                {myproduct.description}
                            </p>
                         
                            <div className="flex">
                                <span className="productinfo_price">
                                    ${myproduct.price}
                                </span>
                                <button onClick={()=>addTocart(myproduct)} className="productinfo_button">
                                    Add To Cart
                                </button>
                               
                            </div>
                        </div>
                    </div>
   </div>
            } 
    
   </div>
   </Layout>
    </>
  )
}

export default Productinfo