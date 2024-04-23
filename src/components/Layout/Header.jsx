import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import "./Home.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux/es/hooks/useSelector";
import myContext from "../../context/MyContext.jsx";
import logo from "../../images/ecom-icon.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "../../javascript.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Header = () => {
  const context = useContext(myContext);
  const {
    product,
    setSearchkey,
    searchkey,
    setSelectedSubcategory,
    setSelectedCategory,
  } = context;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const matchedProductRef = useRef(null);

  const handleSearch = () => {
    const filteredProducts = product.filter((prod) =>
      prod.title.toLowerCase().includes(searchkey.toLowerCase())
    );
    setMatchedProducts(filteredProducts);
  };

  function handleChange(e) {
    const inputValue = e.target.value;
    setSearchkey(inputValue);
    if (inputValue.trim() === "") {
      setMatchedProducts([]); // Clear matched products if search input is empty
    } else {
      debouncedHandleSearch(inputValue); // Invoke search function only when search input is not empty
    }
  }

  const handleSubcategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    const allProductsSection = document.getElementById("allProductsSection");

    // Scroll to the "All Products" section
    if (allProductsSection) {
      allProductsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const debouncedHandleSearch = debounce(handleSearch, 300);

  useEffect(() => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSearchkey("");
    setMatchedProducts([]);
  }, [location.pathname]);

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    localStorage.clear("user");
    navigate("/");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOverlayVisible(!overlayVisible);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = {};
  const menSubcategories = new Set();
  const womenSubcategories = new Set();
  const perfumeSubcategories = new Set();

  const cartProducts = useSelector((state) => state.cart); //use slector will give the state of project
  product.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = new Set();
    }
    categories[item.category].add(item.subcategory);
  });

  product.forEach((item) => {
    if (item.category === "Men") {
      menSubcategories.add(item.subcategory);
    } else if (item.category === "Women") {
      womenSubcategories.add(item.subcategory);
    } else if (item.category === "Fragrance") {
      perfumeSubcategories.add(item.subcategory);
    }
  });

  useEffect(() => {
    return () => {
      // Clear matchedProducts when the component unmounts
      setMatchedProducts([]);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!matchedProductRef.current.contains(e.target)) {
        setMatchedProducts([]);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <header>
        <div className="header-top">
          <div className="container">
            <ul className="header-social-container">
              <li>
                <Link to="/" className="social-link">
                  <InstagramIcon style={{ height: "15px" }} />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <FacebookOutlinedIcon style={{ height: "15px" }} />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <WhatsAppIcon style={{ height: "15px" }} />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <TwitterIcon style={{ height: "15px" }} />
                </Link>
              </li>
            </ul>
            <div className="header-alert-news">
              <p>
                <b>Free Shipping </b>
                This Week Order Over - ₹500
              </p>
            </div>
            <div className="header-top-actions">
              <select name="currency">
                <option value="eur">INR ₹</option>
                <option value="usd">USD $</option>
              </select>
              <select name="language">
                <option value="en-US">English</option>
                <option value="es-ES">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <Link to="/" className="header-logo">
              <img src={logo} alt="Anon's logo" width={75} height={70} />
            </Link>
            <div className="header-search-container" ref={matchedProductRef}>
              <input
                type="search"
                name="search"
                className="search-field"
                onChange={handleChange}
                placeholder="Enter your product name..."
              />
              <button className="search-btn" onClick={handleSearch}>
                <SearchIcon />
              </button>
              {matchedProducts.length > 0 && (
                <div className="matched-products">
                  {matchedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="product-item"
                      onClick={() => {
                        navigate(`/productinfo/${product.id}`);
                        setMatchedProducts([]);
                      }}
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="header-user-actions">
              <Link to="/order">
                <span className="menu-title">My orders</span>
              </Link>

              <Link to="/checkout">
                <IconButton className="action-btn">
                  <LocalMallIcon />
                  <span className="count">{cartProducts.length}</span>
                </IconButton>
              </Link>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you really want to logout?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      logoutUser();
                      handleClose();
                    }}
                    autoFocus
                  >
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>

              {user ? (
                <div>
                  <Tooltip title={user.user.email}>
                    <IconButton
                      onClick={handleClickOpen}
                      className="action-btn"
                    >
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <Link to="/login">
                  <span>Sign In </span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <nav className="desktop-navigation-menu">
          <div className="container">
            <ul className="desktop-menu-category-list">
              <li className="menu-category">
                <Link to="/" className="menu-title">
                  Home
                </Link>
              </li>
              <li className="menu-category">
                <Link to="/" className="menu-title">
                  Categories
                </Link>
                <div className="dropdown-panel">
                  {Object.entries(categories).map(
                    ([category, subcategories]) => (
                      <ul className="dropdown-panel-list" key={category}>
                        <li className="menu-title">
                          <Link to="/">{category}</Link>
                        </li>
                        {[...subcategories].map((subcategory) => (
                          <li
                            onClick={() =>
                              handleSubcategorySelect(category, subcategory)
                            }
                            className="panel-list-item"
                            key={subcategory}
                          >
                            <Link to="/">{subcategory}</Link>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </li>
              <li className="menu-category">
                <Link to="/" className="menu-title">
                  Men's
                </Link>
                <ul className="dropdown-list">
                  {[...menSubcategories].map((subcategory) => (
                    <li
                      onClick={() =>
                        handleSubcategorySelect("Men", subcategory)
                      }
                      className="dropdown-item"
                      key={subcategory}
                    >
                      <Link to="/">{subcategory}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="menu-category">
                <Link to="/" className="menu-title">
                  Women's
                </Link>
                <ul className="dropdown-list">
                  {[...womenSubcategories].map((subcategory) => (
                    <li
                      onClick={() =>
                        handleSubcategorySelect("Women", subcategory)
                      }
                      className="dropdown-item"
                      key={subcategory}
                    >
                      <Link to="/">{subcategory}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="menu-category">
                <Link to="/" className="menu-title">
                  Fragrance
                </Link>
                <ul className="dropdown-list">
                  {[...perfumeSubcategories].map((subcategory) => (
                    <li
                      onClick={() =>
                        handleSubcategorySelect("Fragrance", subcategory)
                      }
                      className="dropdown-item"
                      key={subcategory}
                    >
                      <Link to="/">{subcategory}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="menu-category">
                {user?.user?.email === "admin@gmail.com" ? (
                  <Link to="/dashboard" className="menu-title">
                    Dashboard
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </nav>
        <div className="mobile-bottom-navigation">
          <IconButton className="action-btn" onClick={handleMobileMenuToggle}>
            <DehazeIcon />
          </IconButton>

          <Link to="/checkout">
            <IconButton className="action-btn">
              <LocalMallIcon />
              <span className="count">{cartProducts.length}</span>
            </IconButton>
          </Link>

          {user ? (
            <div>
              <Tooltip title={user.user.email}>
                <IconButton onClick={handleClickOpen} className="action-btn">
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Link to="/login">
              <span>Sign In </span>
            </Link>
          )}
        </div>
        <nav
          className={`mobile-navigation-menu ${
            isMobileMenuOpen ? "active" : ""
          }`}
        >
          <div className="menu-top">
            <h2 className="menu-title">Menu</h2>
            <IconButton
              className="menu-close-btn"
              onClick={handleMobileMenuToggle}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="mobile-menu-category-list">
            <li className="menu-category">
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Link to="/">
                    <Typography>Home</Typography>
                  </Link>
                </AccordionSummary>
              </Accordion>
            </li>
            <li className="menu-category">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Link to="/">
                    <Typography>Men</Typography>
                  </Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="dropdown-list">
                    {[...menSubcategories].map((subcategory) => (
                      <li
                        onClick={() => {
                          handleSubcategorySelect("Men", subcategory);
                          handleMobileMenuToggle();
                        }}
                        className="dropdown-item"
                        key={subcategory}
                      >
                        <Link to="/">{subcategory}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>

            <li className="menu-category">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Link to="/">
                    <Typography>Women</Typography>
                  </Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="dropdown-list">
                    {[...womenSubcategories].map((subcategory) => (
                      <li
                        onClick={() => {
                          handleSubcategorySelect("Men", subcategory);
                          handleMobileMenuToggle();
                        }}
                        className="dropdown-item"
                        key={subcategory}
                      >
                        <Link to="/">{subcategory}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
            <li className="menu-category">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Link to="/">
                    <Typography>Fragrance</Typography>
                  </Link>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="dropdown-list">
                    {[...perfumeSubcategories].map((subcategory) => (
                      <li
                        onClick={() => {
                          handleSubcategorySelect("Men", subcategory);
                          handleMobileMenuToggle();
                        }}
                        className="dropdown-item"
                        key={subcategory}
                      >
                        <Link to="/">{subcategory}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
            <li className="menu-category">
              {user?.user?.email === "admin@gmail.com" ? (
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Link to="/dashboard">
                      <Typography>Dashboard</Typography>
                    </Link>
                  </AccordionSummary>
                </Accordion>
              ) : (
                ""
              )}
            </li>
          </ul>
          <div className="menu-bottom">
            <ul className="menu-social-container">
              <li>
                <Link to="/" className="social-link">
                  <FacebookOutlinedIcon />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <TwitterIcon />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <InstagramIcon />
                </Link>
              </li>
              <li>
                <Link to="/" className="social-link">
                  <WhatsAppIcon />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
