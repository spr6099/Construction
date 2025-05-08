import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import {
  getnewWorks,
  handleSubmitBidAPI,
} from "../../services/consultancyServices";

const BiddingProposals = () => {
  const [bids, setBids] = useState({});
  const [deadlines, setDeadlines] = useState({});
  const [clientWorks, setClientWorks] = useState([]);

  const context = useContext(AuthContext);

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
      const pendingWorks = data.filter((work) => work.status === "confirmed");

      setClientWorks(pendingWorks);

      const initialBids = {};
      const initialDeadlines = {};

      pendingWorks.forEach((work) => {
        if (work.bidProposal?.Amount) {
          initialBids[work._id] = work.bidProposal.Amount;
        }
        if (work.bidProposal?.Deadline) {
          initialDeadlines[work._id] = work.bidProposal.Deadline.split("T")[0]; // format YYYY-MM-DD
        }
      });

      setBids(initialBids);
      setDeadlines(initialDeadlines);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBidChange = (id, value) => {
    setBids({ ...bids, [id]: value });
  };

  const handleDeadlineChange = (id, value) => {
    setDeadlines({ ...deadlines, [id]: value });
  };

  // `Bid of ₹${bids[id]} with deadline ${deadlines[id]} submitted for proposal ${id}`

  const handleSubmitBid = async (id) => {
    const bidData = {
      clientWorkId: id,
      bidAmount: bids[id], // get the amount from bids state
      bidDeadline: deadlines[id], // get the deadline from deadlines state
    };

    try {
      const response = await handleSubmitBidAPI(bidData); // send to backend
      console.log("Bid submission response:", response.data);
      alert("Bid successfully submitted!");
      getnewClientWorks(); // refresh list
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid.");
    }
  };

  if (clientWorks.length === 0) {
    return (
      <div>
        <h4 className="text-white mb-4"> To Client Bidding </h4>
        <div className="alert">
          No client confirmed proposals available.
        </div>
      </div>
    );
  }

  return (
    <div className="main-panel">
            {/* <div className="content-wrapper"> */}

      <div className="container mt-4">
        <h3 className="mb-4">Confirmed Proposals (Contractor Bidding)</h3>
        <div className="row ">
          {clientWorks.map((proposal) => (
            <div key={proposal._id} className="col-md-6 mb-4">
              <div className="card shadow p-3 rounded-4">
                <h5 className="card-title mb-2 text-uppercase">
                  {proposal.workType}
                </h5>
                <p>
                  <strong>Sq. Ft:</strong> {proposal.totalSqFt}
                </p>
                <p>
                  <strong>Description:</strong> {proposal.description}
                </p>
                <p>
                  <strong>Counter Amount:</strong> ₹
                  {proposal.counterProposal.Amount.toLocaleString()}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(
                    proposal.counterProposal.Deadline
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Accepted At:</strong>{" "}
                  {new Date(proposal.acceptedAt).toLocaleString()}
                </p>

                <div className="d-flex overflow-auto gap-2 mb-3">
                  {proposal.siteimages.map((img, i) => (
                    <img
                      key={i}
                      src={`${baseUrl}/uploads/clients/${img}`}
                      alt="Site"
                      style={{ height: "100px", borderRadius: "8px" }}
                    />
                  ))}
                </div>

                {/* Bidding Inputs */}
                <div className="mb-2">
                  <h4>To Contractors </h4>
                  <label className="form-label">
                    <strong>Bid Amount (₹)</strong>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your bid"
                    value={bids[proposal._id] || ""}
                    onChange={(e) =>
                      handleBidChange(proposal._id, e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Propose New Deadline</strong>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={deadlines[proposal._id] || ""}
                    onChange={(e) =>
                      handleDeadlineChange(proposal._id, e.target.value)
                    }
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmitBid(proposal._id)}
                  disabled={!bids[proposal._id] || !deadlines[proposal._id]}
                >
                  {proposal.bidProposal?.Amount &&
                  proposal.bidProposal?.Deadline
                    ? "Update Bid"
                    : "Submit Bid"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BiddingProposals;
