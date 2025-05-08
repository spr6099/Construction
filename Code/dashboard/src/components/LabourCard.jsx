import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { baseUrl } from "../config";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is loaded

function LabourCard({
  id,
  labourId,
  name,
  email,
  contact,
  address,
  profileImg,
  bio,
  onOfferLetter,
  works,
}) {
  const [showModal, setShowModal] = useState(false);
  const [offerDetails, setOfferDetails] = useState({
    workDays: "",
    salary: "",
    location: "",
    description: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails({ ...offerDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOfferLetter(labourId, offerDetails); // Send the details to parent component
    handleClose();
  };

  return (
    <div>
      <Card className="shadow-sm border-1 border-light rounded-3">
        <Card.Img
          variant="top"
          src={`${baseUrl}/uploads/${profileImg}`}
          alt={name}
          className="img-fluid rounded-circle mx-auto mt-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold">{name}</Card.Title>
          <Card.Text
            className="text-muted"
            style={{
              maxHeight: "80px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {bio}
          </Card.Text>
          <div className="d-flex flex-column align-items-center">
            <p className="mb-1">
              <strong>Email:</strong> {email}
            </p>
            <p className="mb-1">
              <strong>Contact:</strong> {contact}
            </p>
            <p className="mb-1">
              <strong>Address:</strong> {address}
            </p>
          </div>

          {/* Button to open the modal */}
          <Button variant="primary" onClick={handleShow} className="mt-3">
            Give Offer Letter
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for Offer Letter Template */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Offer Letter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Client</Form.Label>
              <Form.Select
                aria-label="Select client"
                // onChange={(e) => {
                //   const id = e.target.value;
                //   setselectedWorkId(id);

                // }}
                type="text"
                name="workId"
                onChange={handleInputChange}
                required
              >
                <option value="">-- Choose a client --</option>
                {works.map((work) => (
                  <option key={work._id} value={work._id}>
                    {work.clientId?.name} + {work.workType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWorkDays">
              <Form.Label>Number of Work Days</Form.Label>
              <Form.Control
                type="number"
                name="workDays"
                value={offerDetails.workDays}
                onChange={handleInputChange}
                placeholder="Enter number of days"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={offerDetails.salary}
                onChange={handleInputChange}
                placeholder="Enter salary/day"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Work Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={offerDetails.location}
                onChange={handleInputChange}
                placeholder="Enter work location"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Work Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={offerDetails.description}
                onChange={handleInputChange}
                placeholder="Enter work description"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Offer Letter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LabourCard;
