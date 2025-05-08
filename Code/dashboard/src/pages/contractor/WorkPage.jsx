import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOneWorksAPI,
  getProductsAPI,
  // addWorkUpdateAPI,  // API call for adding updates
} from "../../services/ContractorService";
import { baseUrl } from "../../config";
import { getWorkersAPI } from "../../services/LabourServices";
import { updateWorks } from "../../services/consultancyServices";
import WorkUpdates from "./WorkUpdates";

function WorkPage() {
  const { id } = useParams();
  const [works, setWorks] = useState(null);
  const [labours, setLabours] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getWork();
    // getWorkUpdates(); // Fetch existing work updates
  }, []);

  const getWork = async () => {
    const response = await getOneWorksAPI({ id });
    const response2 = await getWorkersAPI();
    const response3 = await getProductsAPI();
    setWorks(response?.data?.data);
    setLabours(
      response2?.data?.data?.filter(
        (item) => item.clientWorkId === id && item.status === "accepted"
      )
    );
    setProducts(
      response3?.data?.data?.filter((item) => item.clientWorkId === id)
    );
  };

  // const getWorkUpdates = async () => {
  //   const response = await getWorkUpdatesAPI(id); // Fetch updates for the current work
  //   setWorkUpdates(response?.data?.data || []);
  // };
  // console.log("works", works);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Work Details</h2>

      <WorkUpdates id={id} onRefresh={getWork} work={works} />

      {/* Work Info */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">Proposed Amount</h5>
              <p className="card-text">₹{works?.contractor?.Amount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">Deadline</h5>
              <p className="card-text">{works?.contractor?.Deadline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h5 className="text-primary">Description</h5>
        <p>{works?.description}</p>
      </div>

      {/* Consultancy and Client Info */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-success">Consultancy Info</h5>
              <p>
                <strong>Name:</strong> {works?.consultancyId.name}
              </p>
              <p>
                <strong>Email:</strong> {works?.consultancyId.email}
              </p>
              <p>
                <strong>Contact:</strong> {works?.consultancyId.contact}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-success">Client Info</h5>
              <p>
                <strong>Name:</strong> {works?.clientId.name}
              </p>
              <p>
                <strong>Email:</strong> {works?.clientId.email}
              </p>
              <p>
                <strong>Contact:</strong> {works?.clientId.contact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Labours */}
      <div className="mt-5">
        <h2 className="mb-4 text-primary">Labours</h2>
        <div className="row">
          {labours?.map((emp) => (
            <div key={emp._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={`${baseUrl}/uploads/${emp?.labourId?.profileImg}`}
                      alt={`${emp?.labourId?.name}'s profile`}
                      className="rounded-circle me-3"
                      style={{
                        height: "80px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h5 className="mb-0">{emp?.labourId?.name}</h5>
                      <small className="text-muted">{emp.role}</small>
                    </div>
                  </div>
                  <p className="card-text">
                    <strong>Experience:</strong> 3 years <br />
                    <strong>Contact:</strong> {emp?.labourId?.contact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="mb-4 text-primary">Products by Bill</h2>
        {products.map((bill, billIndex) => (
          <div key={bill._id || billIndex} className="mb-5">
            <h5 className="mb-3 text-info">Bill No: {bill.billNo}</h5>
            <div className="row">
              {bill.products.map((item, index) => (
                <div key={item._id || index} className="col-md-4 mb-4">
                  <div className="card shadow-sm h-100">
                    <img
                      src={`${baseUrl}/uploads/supplier/${item.productId.productimage}`}
                      className="card-img-top"
                      alt={item.productId.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.productId.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {item.productId.category}
                      </h6>
                      <p className="card-text">
                        <strong>Unit:</strong> {item.productId.unit} <br />
                        <strong>Price:</strong> ₹{item.productId.price} <br />
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
              <div
                className="p-3 rounded shadow-sm"
                style={{
                  backgroundColor: "#e8f4f8",
                  border: "2px solid #007bff",
                }}
              >
                <h5 className="text-primary">Total</h5>
                <h4 className="text-success">₹{bill.total}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkPage;
