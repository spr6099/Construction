import React, { useContext, useEffect, useState } from "react";
import {
  getOfferLettersAPI,
  updateOfferLetterAPI,
} from "../../services/LabourServices";
import { AuthContext } from "../../context/AuthContext";

function OfferLetters() {
  const [offers, setOffers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getOfferLetters();
  }, []);

  const getOfferLetters = async () => {
    try {
      const response = await getOfferLettersAPI({ id: user?._id });
      const data = response?.data?.data || [];
      setOffers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (offerId, status) => {
    try {
      const data = {
        offerId,
        status,
      };
      const response = await updateOfferLetterAPI(data);
      console.log(response?.data?.data);
      getOfferLetters();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-panel">
      <div className="container mt-4">
        <h3 className="mb-4">Offer Letters</h3>
        <div className="row">
          {offers.map((offer) => (
            <div className="" key={offer._id}>
              <div className="card h-100 border border-3">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{offer.workType}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {offer.contractorId?.name} | {offer.location}
                    </h6>
                    <p className="card-text">
                      <strong>Days:</strong> {offer.workDays} <br />
                      <strong>Salary/day:</strong> ₹{offer.salary} <br />
                      <strong>Description:</strong> {offer.description}
                    </p>
                  </div>
                  <div className="mt-3">
                    {offer.status === "pending" ? (
                      <>
                        <button
                          className="btn btn-success mr-2"
                          onClick={() => handleSubmit(offer._id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleSubmit(offer._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`badge px-3 py-2 ${
                          offer.status === "accepted"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {offer.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {offers.length === 0 && (
            <div className="col-12 text-center text-muted">
              No offer letters available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfferLetters;
