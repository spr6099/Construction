import React, { useContext, useEffect, useState } from "react";
import { getconsultancys, userRequire } from "../../services/ClientServices";
import { baseUrl } from "../../config";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/Authcontext";
import WorkStatus from "./WorkStatus";

function ConsultancyCards() {
  const context = useContext(AuthContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [datas, setdatas] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedConsultancy, setSelectedConsultancy] = useState(null);
  const [refreshkey, setrefreshkey] = useState(0);
  const [formData, setFormData] = useState({
    workType: "",
    totalSqFt: "",
    description: "",
    proposedAmount: "",
    proposedDeadline: "",
    images: [],
    clientid: context?.user?._id,
  });

  useEffect(() => {
    getallConsultancys();
  }, []);

  const getallConsultancys = async () => {
    try {
      const response = await getconsultancys();
      setdatas(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const openAssignModal = (consultancy) => {
    setSelectedConsultancy(consultancy);
    setShowAssignModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleAssignSubmit = async () => {
    if (
      !formData.workType ||
      !formData.totalSqFt ||
      !formData.description ||
      !formData.proposedAmount ||
      !formData.proposedDeadline ||
      formData.images.length === 0
    ) {
      alert("Please fill in all fields and select images.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("clientId", formData.clientid);
    formDataToSend.append("consultancyId", selectedConsultancy._id);
    formDataToSend.append("workType", formData.workType);
    formDataToSend.append("totalSqFt", formData.totalSqFt);
    formDataToSend.append("description", formData.description);

    formDataToSend.append(
      "proposal",
      JSON.stringify([
        {
          proposalAmount: formData.proposedAmount,
          proposalDeadline: formData.proposedDeadline,
        },
      ])
    ); // Store as an array with one object

    formDataToSend.append("counterAmount", "");
    formDataToSend.append("counterDeadline", "");
    formDataToSend.append("status", "pending");

    formData.images.forEach((file) => {
      formDataToSend.append("siteimages", file);
    });

    try {
      const response = await userRequire(formDataToSend);
      // console.log(response.data);
      setShowAssignModal(false);
      setFormData("")
      setrefreshkey((prev) => prev + 1);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert(error?.response?.data?.error);
    }
  };

  return (
    <div className="blog py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <p>Construction Services</p>
          <h2>Our Consultancies</h2>
        </div>
        <div className="row">
          {datas.map((item, idx) => (
            <div
              key={idx}
              className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
            >
              <div className="card shadow-lg w-100 border-0">
                <div className="card-img-top text-center p-3">
                  <img
                    src={`${baseUrl}/uploads/${item?.profileImg}`}
                    alt={item?.name}
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">{item?.name}</h5>
                  <p className="mb-1">
                    <strong>Email:</strong> {item?.email}
                  </p>
                  <p className="mb-1">
                    <strong>Contact:</strong> {item?.contact}
                  </p>
                  <p className="mb-3">
                    <strong>Rate/sq ft:</strong> ₹100
                  </p>

                  <div className="bio-container">
                    <p
                      className={`bio-text ${
                        expandedIndex === idx ? "expanded" : "collapsed"
                      }`}
                    >
                      {item.bio}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => toggleExpand(idx)}
                    >
                      {expandedIndex === idx ? "View Less" : "View More"}
                    </button>
                  </div>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                  <small className="text-muted">By Admin • Construction</small>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => openAssignModal(item)}
                  >
                    Assign Work
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Modal
            show={showAssignModal}
            onHide={() => setShowAssignModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Assign Work to {selectedConsultancy?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Work Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="interior">Interior</option>
                    <option value="renovation">Renovation</option>
                    <option value="construction">Construction</option>
                    <option value="painting">Painting</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Sq Ft</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalSqFt"
                    value={formData.totalSqFt}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Proposed Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="proposedAmount"
                    value={formData.proposedAmount}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Proposed Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="proposedDeadline"
                    value={formData.proposedDeadline}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Worksite Images</Form.Label>
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAssignSubmit}>
                Submit Work
              </Button>
            </Modal.Footer>
          </Modal>
          {/* --- Assigned Work Status Section --- */}
        </div>
        <WorkStatus refreshkey={refreshkey} />
      </div>

      <style>{`
        .bio-text.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bio-text.expanded {
          display: block;
        }
      `}</style>
    </div>
  );
}

export default ConsultancyCards;
