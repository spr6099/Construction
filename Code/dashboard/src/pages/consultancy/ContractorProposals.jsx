import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getBidAmountsAPI,
  getnewWorks,
  updateWorks,
} from "../../services/consultancyServices";

const ContractorProposals = () => {
  //   const [works, setWorks] = useState(consultancyWorks);
  const [clientWorks, setClientWorks] = useState([]);
  const [bidProposal, setBidProposal] = useState([]);

  const [visibleProposals, setVisibleProposals] = useState({});

  const context = useContext(AuthContext);

  const id = {
    id: context?.user?._id,
  };

  useEffect(() => {
    getnewClientWorks();
    getBidAmounts();
  }, []);

  const toggleVisibility = (workId) => {
    setVisibleProposals((prev) => ({
      ...prev,
      [workId]: !prev[workId],
    }));
  };

  // Function to handle the approval of a contractor
  const handleApprove = (workId, contractor, amount, deadline) => {
    try {
      const data = {
        id: workId,
        status: "contractor-assigned",
        contractorId: contractor._id,
        contractor: { Amount: amount, Deadline: deadline },
      };
      const response = updateWorks(data);
      console.log(response);
      getBidAmounts();
    } catch (error) {
      console.error(error);
    }
    // console.log(workId);
    // console.log(contractor._id);
  };

  const getnewClientWorks = async () => {
    try {
      const response = await getnewWorks(id);
      const data = response?.data?.data || [];
      // console.log(data);

      const pendingWorks = data.filter((work) => work.status === "confirmed");

      setClientWorks(pendingWorks);
    } catch (error) {
      console.error(error);
    }
  };

  const getBidAmounts = async () => {
    try {
      const response = await getBidAmountsAPI(id);
      // console.log(response);
      setBidProposal(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (clientWorks.length === 0) {
    return (
      <div>
        <h4 className="text-white mb-4">Contractor Proposals </h4>
        {/* <div className="alert alert-info">No new bidding available</div> */}
        <div className="alert ">No new bidding available</div>
      </div>
    );
  }

  return (
    <div className="main-panel">
      <div className="container my-4">
        <h2>Contractor Proposals</h2>
        {clientWorks.map((work) => (
          <div key={work._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{work.workType}</h5>
              <p className="card-text">{work.description}</p>
              <p className="card-text">
                <strong>Total SqFt:</strong> {work.totalSqFt}
              </p>

              <div className="mt-4">
                <h6
                  role="button"
                  className="text-primary"
                  onClick={() => toggleVisibility(work._id)}
                >
                  Contractor Proposals {visibleProposals[work._id] ? "▲" : "▼"}
                </h6>

                {visibleProposals[work._id] &&
                  bidProposal
                    .filter((bid) => bid.clientWorkId === work._id)
                    .map((bid) => (
                      <div
                        key={bid.contractorId}
                        className="card mb-3 border-secondary"
                      >
                        <div className="card-body">
                          <p className="mb-1">
                            <strong>Contractor:</strong> {bid.contractorId.name}
                          </p>
                          <p className="mb-1">
                            <strong>Amount:</strong> ₹{bid.bidProposal.Amount}
                          </p>
                          <p className="mb-1">
                            <strong>Deadline:</strong>{" "}
                            {bid.bidProposal.Deadline}
                          </p>
                          <p className="mb-1">
                            <strong>Message:</strong> {bid.bidProposal.Reason}
                          </p>

                          {work.approvedContractorId === bid.contractorId ? (
                            <span className="badge bg-success mt-2">
                              Approved
                            </span>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm mt-2"
                              onClick={() =>
                                handleApprove(
                                  work._id,
                                  bid.contractorId,
                                  bid.bidProposal.Amount,
                                  bid.bidProposal.Deadline
                                )
                              }
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractorProposals;
