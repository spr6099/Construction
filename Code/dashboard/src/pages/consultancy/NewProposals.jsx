import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import {
  getnewWorks,
  sendCounterOfferAPI,
  updateWorks,
} from "../../services/consultancyServices";

function NewProposals() {
  const context = useContext(AuthContext);
  const [clientWorks, setClientWorks] = useState([]);
  const [clientSendingwork, setclientSendingwork] = useState([]);
  // const [proposals, setProposals] = useState(dummyProposals);
  const [counterForm, setCounterForm] = useState({});

  const id = {
    id: context?.user?._id,
  };

  useEffect(() => {
    getnewClientWorks();
  }, []);

  const getnewClientWorks = async () => {
    try {
      const response = await getnewWorks(id);
      const data = response?.data?.data || [];
      console.log(data);

      const pendingWorks = data.filter((work) => work.status === "pending");
      const sendingWorks = data.filter((work) => work.status === "countered");

      setClientWorks(pendingWorks);
      setclientSendingwork(sendingWorks);

      // Initialize current image index for each work to 0
      // const initialIndexes = {};
      // data.forEach((_, idx) => {
      //   initialIndexes[idx] = 0;
      // });
      // setCurrentImageIndexes(initialIndexes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (workId) => {
    const data = {
      id: workId,
      status: "approved",
    };
    try {
      const response = await updateWorks(data);
      console.log(response);
      getnewClientWorks();
    } catch (error) {
      console.error("Error accepting work:", error);
    }
  };

  const handleCounterChange = (id, field, value) => {
    setCounterForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const sendCounterOffer = async (id) => {
    const offerData = {
      clientWorkId: id,
      counterAmount: counterForm[id]?.counterAmount,
      counterDeadline: counterForm[id]?.counterDeadline,
      counterReason: counterForm[id]?.counterReason,
    };

    try {
      const response = await sendCounterOfferAPI(offerData);
      console.log("Counter offer response:", response.data);
      alert("Counter offer successfully sent!");
      getnewClientWorks(); // refresh data if needed
    } catch (error) {
      console.error("Error sending counter offer:", error);
      alert("Failed to send counter offer.");
    }
  };

  console.log(clientSendingwork);

  if (clientWorks.length === 0 && clientSendingwork.length === 0) {
    return (
      <div>
        <h3 className="text-white mb-4">Client Proposals </h3>
        <div className="alert ">No new proposals available.</div>
      </div>
    );
  }
  return (
    <div className="main-panel">
      {/* <div className="content-wrapper"> */}
      <h4 className="text-white mb-4">Replay to Client Proposals </h4>

      {clientWorks.map((work, idx) => (
        <div key={idx} className="card bg-dark text-white mb-4 shadow">
          <div className="card-body">
            <h5 className="card-title text-capitalize">{work.workType} Work</h5>
            <p>
              <strong>Client:</strong> {work.clientId?.name}
            </p>
            <p>
              <strong>Total Sq Ft:</strong> {work.totalSqFt}
            </p>
            <p>
              <strong>Description:</strong> {work.description}
            </p>
            <p>
              <strong>Proposed Amount:</strong> ₹
              {work?.proposal[0]?.proposalAmount}
            </p>
            <p>
              <strong>Proposed Deadline:</strong>
              {new Date(work?.proposal[0]?.proposalDeadline).toDateString()}
            </p>
            <p>
              <strong>Status:</strong>
              <span className="badge bg-info">{work.status}</span>
            </p>

            <div className="mb-3 d-flex flex-wrap gap-2">
              {work.siteimages.map((img, i) => (
                <img
                  key={i}
                  src={`${baseUrl}/uploads/clients/${img}`}
                  alt="site"
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </div>

            {/* {work.status === "pending" && ( */}
            <div className="border-top pt-3">
              <h6>Send Counter Offer</h6>
              <div className="row g-2">
                <div className="col-12 mt-3">
                  <textarea
                    className="form-control"
                    placeholder="Reason for counter offer (optional but recommended)"
                    rows={3}
                    value={counterForm[work._id]?.counterReason || ""}
                    onChange={(e) =>
                      handleCounterChange(
                        work._id,
                        "counterReason",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    placeholder="Counter Amount"
                    className="form-control"
                    value={counterForm[work._id]?.counterAmount || ""}
                    onChange={(e) =>
                      handleCounterChange(
                        work._id,
                        "counterAmount",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    value={counterForm[work._id]?.counterDeadline || ""}
                    onChange={(e) =>
                      handleCounterChange(
                        work._id,
                        "counterDeadline",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => sendCounterOffer(work._id)}
                  >
                    Send Counter Offer
                  </button>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      ))}
      <div className="row">
        {clientSendingwork.map((work, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-white h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {work.workType} Work
                </h5>
                <p>
                  <strong>Client:</strong> {work.clientId?.name}
                </p>
                <p>
                  <strong>Total Sq Ft:</strong> {work.totalSqFt}
                </p>
                <p>
                  <strong>Description:</strong> {work.description}
                </p>
                <p>
                  <strong>Proposed Amount:</strong> ₹
                  {work?.proposal[0]?.proposalAmount}
                </p>
                <p>
                  <strong>Proposed Deadline:</strong>{" "}
                  {new Date(work?.proposal[0]?.proposalDeadline).toDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info">{work.status}</span>
                </p>

                {work.siteimages?.length > 0 && (
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    {work.siteimages.map((img, i) => (
                      <img
                        key={i}
                        src={`${baseUrl}/uploads/clients/${img}`}
                        alt="site"
                        style={{
                          width: "100px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ))}
                  </div>
                )}

                {work.counterProposal && (
                  <>
                    <h6 className="mt-2">Counter</h6>
                    <p>
                      <strong>Amount:</strong> {work.counterProposal.Amount}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(work.counterProposal.Deadline).toDateString()}
                    </p>
                    <p>
                      <strong>Reason:</strong> {work.counterProposal.Reason}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}

export default NewProposals;
