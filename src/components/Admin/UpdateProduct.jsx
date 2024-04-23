import React, { useContext } from "react";
import "./AddProduct.css";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import Loader from "../../loader/Loader";
import logo from "../../images/ecom-icon.png";

const UpdateProduct = () => {
  const context = useContext(myContext);
  const navigate = useNavigate();
  const { loading, products, setProducts, updateProducthandle } = context;
  return (
    <>
      <div className="addproductLogin">
        <Link to="/">
          <img className="login_logo" src={logo} />
        </Link>

        <div className="addproduct_container">
          <h1>UPDATE PRODUCT</h1>

          <form>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <Loader />
              </div>
            )}
            <h5>Product Title</h5>
            <input
              type="text"
              value={products.title}
              onChange={(e) =>
                setProducts({ ...products, title: e.target.value })
              }
            />

            <h5>Product Category</h5>
            <input
              type="text"
              value={products.category}
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
            />

            <h5>Product Sub-Category</h5>
            <input
              type="text"
              value={products.subcategory}
              onChange={(e) =>
                setProducts({ ...products, subcategory: e.target.value })
              }
            />

            <h5>Product Price</h5>
            <input
              type="number"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
            />

            <h5>Discounted Price</h5>
            <input
              type="number"
              value={products.discountedPrice}
              onChange={(e) =>
                setProducts({ ...products, discountedPrice: e.target.value })
              }
            />

            <h5>Product Rating</h5>
            <input
              type="number"
              value={products.rating}
              onChange={(e) =>
                setProducts({ ...products, rating: e.target.value })
              }
            />

            <h5>Product ImageUrl 1</h5>
            <input
              type="url"
              onChange={(e) =>
                setProducts({ ...products, imageUrl1: e.target.value })
              }
              value={products.imageUrl1}
            />

            <h5>Product ImageUrl 2</h5>
            <input
              type="url"
              onChange={(e) =>
                setProducts({ ...products, imageUrl2: e.target.value })
              }
              value={products.imageUrl2}
            />

            <h5>Product Description</h5>
            <input
              type="text"
              value={products.description}
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
            />

            <button
              className="login_addproductButton"
              onClick={updateProducthandle}
            >
              UPDATE PRODUCT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
