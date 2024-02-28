import React, { useContext } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import myContext from "../../context/MyContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import logo from "../../images/ecom-icon.png";

const Dashboard = () => {
  const context = useContext(myContext);

  const { mode, product, edithandle, deletehandle, user, order } = context;

  return (
    <>
      <Header />

      <div
        style={{ backgroundColor: mode === "dark" ? "#262727" : "" }}
        className="main-content"
      >
        <h1 style={{ color: mode === "dark" ? "white" : "" }}>
          Welcome to Dashboard !
        </h1>
        <div className="row">
          <div className="col-3 col-md-6 col-sm-12">
            <div
              className="box box-hover"
              style={{
                backgroundColor: mode === "dark" ? "#ffffff00" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="counter">
                <div className="counter-title">total order</div>
                <div className="counter-info">
                  <div className="counter-count">{order.length}</div>
                  <ShoppingCartIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 col-md-6 col-sm-12">
            <div
              className="box box-hover"
              style={{
                backgroundColor: mode === "dark" ? "#ffffff00" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="counter">
                <div className="counter-title">Total Products</div>
                <div className="counter-info">
                  <div className="counter-count">{product.length}</div>
                  <ShoppingBasketIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 col-md-6 col-sm-12">
            <div
              className="box box-hover"
              style={{
                backgroundColor: mode === "dark" ? "#ffffff00" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="counter">
                <div className="counter-title">Total Users</div>
                <div className="counter-info">
                  <div className="counter-count">{user.length}</div>
                  <GroupAddIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs>
          <TabList>
            <div className="bttn_dashboard_users">
              <Tab>
                <button className="_dashboard_btn">Products</button>
              </Tab>
              <Tab>
                <button className="_dashboard_btn">Users</button>
              </Tab>
              <Tab>
                <button className="_dashboard_btn">Orders</button>
              </Tab>
            </div>
          </TabList>

          <TabPanel>
            <div className="row">
              <div className="col-12">
                <div
                  className="box"
                  style={{
                    backgroundColor: mode === "dark" ? "#ffffff00" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="dashboard_item">
                    <div className="box-header">Product Details</div>
                    <Link to="/addproduct">
                      <div className="dashboard_addproduct_btn">
                        <button>
                          {" "}
                          Add Product <ProductionQuantityLimitsIcon />
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="box-body overflow-scroll"
                    style={{
                      backgroundColor: mode === "dark" ? "#ffffff00" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>IMAGE</th>
                          <th>TITLE</th>
                          <th>CATEGORY</th>
                          <th>SUB-CATEGORY</th>
                          <th>PRICE</th>
                          <th style={{ padding: "12px" }}>DISCOUNTED</th>
                          <th style={{ padding: "12px" }}>RATING</th>
                          <th>DATE</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.map((item, index) => {
                          const {
                            title,
                            price,
                            discountedPrice,
                            imageUrl1,
                            category,
                            subcategory,
                            date,
                            rating,
                          } = item;
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td style={{ width: "25%" }}>
                                <div className="dashboard_addproduct_img">
                                  <img src={imageUrl1} alt="" />
                                </div>
                              </td>
                              <td>{title}</td>
                              <td>
                                <span className="order-status order-ready">
                                  {category}
                                </span>
                              </td>
                              <td>
                                <span className="order-status order-ready">
                                  {subcategory}
                                </span>
                              </td>
                              <td>
                                <div className="payment-status payment-pending">
                                  <span>{price}</span>
                                </div>
                              </td>
                              <td>
                                <div className="payment-status payment-pending">
                                  <span>{discountedPrice}</span>
                                </div>
                              </td>
                              <td>{rating}</td>
                              <td>{date}</td>

                              <td>
                                <div className="dashboard_product_icons">
                                  <Link to="/updateproduct">
                                    <div onClick={() => edithandle(item)}>
                                      <ModeEditIcon />
                                    </div>
                                  </Link>

                                  <div onClick={() => deletehandle(item)}>
                                    <DeleteIcon />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="col-12">
              <div
                class="box"
                style={{
                  backgroundColor: mode === "dark" ? "#ffffff00" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div class="box-header">User Details</div>
                <div class="box-body overflow-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>UID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((ele, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div class="order-owner">
                                <span>{ele.name}</span>
                              </div>
                            </td>
                            <td>{ele.email}</td>
                            <td>
                              <span class="order-status order-ready">
                                {ele.uid}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="col-12">
              <div
                class="box"
                style={{
                  backgroundColor: mode === "dark" ? "#ffffff00" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div class="box-header">Order Details</div>
                <div class="box-body overflow-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>PAYMENT ID</th>
                        <th>USER NAME</th>
                        <th>ADDRESS</th>
                        <th>PINCODE</th>
                        <th>PHONE NUMBER</th>
                        <th>EMAIL</th>
                        <th>PRODUCT TITLE</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((ele, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{ele.paymentId}</td>
                            <td>{ele.addressInfo.name}</td>
                            <td>{ele.addressInfo.address}</td>
                            <td>{ele.addressInfo.pincode}</td>
                            <td>{ele.addressInfo.phoneNumber}</td>
                            <td>{ele.email}</td>
                            <td>
                              {ele.cartItems.map((data) => {
                                return (
                                  <tr>
                                    <td>{data.title}</td>
                                  </tr>
                                );
                              })}
                            </td>

                            <td>
                              {ele.cartItems.map((data) => {
                                return (
                                  <tr>
                                    <td>{data.price}</td>
                                  </tr>
                                );
                              })}
                            </td>
                            <td>
                              {ele.cartItems.map((data) => {
                                return (
                                  <tr>
                                    <td>{data.category}</td>
                                  </tr>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      {/* footer */}
      <div className="foot_pannel2">
        <Link to="/">
          <img className="footer_logo" src={logo} alt="" />
        </Link>
      </div>

      <div className="foot_pannel3">
        <p>
          Conditions of Use Privacy Notice Your Ads Privacy Choices © 1996-2023,
          Shopie.com, Inc. or its affiliates
        </p>
      </div>
    </>
  );
};

export default Dashboard;
