import React, { useContext, useState, useEffect } from "react";
import "../Admin/AddProduct.css";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/firebase";
import { useSelector } from "react-redux/es/hooks/useSelector";
import logo from "../../images/ecom-icon.png";

const Ordernow = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading } = context;
  const buyNow = async (e) => {
    e.preventDefault();
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_jXzymDFQvd158T",
      key_secret: "YUoLVCzQGbYXt6MqujtdaPke",
      // as amt should be parsed in integer paise
      amount: parseInt(totalAmount * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: async function (response) {
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          const result = await addDoc(collection(fireDB, "orders"), orderInfo);
          // console.log("result", result);
          toast.success("Order placed successfully");
          navigate("/");
        } catch (error) {
          // console.log("errroorr", error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <>
      <div className="login">
        <Link to="/">
          <img className="login_logo" src={logo} alt="" />
        </Link>

        <div className="addproduct_container">
          <h1>ADD DETAILS</h1>

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
            <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <h5>Address</h5>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h5>Pincode</h5>
            <input
              type="number"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <h5>Phone Number</h5>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button className="login_addproductButton" onClick={buyNow}>
              PROCEED FOR PAYMENT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ordernow;
