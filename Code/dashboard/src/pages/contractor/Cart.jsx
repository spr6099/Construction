import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCartAPI, updateCartAPI } from "../../services/ContractorService";
import { baseUrl } from "../../config";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Cart() {
  const params = useParams();
  const context = useContext(AuthContext);
  const userid = context?.user?._id;
  const workid = params.id;
  const [carts, setcarts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getcarts();
  }, []);

  const getcarts = async () => {
    try {
      const data = {
        clientWorkId: workid,
        contractorId: userid,
      };
      // console.log(data);
      if (!userid) {
        alert("Please login to view your cart.");
        return;
      }
      if (!workid) {
        alert("Please select a work to view the cart.");
        return;
      }

      const response = await getCartAPI(data);
      console.log(response?.data?.data);
      const cartData = response?.data?.data?.filter(
        (cart) => cart.paymentstatus === "pending"
      );
      setcarts(cartData);

      if (response?.data?.status) {
        // alert("get cart successfully!");
      } else {
        alert("Failed to get products cart.");
      }
    } catch (error) {
      console.error("Error get  cart:", error);
    }
  };

  const totalAmount = carts?.reduce((acc, cart) => {
    return (
      acc +
      cart.products.reduce((sum, item) => {
        return sum + (item.productId?.price || 0) * item.quantity;
      }, 0)
    );
  }, 0);

  // const totalAmount = carts?.reduce((acc, item) => {
  //   if (!item?.productId) return acc;
  //   return acc + item.productId.price * item.quantity;
  // }, 0);

  const HandleSubmit = async (billNo) => {
    try {
      const data = {
        cartId: carts[0]?._id,
        billNo: billNo,
        paymentstatus: "paid",
      };

      const response = await updateCartAPI(data);
      console.log(response?.data?.status);
      getcarts();
      // if (res.status === 200) {
      //   alert("Loan repayment recorded successfully!");
      //   window.location.reload();
      // }
    } catch (error) {
      console.error("Error updating loan amount:", error);
      alert("Failed to update loan amount. Please try again.");
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet.");
      return;
    }

    try {
      // const orderResponse = await fetch(
      //   "http://localhost:5000/api/payment/create-order",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ amount: totalAmount }),
      //   }
      // );

      // const data = await orderResponse.json();
      // const { order } = data;

      const options = {
        key: "rzp_test_4Ex6Tyjkp79GFy", // replace with real key
        amount: totalAmount * 100, // amount in paise
        currency: "INR", // INR
        name: "Your Company",
        description: "Cart Payment",
        // order_id: order.id,
        // handler: function (response) {
        //   alert("Payment Successful!");
        //   console.log("Payment details:", response);
        //   // Optionally, verify payment on backend here
        // },
        handler: function (response) {
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
          HandleSubmit(response.razorpay_payment_id);
        },
        prefill: {
          name: context?.user?.username || "User",
          email: context?.user?.email || "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong with payment.");
    }
  };

  return (
    <div className="main-panel">
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0 text-primary">
                  Your Shopping Cart
                </h3>
                <button
                  onClick={() => navigate("/contractor/products")}
                  className="btn btn-lg btn-outline-primary text-white px-4 py-2"
                >
                  Go to Products
                </button>
              </div>

              {carts[0]?.products?.map((item, index) => (
                <div className="card rounded-3 mb-4" key={index}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={`${baseUrl}/uploads/supplier/${item?.productId?.productimage}`}
                          className="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">
                          {item?.productId?.name}
                        </p>
                        <p>
                          <span className="text-muted">
                            price/{item?.productId?.unit}:{" "}
                          </span>
                          {item?.productId?.price}
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        {/* <button
                          onClick={() =>
                            handleQuantityChange(index, "dec", cartIndex)
                          }
                        >
                          <i className="fas fa-minus"></i>
                        </button> */}

                        <p className="form-control form-control-lg">
                          {item?.quantity}
                        </p>

                        <button
                          className="btn btn-link px-2"
                          onClick={(e) => handleQuantityChange(e, "inc")}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">
                          ₹{item?.productId?.price * item?.quantity}
                        </h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" className="text-danger">
                          <i className="fas fa-trash fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {carts.length > 0 ? (
                <div className="card shadow-lg rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0 text-muted">Total Amount</h5>
                      <h5 className="fw-bold mb-0 text-success">
                        ₹{carts[0]?.total}
                      </h5>
                    </div>

                    <button
                      type="button"
                      className="btn btn-lg btn-primary w-100 py-3"
                      onClick={handlePayment}
                      style={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        fontSize: "1.2rem",
                      }}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="alert alert-info text-center" role="alert">
                  Your cart is empty! Please add products to your cart.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
