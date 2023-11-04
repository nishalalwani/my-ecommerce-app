import React, { useContext } from 'react'
import "./Home.css"
import Product from './Product'
import Layout from './Layout'
import SearchIcon from '@mui/icons-material/Search';
import myContext from '../context/MyContext'


const Home = () => {

  const context =useContext(myContext)
  const{mode,searchkey, setSearchkey, filterType, setFilterType,product,setSelecttitle,selecttitle,searchfilterkey}=context
  
  return (
    <>
 <Layout>
        <div className="home">
            <img
            className='home_image'
            src='https://allstarsdigital.in/wp-content/uploads/2020/09/drive-sales-to-amazon-1024x546.jpg'
            alt=''
            />


            <div className="searchitem" style={{backgroundColor:mode==="dark"?"#090909ba":"",border:mode==="dark"?" 2px solid rgb(255 255 255)":"", boxShadow:mode==="dark"?"2px -1px 8px 0px rgb(145 145 145)":""}}>
            <div className="searchbar">
            <SearchIcon className="home_searchIcon"/>
            < input style={{boxShadow:mode==="dark"?"1px -1px 8px 0px rgb(145 145 145)":""}}
            type="text" 
            className='home_searchInput' 
            placeholder="search here" 
            value={searchkey}
            onChange={(e)=>setSearchkey(e.target.value)}
            />
        
            </div>
            
             <div className="advance_search">
                 <div className="search">
                      <select
                           name='Category'
                           value={filterType} 
                           onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="" selected>Category</option>

                        {/* searchfilterkey ..to avoid duplicate */}
                        
                        {searchfilterkey.map((ele)=>{
                          return(
                            <option value={ele}>{ele}</option>
                          )
                        })}
                     
                      </select>
                    </div>
                  <div className="search">
                      <select
                        name="Title" 
                        value={selecttitle}
                        onChange={(e)=>setSelecttitle(e.target.value)}
                  

                      >
                        <option value="" selected>Product Type</option>
                        {product.map((ele)=>{
                          return(
                            <option value={ele.title}>{ele.title}</option>
                          )
                        })}
                        
                      </select>
                    </div>
              </div>
              </div>

            {/* product id,title,price,rating,image */}

            <h1 className='top_heading' style={{color:mode==="dark"?"white":""}}>Our Top Products</h1>
        <div className="home_row row">
          
            <Product/>
          
          
        </div>
        {/* <div className="home_row">
            <Product
            id="12346"
            title="SHENGXINY Women Baseball Hoodies Fashion Graphic Pullover Sweatshirts Casual Athletic Tops Waffle Drawstring Hoodie Sweater"
            price={10.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71O3J7c3ucL._AC_UX385_.jpg"
            />
              <Product
            id="12347"
            title="Ykomow Fall Pumpkin Shirts Womens Casual Autumn Thanksgiving Graphic Tees Halloween Tops"
            price={17.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/71qw0fNGH8L._AC_UX342_.jpg"
            />
                 <Product
            id="12348"
            title="Password Book with Alphabetical Tabs - 4.5'' x 6'' Internet Password Keeper Book, Password Notebook for Office or Home, Purple"
            price={7.95}
            rating={5}
            image="https://m.media-amazon.com/images/I/71FykitNK5L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
            />
        </div>
        <div>
        <Product
            id="1234"
            title="LOGENE Women's 1/4 Zipper V Neck Oversized Sweater 2023 Fall Fuzzy Knit Chunky Warm Pullover Sweaters Tops"
            price={36.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/81J-uKnRuiL._AC_UY445_.jpg"
            />
            </div> */}
        </div>
        </Layout>
    </>
  )
}

export default Home