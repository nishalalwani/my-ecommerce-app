import React, { useContext, useState, useEffect, useRef } from "react";
import { add } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import myContext from "../../context/MyContext";
import { toast } from "react-toastify";

const Countdown = () => {
  const context = useContext(myContext);
  const dispatch = useDispatch();
  const { product } = context || {};
  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("Added to cart");
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerRef = useRef(null);
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
  } = product?.[0] || {};

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

  useEffect(() => {
    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      // Clear interval on component unmount
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <div>
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
                    <p className="countdown-desc">Hurry Up! Offer ends in:</p>
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
                        <p className="display-number">{timeLeft.minutes}</p>
                        <p className="display-text">Min</p>
                      </div>
                      <div className="countdown-content">
                        <p className="display-number">{timeLeft.seconds}</p>
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
  );
};

export default Countdown;
