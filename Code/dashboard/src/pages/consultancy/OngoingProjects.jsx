import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getnewWorks } from "../../services/consultancyServices";
import { baseUrl } from "../../config";

// const dummyWork = [
//   {
//     workType: "interior",
//     totalSqFt: 7676,
//     description: "Full interior renovation for 3BHK apartment.",
//     status: "contractor-assigned",
//     siteimages: [
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//     ],
//     proposal: [
//       {
//         proposalAmount: 7678,
//         proposalDeadline: "6666-06-07T00:00:00.000Z",
//       },
//     ],
//     counterProposal: {
//       Amount: 5000,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       Reason: "Budget adjustments due to client constraints.",
//       counteredAt: "2025-04-24T06:08:33.618Z",
//     },
//     bidProposal: {
//       Amount: 3999,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       counteredAt: "2025-04-24T08:08:16.726Z",
//     },
//     acceptedAt: "2025-04-24T06:11:40.722Z",
//     clientDetails: {
//       name: "Rajiv Mehta",
//       phone: "+91 9876543210",
//       email: "rajiv@example.com",
//     },
//     contractorDetails: {
//       name: "Ajay Constructions",
//       phone: "+91 9123456789",
//       email: "ajay@constructions.com",
//     },
//   },
//   {
//     workType: "interior",
//     totalSqFt: 7676,
//     description: "Full interior renovation for 3BHK apartment.",
//     status: "contractor-assigned",
//     siteimages: [
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//     ],
//     proposal: [
//       {
//         proposalAmount: 7678,
//         proposalDeadline: "6666-06-07T00:00:00.000Z",
//       },
//     ],
//     counterProposal: {
//       Amount: 5000,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       Reason: "Budget adjustments due to client constraints.",
//       counteredAt: "2025-04-24T06:08:33.618Z",
//     },
//     bidProposal: {
//       Amount: 3999,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       counteredAt: "2025-04-24T08:08:16.726Z",
//     },
//     acceptedAt: "2025-04-24T06:11:40.722Z",
//     clientDetails: {
//       name: "Rajiv Mehta",
//       phone: "+91 9876543210",
//       email: "rajiv@example.com",
//     },
//     contractorDetails: {
//       name: "Ajay Constructions",
//       phone: "+91 9123456789",
//       email: "ajay@constructions.com",
//     },
//   },
//   {
//     workType: "interior",
//     totalSqFt: 7676,
//     description: "Full interior renovation for 3BHK apartment.",
//     status: "contractor-assigned",
//     siteimages: [
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//     ],
//     proposal: [
//       {
//         proposalAmount: 7678,
//         proposalDeadline: "6666-06-07T00:00:00.000Z",
//       },
//     ],
//     counterProposal: {
//       Amount: 5000,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       Reason: "Budget adjustments due to client constraints.",
//       counteredAt: "2025-04-24T06:08:33.618Z",
//     },
//     bidProposal: {
//       Amount: 3999,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       counteredAt: "2025-04-24T08:08:16.726Z",
//     },
//     acceptedAt: "2025-04-24T06:11:40.722Z",
//     clientDetails: {
//       name: "Rajiv Mehta",
//       phone: "+91 9876543210",
//       email: "rajiv@example.com",
//     },
//     contractorDetails: {
//       name: "Ajay Constructions",
//       phone: "+91 9123456789",
//       email: "ajay@constructions.com",
//     },
//   },
//   {
//     workType: "interior",
//     totalSqFt: 7676,
//     description: "Full interior renovation for 3BHK apartment.",
//     status: "contractor-assigned",
//     siteimages: [
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//       "1745403806540-boy2.jpg",
//       "1745403806598-men1.jpg",
//       "1745403806641-men2.jpg",
//     ],
//     proposal: [
//       {
//         proposalAmount: 7678,
//         proposalDeadline: "6666-06-07T00:00:00.000Z",
//       },
//     ],
//     counterProposal: {
//       Amount: 5000,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       Reason: "Budget adjustments due to client constraints.",
//       counteredAt: "2025-04-24T06:08:33.618Z",
//     },
//     bidProposal: {
//       Amount: 3999,
//       Deadline: "2025-04-30T00:00:00.000Z",
//       counteredAt: "2025-04-24T08:08:16.726Z",
//     },
//     acceptedAt: "2025-04-24T06:11:40.722Z",
//     clientDetails: {
//       name: "Rajiv Mehta",
//       phone: "+91 9876543210",
//       email: "rajiv@example.com",
//     },
//     contractorDetails: {
//       name: "Ajay Constructions",
//       phone: "+91 9123456789",
//       email: "ajay@constructions.com",
//     },
//   },
// ];

function OngoingProjects() {
  const context = useContext(AuthContext);
  const [clientWorks, setclientWorks] = useState([]);
  const id = {
    id: context?.user?._id,
  };

  useEffect(() => {
    getClientWorks();
  }, []);

  const getClientWorks = async () => {
    try {
      const response = await getnewWorks();
      const data = response?.data?.data || [];
      console.log(data);

      const pendingWorks = data.filter(
        (work) =>
          work?.status === "contractor-assigned" &&
          work?.consultancyId?._id === id?.id
      );
      setclientWorks(pendingWorks);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // console.log(clientWorks);

  return (
    <div className="main-panel">
      <div className="container py-4">
        <h3 className="mb-4 fw-bold">Ongoing Works</h3>
        <div className="row gy-4">
          {clientWorks.map((work, index) => (
            <div key={index} className="col-md-6">
              <div
                className="p-4 rounded-4 shadow-sm"
                style={{
                  // background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <h5 className="fw-bold text-capitalize mb-3">
                  Work: {work?.workType}
                </h5>

                <div className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info text-dark">
                    {work?.status}
                  </span>
                </div>

                <div className="mb-2">
                  <strong>Total SqFt:</strong> {work?.totalSqFt}
                </div>

                <div className="mb-2">
                  <strong>Description:</strong> {work?.description}
                </div>

                {/* Client Details */}
                <div className="mb-2">
                  <strong>Client:</strong>
                  <div className="ps-2 small text-muted">
                    <p className="mb-0">Name: {work?.clientId?.name}</p>
                    <p className="mb-0">Phone: {work?.clientId?.contact}</p>
                    <p>Email: {work?.clientId?.email}</p>
                  </div>
                </div>

                {/* Site Images */}
                <div className="mb-2">
                  <strong>Site Images:</strong>
                  <div className="d-flex gap-2 flex-wrap mt-2">
                    {work?.siteimages?.map((img, i) => (
                      <img
                        key={i}
                        src={`${baseUrl}/uploads/clients/${img}`}
                        alt={`Site ${i}`}
                        style={{
                          width: "100px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Original Proposal */}
                <div className="mb-2">
                  <strong>Proposal:</strong>
                  <div className="ps-2 small text-muted">
                    <p className="mb-0">₹{work?.proposal[0].proposalAmount}</p>
                    <p>{formatDate(work?.proposal[0].proposalDeadline)}</p>
                  </div>
                </div>

                {/* Counter Proposal */}
                {work.counterProposal && (
                  <div className="mb-2">
                    <strong>Counter Proposal:</strong>
                    <div className="ps-2 small text-muted">
                      <p className="mb-0">₹{work.counterProposal.Amount}</p>
                      <p className="mb-0">
                        Deadline: {formatDate(work.counterProposal.Deadline)}
                      </p>
                      <p className="mb-0">
                        Reason: {work.counterProposal.Reason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Final Bid */}
                {work.bidProposal && (
                  <div className="mb-2">
                    <strong>Final Bid:</strong>
                    <div className="ps-2 small text-muted">
                      <p className="mb-0">₹{work?.bidProposal?.Amount}</p>
                      <p className="mb-0">
                        Deadline: {formatDate(work?.bidProposal?.Deadline)}
                      </p>
                      <p>Accepted: {formatDate(work?.acceptedAt)}</p>
                    </div>
                  </div>
                )}

                {/* Contractor */}
                <div className="mt-2">
                  <strong>Contractor:</strong>
                  <div className="ps-2 small text-muted">
                    <p className="mb-0">Name: {work?.contractorId?.name}</p>
                    <p className="mb-0">Phone: {work?.contractorId?.contact}</p>
                    <p>Email: {work?.contractorId?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OngoingProjects;
