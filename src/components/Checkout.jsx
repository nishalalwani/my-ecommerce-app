import React, { useContext } from 'react'
import "./Checkout.css"
import Subtotal from './Subtotal'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import CheckoutProduct from './CheckoutProduct'
import Layout from './Layout'
import myContext from '../context/MyContext'



const Checkout = () => {
  const context=useContext(myContext)
  const{mode}=context
    const productCart=useSelector(state=>state.cart)
  return (
    <>
     <Layout>
   
        <div className="checkout" style={{backgroundColor:mode==="dark"?"black":""}}>
            <div className="checkout_left">
                <img
                className='checkout_ad'
                src='https://wp-public-fs.s3.ap-south-1.amazonaws.com/tasks/15f817e7a0c11848b3c97dac159ad9ed85759aedee63be/images/screenshot%20(9)-5f8969256632d.png'
                alt=''
                />
                <div style={{color:mode==="dark"?"white":""}} >
                    <h2 className='checkout_title'>
                        Your Shopping Basket
                    </h2>
                   {productCart.map(item=>(
                    
                     <CheckoutProduct
                     id={item.id}
                     title={item.title}
                     imageUrl={item.imageUrl}
                     price={item.price}
                     rating={item.rating}
                     description={item.description}
                     />
                     ))} 
                </div>
            </div>
            <div className="checkout_right">
             <Subtotal/>
            </div>
        </div>
        </Layout>
    </>
  )
}

export default Checkout