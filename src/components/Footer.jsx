import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className="foot_pannel">
       

        <ul>
           <p>Get to know us</p> 
           <a>Careers</a>
           <a>Blog</a>
           <a>About Amazon</a>
           <a>Amazon services</a>
           <a>Amazon Device</a>
        </ul>

        <ul>
           <p>Make Money with Us</p> 
           <a>Sell apps on Amazon</a>
           <a>Blog</a>
           <a>Become an Affiliate</a>
           <a>Self-Publish with Us</a>
           <a>Host an Amazon Hub</a>
           <a>Sell products on Amazon</a>
           <a>Sell on Amazon Business</a>
        </ul>

        
        <ul>
           <p>Amazon Payment Products</p> 
           <a>Amazon Business Card</a>
           <a>Shop with Points</a>
           <a>Reload Your Balance</a>
           <a>Amazon Currency Converter</a>
        </ul>

        <ul>
           <p>Let Us Help You</p> 
           <a>Shipping Rates & Policies</a>
           <a>Returns & Replacements</a>
           <a>Amazon Assistant</a>
           <a>Your Orders</a>
           <a>Help</a>
        </ul>
        
    </div>

    <div className="foot_pannel2">   
     <Link to="/">
        <img
        className='footer_logo'
        src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
        alt=''
        />
        </Link>
    </div>

    <div className="foot_pannel3">
        <p>Conditions of Use
Privacy Notice
Your Ads Privacy Choices
© 1996-2023, Amazon.com, Inc. or its affiliates</p>
    </div>
    </>
  )
}

export default Footer