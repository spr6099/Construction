import React, { useState } from "react";
import { baseUrl } from "../config";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function ProductCard({
  id,
  imageUrl,
  name,
  description,
  price,
  hasPendingCart,
  unit,
  onAddToCart,
}) {
  const [showModal, setshowModal] = useState(false);
  const [quantity, setquantity] = useState(1);

  const handleSubmit = () => {
    setshowModal(false);
    onAddToCart(id, quantity);
    setquantity(1); // Reset quantity after adding to cart
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

  return (
    <div
      className="card"
      style={{
        width: "250px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <img
        src={`${baseUrl}/uploads/supplier/${imageUrl}`}
        className="card-img-top"
        alt={name}
        style={{
          height: "150px",
          width: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <div className="card-body">
        <h5
          className="card-title"
          style={{ fontSize: "1.25rem", fontWeight: "bold" }}
        >
          {name}
        </h5>
        <p
          className="card-text"
          style={{
            fontSize: "0.875rem",
            color: "#555",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2, // Show only 2 lines
          }}
        >
          {description}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span
            className="text-primary"
            style={{ fontSize: "1.25rem", fontWeight: "600" }}
          >
            ₹{price}
          </span>
          <button
            className="btn btn-primary btn-sm"
            style={{ padding: "8px 16px", fontSize: "0.875rem" }}
            disabled={hasPendingCart}
            onClick={() => setshowModal(true)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setshowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group controlId="quantityInput">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setquantity(Number(e.target.value))}
                    placeholder="Enter quantity"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="unitInput">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type="text"
                    value={unit}
                    readOnly
                    plaintext
                    className="mt-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCard;
