import React, { useContext } from "react";
import myContext from "../../context/MyContext";
import Layout from "../Layout/Layout";
import Loader from "../../loader/Loader";
import "./Order.css";

const Order = () => {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;

  const context = useContext(myContext);
  const { mode, order, loading } = context;
  return (
    <Layout>
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
      {order.length > 0 ? (
        <>
          <div
            style={{
              backgroundColor: mode === "dark" ? "black" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <h2
              className="checkout_title"
              style={{ margin: "2rem 1rem 4rem 3rem" }}
            >
              Your Ordered items list
            </h2>
            {order
              .filter((obj) => obj.userid == userid)
              .map((order) => {
                return (
                  <>
                    {order.cartItems.map((item) => {
                      return (
                        <div className="orderProduct">
                          <img src={item.imageUrl1} alt="" />
                          <div className="orderProduct_info">
                            <h4
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {item.title}
                            </h4>
                            <p className="order_des">{item.description}</p>
                            <p className="product_price">
                              <small>₹ </small>
                              <strong>{item.discountedPrice}</strong>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })}
          </div>
        </>
      ) : (
        <h2
          className=" text-center tex-2xl text-white"
          style={{ textAlign: "center", margin: "10rem" }}
        >
          No Orders yet !
        </h2>
      )}
    </Layout>
  );
};

export default Order;
