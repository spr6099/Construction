import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  addProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/SupplierService";
import { baseUrl } from "../../config";

function SupplierProductPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    unit: "",
    price: "",
    description: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getproducts();
  }, []);

  const handleEditProduct = (prod) => {
    if (!prod) return; // safeguard

    setProduct({
      ...prod,
      image: prod?.productimage || null,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const getproducts = async () => {
    try {
      const response = await getProducts();
      const filterdatas = response?.data?.data.filter(
        (item, index) => item?.supplierId === user?._id
      );
      setProducts(filterdatas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("supplierId", user?._id);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("unit", product.unit); // if you're including unit
    formData.append("description", product.description);
    if (product.image && typeof product.image !== "string") {
      formData.append("productimage", product.image);
    }

    try {
      let response;

      if (isEditing) {
        // ✅ Update product
        formData.append("editId", product._id);

        response = await updateProduct(formData);
        console.log("Updated:", response);
        console.log(product.image);

        // Update local state
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? response.data.data : p))
        );
        getproducts();
        setProduct("");
      } else {
        response = await addProducts(formData);
        console.log("Added:", response);

        if (!response.status === 201)
          throw new Error("Failed to submit product");

        getproducts();
      }

      // Reset state after submit
      setProduct({
        name: "",
        category: "",
        quantity: "",
        price: "",
        unit: "",
        description: "",
        image: null,
      });
      setIsEditing(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await deleteProduct(productId);
      //   setProducts((prev) => prev.filter((p) => p._id !== productId));
      getproducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="main-panel">
      <div className="main-panel p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>My Products</h3>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Product
          </button>
        </div>

        {/* Product Cards */}
        <div className="row">
          {products.map((prod, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 position-relative">
                {prod?.productimage && (
                  <img
                    src={`${baseUrl}/uploads/supplier/${prod?.productimage}`}
                    className="card-img-top"
                    alt={prod.name}
                    style={{ height: 200, width: 300, objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{prod?.name}</h5>
                  <p className="card-text">{prod?.description}</p>
                  <p className="mb-1">
                    <strong>Category:</strong> {prod?.category}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{prod?.price}/{prod?.unit}
                  </p>

                  {/* Edit Button */}
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary w-100 me-2"
                      onClick={() => handleEditProduct(prod)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger w-100"
                      onClick={() => handleDeleteProduct({ id: prod._id })}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
            <div
              className="modal-dialog modal-dialog-scrollable modal-lg"
              role="document"
            >
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isEditing ? "Edit Product" : "Add New Product"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Cement">Cement</option>
                        <option value="Pipes">Pipes</option>
                        <option value="Tiles">Tiles</option>
                        <option value="Bricks">Bricks</option>
                        <option value="Paint">Paint</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Unit</label>
                          <select
                            name="unit"
                            className="form-control"
                            style={{ height: "38px", marginTop: "0px" }}
                            value={product.unit}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Unit</option>
                            <option value="per bag">Per Bag</option>
                            <option value="per tile">Per Tile</option>
                            <option value="per length">Per Length</option>
                            <option value="per sq ft">Per Sq Ft</option>
                            <option value="per piece">Per Piece</option>
                            <option value="per kg">Per Kg</option>
                            <option value="per liter">Per Liter</option>
                            {/* Add more as needed */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Brief description about the product"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Upload Product Image</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        key={isEditing ? "edit-file" : "add-file"} // forces re-render to clear file input
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button className="btn btn-success" type="submit">
                      {isEditing ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierProductPage;
