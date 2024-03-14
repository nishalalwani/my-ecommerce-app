import React, { useContext, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Product = () => {
  const cartItems = useSelector((state) => state.cart);

  const context = useContext(myContext);
  const {
    product,
    searchkey,
    filterType,
    selecttitle,
    mode,
    selectedCategory,
    selectedSubcategory,
  } = context;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("Added to cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <div className="product-main" id="allProductsSection">
        <h2 className="title">New Products</h2>
        <div className="product-grid">
          {!selectedCategory || !selectedSubcategory
            ? product
                .map((item, index) => {
                  const {
                    id,
                    title,
                    price,
                    imageUrl1,
                    imageUrl2,
                    subcategory,
                    description,
                    discountedPrice,
                    category,
                    rating,
                  } = item;
                  return (
                    <div className="showcase" key={index}>
                      <div className="showcase">
                        <div className="showcase-banner">
                          <img
                            src={imageUrl1}
                            alt="Mens Winter Leathers Jackets"
                            className="product-img default"
                          />
                          <img
                            src={imageUrl2}
                            alt="Mens Winter Leathers Jackets"
                            className="product-img hover"
                          />
                          <p className="showcase-badge">{category}</p>
                          <div className="showcase-actions">
                            <IconButton
                              className="btn-action"
                              onClick={() => addToCart(item)}
                            >
                              <LocalMallIcon />
                            </IconButton>

                            <IconButton
                              className="btn-action"
                              onClick={() => navigate(`/productinfo/${id}`)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className="showcase-content">
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-category"
                          >
                            {subcategory}
                          </Link>
                          <Link to={`/productinfo/${id}`}>
                            <h3 className="showcase-title">{title}</h3>
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
                            <p className="price">₹{discountedPrice}</p>
                            <del>₹{price}</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            : product
                .filter((obj) => obj.title.toLowerCase().includes(searchkey))
                .filter(
                  (item) =>
                    item.category === selectedCategory &&
                    item.subcategory === selectedSubcategory
                )
                .map((item, index) => {
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
                  } = item;
                  return (
                    <div className="showcase" key={index}>
                      <div className="showcase">
                        <div className="showcase-banner">
                          <img
                            src={imageUrl1}
                            alt="Mens Winter Leathers Jackets"
                            className="product-img default"
                          />
                          <img
                            src={imageUrl2}
                            alt="Mens Winter Leathers Jackets"
                            className="product-img hover"
                          />
                          <p className="showcase-badge">{category}</p>
                          <div className="showcase-actions">
                            <IconButton
                              className="btn-action"
                              onClick={() => addToCart(item)}
                            >
                              <LocalMallIcon />
                            </IconButton>

                            <IconButton
                              className="btn-action"
                              onClick={() => navigate(`/productinfo/${id}`)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className="showcase-content">
                          <Link
                            to={`/productinfo/${id}`}
                            className="showcase-category"
                          >
                            {subcategory}
                          </Link>
                          <Link to={`/productinfo/${id}`}>
                            <h3 className="showcase-title">{title}</h3>
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
                            <p className="price">{price}</p>
                            <del>$75.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>
    </>
  );
};

export default Product;
