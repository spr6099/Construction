import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

const WorkTable = ({ data }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (item) => {
    setSelectedData(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="p-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Work Type</th>
            <th>Total Sq Ft</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.workType}</td>
              <td>{item.totalSqFt}</td>
              <td>{item.status}</td>
              <td>{new Date(item.createdAt.$date).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShow(item)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="md"  centered>
        <Modal.Header closeButton>
          <Modal.Title>Work Details</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedData && (
            <div>
              <h5>Work Type: {selectedData.workType}</h5>
              <p>
                <strong>Description:</strong> {selectedData.description}
              </p>
              <p>
                <strong>Total SqFt:</strong> {selectedData.totalSqFt}
              </p>
              <p>
                <strong>Status:</strong> {selectedData.status}
              </p>

              {/* Proposal */}
              {selectedData.proposal?.length > 0 && (
                <>
                  <h6>Proposal</h6>
                  <p>
                    <strong>Amount:</strong>{" "}
                    {selectedData.proposal[0].proposalAmount}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(
                      selectedData.proposal[0].proposalDeadline.$date
                    ).toLocaleDateString()}
                  </p>
                </>
              )}

              {/* Counter Proposal */}
              {selectedData.counterProposal && (
                <>
                  <h6>Counter Proposal</h6>
                  <p>
                    <strong>Amount:</strong>{" "}
                    {selectedData.counterProposal.Amount}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(
                      selectedData.counterProposal.Deadline.$date
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Reason:</strong>{" "}
                    {selectedData.counterProposal.Reason}
                  </p>
                </>
              )}

              {/* Site Images */}
              {selectedData.siteimages?.length > 0 && (
                <>
                  <h6>Site Images</h6>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {selectedData.siteimages.map((img, index) => (
                      <img
                        key={index}
                        src={`your-image-base-url/${img}`}
                        alt="Site"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkTable;
