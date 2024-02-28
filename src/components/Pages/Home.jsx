import React, { useContext, useState, useEffect, useRef } from "react";
import "../Layout/Home.css";
import Product from "./Product";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import myContext from "../../context/MyContext";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";
import banner4 from "../../images/banner4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import WifiCallingIcon from "@mui/icons-material/WifiCalling";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { add } from "../../store/cartSlice";

const Home = () => {
  const context = useContext(myContext);
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("add to cart");
  };

  const { product } = context || {};
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const slides = [{ image: banner2 }, { image: banner3 }, { image: banner4 }];

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const {
    title,
    id,
    price,
    imageUrl1,
    imageUrl2,
    subcategory,
    description,
    category,
    rating,
    discountedPrice,
  } = product?.[13] || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted or when timeLeft reaches 0
    return () => clearTimeout(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2024-04-20") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <Layout>

      <div className="slider-wrapper">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="slider-item">
              <img src={slide.image} alt="" className="banner-img" />
            </div>
          ))}
        </Slider>
      </div>

      <div className="product-container">
        <div className="container">

          {/* Sidebar */}
          
          <div className="sidebar  has-scrollbar">
            <div className="sidebar-category">
              <div className="product-showcase">
                <h3 className="showcase-heading">best sellers</h3>
                <div className="showcase-wrapper">
                  {product.slice(5, 11).map((item, index) => {
                    const {
                      id,
                      title,
                      price,
                      imageUrl1,
                      imageUrl2,
                      subcategory,
                      discountedPrice,
                      category,
                      rating,
                    } = item;
                    return (
                      <div className="showcase-container">
                        <div className="showcase" key={index}>
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-img-box"
                          >
                            <img
                              src={imageUrl1}
                              alt="baby fabric shoes"
                              width={75}
                              height={75}
                              className="showcase-img"
                            />
                          </Link>
                          <div className="showcase-content">
                            <Link to={`/productinfo/${id}`}>
                              <h4 className="showcase-title">{title}</h4>
                            </Link>
                            <div className="showcase-rating">
                              {Array(Number(rating))
                                .fill()
                                .map((_, index) => (
                                  <p key={index}>
                                    <StarIcon />
                                  </p>
                                ))}
                            </div>
                            <div className="price-box">
                              <del>₹{price}</del>
                              <p className="price">₹{discountedPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="product-box">
            <div className="product-minimal">
              <div className="product-showcase">
                <h2 className="title">New Arrivals</h2>
                <div className="showcase-wrapper has-scrollbar">
                  <div className="showcase-container">
                    {product.slice(2, 5).map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        imageUrl1,
                        imageUrl2,
                        subcategory,
                        description,
                        category,
                        rating,
                        discountedPrice,
                      } = item;
                      return (
                        <div className="showcase" key={index}>
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-img-box"
                          >
                            <img
                              src={imageUrl1}
                              alt="relaxed short full sleeve t-shirt"
                              width={70}
                              className="showcase-img"
                            />
                          </Link>
                          <div className="showcase-content">
                            <Link to={`/productinfo/${id}`}>
                              <h4 className="showcase-title">{title}</h4>
                            </Link>
                            <Link
                              to={`/productinfo/${id}`}
                              className="showcase-category"
                            >
                              {category}
                            </Link>
                            <div className="price-box">
                              <p className="price">₹{discountedPrice}</p>
                              <del>₹{price}</del>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="product-showcase">
                <h2 className="title">Trending</h2>
                <div className="showcase-wrapper  has-scrollbar">
                  <div className="showcase-container">
                    {product.slice(12, 15).map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        imageUrl1,
                        imageUrl2,
                        subcategory,
                        description,
                        category,
                        discountedPrice,
                        rating,
                      } = item;
                      return (
                        <div className="showcase" key={index}>
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-img-box"
                          >
                            <img
                              src={imageUrl1}
                              alt="running & trekking shoes - white"
                              className="showcase-img"
                              width={70}
                            />
                          </Link>
                          <div className="showcase-content">
                            <Link to={`/productinfo/${id}`}>
                              <h4 className="showcase-title">{title}</h4>
                            </Link>
                            <Link
                              to={`/productinfo/${id}`}
                              className="showcase-category"
                            >
                              {category}
                            </Link>
                            <div className="price-box">
                              <p className="price">₹{discountedPrice}</p>
                              <del>₹{price}</del>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="product-showcase">
                <h2 className="title">Top Rated</h2>
                <div className="showcase-wrapper  has-scrollbar">
                  <div className="showcase-container">
                    {product.slice(15, 18).map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        imageUrl1,
                        imageUrl2,
                        subcategory,
                        description,
                        category,
                        discountedPrice,
                      } = item;
                      return (
                        <div className="showcase" key={index}>
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-img-box"
                          >
                            <img
                              src={imageUrl1}
                              alt="running & trekking shoes - white"
                              className="showcase-img"
                              width={70}
                            />
                          </Link>
                          <div className="showcase-content">
                            <Link to={`/productinfo/${id}`}>
                              <h4 className="showcase-title">{title}</h4>
                            </Link>
                            <Link
                              to={`/productinfo/${id}`}
                              className="showcase-category"
                            >
                              {category}
                            </Link>
                            <div className="price-box">
                              <p className="price">₹{discountedPrice}</p>
                              <del>₹{price}</del>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Products section */}

            <Product />

            {/* Deal of the day  Section*/}

            {product && product.length > 0 && (
              <div className="product-featured">
                <h2 className="title">Deal of the day</h2>
                <div className="showcase-wrapper has-scrollbar">
                  <div className="showcase-container">
                    <div className="showcase">
                      <div className="showcase-banner">
                        <img
                          src={imageUrl1}
                          alt="shampoo, conditioner & facewash packs"
                          className="showcase-img"
                        />
                      </div>
                      <div className="showcase-content">
                        <div className="showcase-rating">
                          {Array(Number(rating))
                            .fill()
                            .map((_, index) => (
                              <p key={index}>
                                <StarIcon />
                              </p>
                            ))}
                        </div>
                        <Link to={`/productinfo/${id}`}>
                          <h3 className="showcase-title">{title}</h3>
                        </Link>
                        <p className="showcase-desc">{description}</p>
                        <div className="price-box">
                          <p className="price">₹{discountedPrice}</p>
                          <del>₹{price}</del>
                        </div>
                        <button
                          className="add-cart-btn"
                          onClick={() => addToCart(product[13])}
                        >
                          add to cart
                        </button>
                        <div className="showcase-status">
                          <div className="showcase-status-bar" />
                        </div>
                        <div className="countdown-box">
                          <p className="countdown-desc">
                            Hurry Up! Offer ends in:
                          </p>
                          <div className="countdown">
                            <div className="countdown-content">
                              <p className="display-number">{timeLeft.days}</p>
                              <p className="display-text">Days</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">{timeLeft.hours}</p>
                              <p className="display-text">Hours</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">
                                {timeLeft.minutes}
                              </p>
                              <p className="display-text">Min</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">
                                {timeLeft.seconds}
                              </p>
                              <p className="display-text">Sec</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>

        <div className="container">
          <div className="testimonials-box">
            <div className="cta-container">
              <img
                src={banner1}
                alt="summer collection"
                className="cta-banner"
              />
            </div>
            {/*
      - SERVICE
    */}
            <div className="service">
              <h2 className="title">Our Services</h2>
              <div className="service-container">
                <Link to="#" className="service-item">
                  <div className="service-icon">
                    <LocalShippingIcon />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Next Day delivery</h3>
                    <p className="service-desc">Rajasthan Orders Only</p>
                  </div>
                </Link>
                <Link to="#" className="service-item">
                  <div className="service-icon">
                    <WifiCallingIcon />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Best Online Support</h3>
                    <p className="service-desc">Hours: 8AM - 11PM</p>
                  </div>
                </Link>
                <Link to="#" className="service-item">
                  <div className="service-icon">
                    <UnarchiveIcon />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Return Policy</h3>
                    <p className="service-desc">Easy &amp; Free Return</p>
                  </div>
                </Link>
                <Link to="#" className="service-item">
                  <div className="service-icon">
                    <CreditScoreIcon />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">30% money back</h3>
                    <p className="service-desc">For Order Over 1000</p>
                  </div>
                </Link>
                <Link to="#" className="service-item">
                  <div className="service-icon">
                    <AddLocationAltIcon />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">PAN India Delivery</h3>
                    <p className="service-desc">For Order Over $100</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
