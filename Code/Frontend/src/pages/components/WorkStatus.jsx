import React, { useContext, useEffect, useState } from "react";
import { getworksStatus, handleAcceptAPI } from "../../services/ClientServices";
import { AuthContext } from "../../context/Authcontext";

const baseUrl = "http://localhost:5000"; // or your server's base URL

function WorkStatus({ refreshkey }) {
  const { user } = useContext(AuthContext);
  const [status, setstatus] = useState([]);
  const [openUpdateIndex, setOpenUpdateIndex] = useState(null); // Track which update is open

  const id = { id: user._id };

  useEffect(() => {
    getworks();
  }, [refreshkey]);

  const getworks = async () => {
    try {
      const response = await getworksStatus(id);
      setstatus(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (workId) => {
    try {
      await handleAcceptAPI({ clientWorkId: workId });
      alert("Deal confirmed!");
      getworks(); // refresh data
    } catch (error) {
      console.error("Accept failed:", error);
      alert("Could not confirm the deal.");
    }
  };

  const toggleUpdate = (index) => {
    // Toggle visibility of progress updates
    setOpenUpdateIndex(openUpdateIndex === index ? null : index);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Your Assigned Works</h3>
      <div className="row">
        {status.map((work, idx) => (
          <div className="col-lg-4 col-md-6 mb-4" key={idx}>
            <div className="card shadow-sm h-100" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold">{work.consultancyId.name}</h5>
                <p><strong>Type:</strong> {work.workType}</p>
                <p><strong>Total Sq Ft:</strong> {work.totalSqFt}</p>
                <p><strong>Proposed Amount:</strong> ₹{work?.proposal[0]?.proposalAmount}</p>
                <p><strong>Proposed Deadline:</strong> {work?.proposal[0]?.proposalDeadline?.slice(0, 10)}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      work.status === "pending"
                        ? "bg-warning text-dark"
                        : work.status === "accepted"
                        ? "bg-info"
                        : "bg-success"
                    }`}
                  >
                    {work.status}
                  </span>
                </p>

                {/* Progress Updates Section */}
                {work.progressUpdates && work.progressUpdates.length > 0 && (
                  <div className="mt-3">
                    <h6 className="text-primary" onClick={() => toggleUpdate(idx)} style={{ cursor: 'pointer' }}>
                      Progress Updates
                    </h6>
                    <div className={`collapse ${openUpdateIndex === idx ? "show" : ""}`}>
                      {work.progressUpdates.map((update, i) => (
                        <div key={i} className="mb-2 p-2 border rounded bg-light">
                          <p className="mb-1">{update.message}</p>
                          {update.image && (
                            <img
                              src={`${baseUrl}/uploads/contractor/${update.image}`}
                              alt={`progress-${i}`}
                              className="img-fluid rounded mb-2"
                              style={{
                                height: "100px",
                                width: "150px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <small className="text-muted">
                            {new Date(update.timestamp).toLocaleString()}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkStatus;
