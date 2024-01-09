import React,{useState,useEffect} from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import "./Header.css"
import {useNavigate,Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import myContext from '../context/MyContext';


const Header = () => {

  const context=useContext(myContext)
  const navigate=useNavigate()

  const{toggleMode,mode}=context

  const user= JSON.parse(localStorage.getItem("user"))
  console.log(user)

  const logoutUser=()=>{
    localStorage.clear("user")
    navigate("/")
  }
  


  const cartProducts=useSelector(state=>state.cart)//use slector will give the state of project

  
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <nav className='header'>

          {/* logo */}
          <Link to="/">
        <img
        className='header_logo'
        src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
        alt=''
        />
        </Link>

        {/* searchbox */}

        <div className="header_search">
        <input type="text" className='header_searchInput'/>
        <SearchIcon className="header_searchIcon"/>
        </div>

        {/* 3 Links */}
        



        
        <div className="header_nav">

          {
            user?.user?.email==="admin@gmail.com"?
            <Link to="/dashboard" className='header_link'>
          <div className="header_option">
          <span className='header_optionLineOne'>Hello Admin</span>
          <span className='header_optionLineTwo'>Dashboard</span>
          </div>
           </Link>:""
          }
           
           {user?
            <div className="header_option">
            <span style={{color:"white"}} className='header_optionLineOne'>Hello {user.user.email}</span>
            <span onClick={logoutUser} className='header_optionLineTwo'>Log out</span>
            </div>
            
          :
          <Link to="/login" className='header_link'>
          <div className="header_option">
          <span className='header_optionLineOne'>Hello Guest</span>
          <span className='header_optionLineTwo'>Sign In</span>
          </div>
        </Link>
          
          }
      
          {/* 1st link */}
         

            {/* 2nd link */}
            <Link to="/order" className='header_link'>
            <div className="header_option">
            <span className='header_optionLineOne'>Returns</span>
            <span className='header_optionLineTwo'>&Orders</span>
            </div>
            </Link>

              {/* 3rd link */}
              <Link onClick={()=>toggleMode()} className='header_link'>
            <div className="header_option">
            <span className='header_optionLineOne'><DarkModeIcon/></span>
           
            </div>
          </Link>

          {/* 4th link */}
          <Link to ="/checkout">
            <div className="header_optionBasket">
              {/* shopping basket icon */}
              <LocalMallIcon/>
              {/* no. of items in the basket */}
              <span className='header_optionLineTwo header_basketCount'>{cartProducts.length}</span>
            </div>
          </Link>
        </div>
        </nav>
        </Navbar>

    </div>
  )
}

export default Header