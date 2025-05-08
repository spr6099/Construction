import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getBidAmountsAPI,
  handleSubmitBidAPI,
  newTendorsAPI,
} from "../../services/ContractorService";
import { baseUrl } from "../../config";

const NewTender = () => {
  const [openBidModal, setOpenBidModal] = useState(null);
  const context = useContext(AuthContext);
  const [tenders, setTenders] = useState([]);
  const [bidAmounts, setBidAmounts] = useState([]);
  const [bidForm, setBidForm] = useState({
    amount: "",
    deadline: "",
    description: "",
  });

  const id = {
    id: context?.user?._id,
  };

  useEffect(() => {
    getnewTendors();
    getBidAmounts();
  }, []);

  const getnewTendors = async () => {
    try {
      const response = await newTendorsAPI(id);
      const data = response?.data?.data || [];
      // console.log(data);

      setTenders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setBidForm({ ...bidForm, [e.target.name]: e.target.value });
  };

  const sendCounterOffer = async (workid, consultancy) => {
    const offerData = {
      clientWorkId: workid,
      consultancyId: consultancy._id,
      contractorId: context?.user?._id,
      counterAmount: bidForm?.amount,
      counterDeadline: bidForm?.deadline,
      counterReason: bidForm?.description,
    };

    try {
      // console.log("Sending counter offer:", offerData);

      const response = await handleSubmitBidAPI(offerData);
      // console.log("Counter offer response:", response?.data);
      getBidAmounts(); // refresh data if needed
      setOpenBidModal(null); // Close the modal after submission
      alert("Counter offer successfully sent!");
    } catch (error) {
      console.error("Error sending counter offer:", error);
      alert("Failed to send counter offer.");
    }
  };

  const getBidAmounts = async () => {
    try {
      const response = await getBidAmountsAPI(id);
      console.log(response?.data?.data);
      setBidAmounts(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getExistingBid = (projectId) => {
    return bidAmounts.find((bid) => bid.clientWorkId === projectId);
  };

  return (
    <div className="main-panel">
      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-center">
          Available Projects for Bidding{" "}
        </h2>

        <div className="row g-4">
          {tenders?.map((project) => (
            <div key={project._id} className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body">
                  <h5 className="card-title text-capitalize fw-semibold text-primary">
                    {project.workType} Project
                  </h5>
                  <p className="card-title text-capitalize fw-semibold text-primary">
                    {project?.consultancyId.name} Project
                  </p>
                  <p className="card-text mb-1">
                    <strong>Total SqFt:</strong> {project.totalSqFt}
                  </p>
                  <p className="text-muted small">{project.description}</p>

                  <div className="d-flex gap-2 overflow-auto py-2">
                    {project.siteimages.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${baseUrl}/uploads/clients/${img}`}
                        alt={`Site ${idx + 1}`}
                        className="rounded border"
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-2 mb-0">
                    <strong>Proposal Amount:</strong> ₹
                    {project.bidProposal.Amount}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(
                      project.bidProposal.Deadline
                    ).toLocaleDateString()}
                  </p>

                  {getExistingBid(project._id) ? (
                    <>
                      <span className="badge bg-success mb-2">
                        Your bid already submitted
                      </span>
                      <div className=" p-3 rounded mb-2">
                        <p className="mb-1">
                          <strong>Your Bid Amount:</strong> ₹
                          {getExistingBid(project._id)?.bidProposal.Amount}
                        </p>
                        <p className="mb-1">
                          <strong>Your Deadline:</strong>{" "}
                          {new Date(
                            getExistingBid(project._id)?.bidProposal.Deadline
                          ).toLocaleDateString()}
                        </p>
                        <p className="mb-0">
                          <strong>Your Reason:</strong>{" "}
                          {getExistingBid(project._id)?.bidProposal?.Reason}
                        </p>
                      </div>
                      {/* <button
                        className="btn btn-outline-warning rounded-pill"
                        onClick={() => {
                          const existingBid = getExistingBid(project._id);
                          setBidForm({
                            amount: existingBid?.counterAmount || "",
                            deadline:
                              existingBid?.counterDeadline?.slice(0, 10) || "",
                            description: existingBid?.counterReason || "",
                          });
                          setOpenBidModal(project._id);
                        }}
                      >
                        Update Bid
                      </button> */}
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-primary rounded-pill mt-3"
                      onClick={() => {
                        setBidForm({
                          amount: "",
                          deadline: "",
                          description: "",
                        });
                        setOpenBidModal(project._id);
                      }}
                    >
                      Submit Bid
                    </button>
                  )}
                </div>
              </div>

              {/* Modal */}
              {openBidModal === project._id && (
                <div className="  start-0 w-100  bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
                  <div
                    className="rounded-4 p-4 text-dark shadow-lg"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      maxHeight: "90vh",
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(12px)",
                      overflowY: "auto",
                    }}
                  >
                    <h5 className="fw-bold mb-3 text-center">
                      Submit Your Bid
                    </h5>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Bid Amount (₹)"
                      value={bidForm.amount}
                      onChange={handleInputChange}
                      className="form-control mb-2"
                    />
                    <input
                      type="date"
                      name="deadline"
                      value={bidForm.deadline}
                      onChange={handleInputChange}
                      className="form-control mb-2"
                    />
                    <textarea
                      name="description"
                      placeholder="Bid Description"
                      value={bidForm.description}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      rows="3"
                    />
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => setOpenBidModal(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          sendCounterOffer(
                            openBidModal,
                            tenders.find((t) => t._id === openBidModal)
                              ?.consultancyId
                          )
                        }
                      >
                        {getExistingBid(openBidModal)
                          ? "Update Bid"
                          : "Submit Bid"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewTender;
