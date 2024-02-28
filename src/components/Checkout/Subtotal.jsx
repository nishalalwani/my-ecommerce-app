import React, { useContext } from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import myContext from "../../context/MyContext";
import { Link } from "react-router-dom";

const Subtotal = () => {
  const context = useContext(myContext);
  const { subtotal, mode } = context;
  const productCart = useSelector((state) => state.cart);

  return (
    <>
      <div className="subtotal">
        <p style={{ color: mode === "dark" ? "white" : "" }}>
          <strong> Subtotal (items):{productCart.length}</strong>
        </p>

        <CurrencyFormat
          style={{ height: "2rem", fontWeight: "500", fontSize: "20px" }}
          decimalScale={2}
          value={subtotal}
          displayType={true}
          thousandSeparator={true}
          prefix={"₹"}
        />
        <Link to="/ordernow">
          <button className="subtotal_btn">Proceed to Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default Subtotal;
