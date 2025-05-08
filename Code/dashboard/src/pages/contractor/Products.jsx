import React, { use, useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/SupplierService";
import {
  getAllWorksAPI,
  getCartAPI,
  handleSubmitCartAPI,
} from "../../services/ContractorService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const context = useContext(AuthContext);
  const [products, setproducts] = useState([]);
  const [works, setworks] = useState([]);
  const [selectedWorkId, setselectedWorkId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [carts, setcarts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProductses();
    getnewWorks();
  }, []);

  const getProductses = async () => {
    try {
      const response = await getProducts();
      // console.log(response.data?.data);
      setproducts(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const id = {
    id: context?.user?._id,
  };

  const getnewWorks = async () => {
    try {
      const response = await getAllWorksAPI(id);
      const data = response?.data?.data || [];

      const filteredTenders = data.filter(
        (work) =>
          (work.contractorId?._id === id?.id ||
            work.contractorId?.toString() === id?.id) &&
          work?.status !== "completed"
      );

      setworks(filteredTenders);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const addToCart = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      // Update quantity if item already exists
      const updatedCart = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          productId,
          quantity,
          price: product.price,
        },
      ]);
    }
  };

  const handleCartSubmit = async () => {
    if (!selectedWorkId || !cartItems.length) {
      alert("Please select a work and add products.");
      return;
    }

    const data = {
      clientWorkId: selectedWorkId,
      contractorId: context?.user?._id,
      products: cartItems.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      total: getTotalAmount(),
      paymentstatus: "pending",
    };

    try {
      const response = await handleSubmitCartAPI(data);
      if (response?.data?.status) {
        alert("Cart submitted successfully!");
        setCartItems([]); // Clear cart
      } else {
        alert("Failed to submit cart.");
      }
    } catch (error) {
      console.error("Error submitting cart:", error);
    }
  };

  const getcarts = async (id) => {
    try {
      const userid = context?.user?._id;
      const workid = id;
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
  console.log(carts);

  return (
    <div className="main-panel">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h3 className="mb-0">Products</h3>

        <div>
          <label className="form-label mb-1">Select Client</label>
          <select
            className="form-select"
            aria-label="Select client"
            onChange={(e) => {
              const id = e.target.value;
              setselectedWorkId(e.target.value);
              if (id) getcarts(id);
            }}
          >
            <option value="">-- Choose a client --</option>
            {works.map((work) => (
              <option key={work._id} value={work._id}>
                {work.clientId.name}+{work.workType}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            className="btn btn-outline-success "
            onClick={() => navigate(`/contractor/cart/${selectedWorkId}`)}
            disabled={!selectedWorkId}
          >
            View Cart
          </button>
        </div>
      </div>

      {carts.length > 0 && (
        <div className="alert alert-warning">
          You have unpaid cart items for this work. Please{" "}
          <a href={`/contractor/cart/${selectedWorkId}`}>
            complete the payment
          </a>
          .
        </div>
      )}

      <div className="row">
        {products?.map((product) => (
          <div key={product._id} className="col-md-4 col-sm-6 col-12 mb-3">
            <ProductCard
              id={product._id}
              imageUrl={product.productimage}
              name={product?.name}
              description={product.description}
              price={product.price}
              unit={product.unit}
              hasPendingCart={carts.length > 0}
              onAddToCart={addToCart}
            />
          </div>
        ))}
        <div className="text-end mt-4">
          <button
            className="btn btn-success"
            onClick={handleCartSubmit}
            disabled={!cartItems.length || !selectedWorkId}
          >
            Submit Cart ({cartItems.length} items, ₹{getTotalAmount()})
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
