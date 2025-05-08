import React, { useContext, useRef, useState } from "react";
import {
  getWorkAPI,
  progressUpdatesAPI,
} from "../../services/ContractorService";
import { baseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";

function WorkUpdates({ id, onRefresh, work }) {
  const { user } = useContext(AuthContext);
  const [workUpdates, setWorkUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [images, setImages] = useState("");
  const fileInputRef = useRef(null);
  const handleUpdateChange = (e) => setNewUpdate(e.target.value);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImages([e.target.files[0]]);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("message", newUpdate);
    formData.append("image", images[0]);

    try {
      const response = await progressUpdatesAPI(formData);
      if (response?.status === 200) {
        setNewUpdate("");
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // reset input
        }
        onRefresh();
      }
    } catch (error) {
      console.error("Error submitting update:", error);
    }
  };
  //   console.log(work.progressUpdates);

  return (
    <div>
      <div className="mb-4">
        {user?.role !== "admin" && (
          <div>
            <h5 className="text-primary">Work Updates</h5>
            <form onSubmit={handleUpdateSubmit}>
              <div className="row mb-4">
                <div className="col-md-9">
                  <textarea
                    className="form-control"
                    rows="4"
                    value={newUpdate}
                    onChange={handleUpdateChange}
                    placeholder="Enter work update..."
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="imageUpload" className="form-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="form-control"
                    required
                  />

                  {/* Preview Image */}
                  {images.length > 0 && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(images[0])}
                        alt="Preview"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "150px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4 py-2">
                  Submit Update
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="mt-4">
          <h6 className="text-info">Existing Updates</h6>
          {work?.progressUpdates && work?.progressUpdates?.length > 0 ? (
            work?.progressUpdates.map((update, index) => (
              <div key={index} className=" row mb-3 p-3 bg-dark border rounded">
                <div className="col-md-6">
                  <p>{update.message}</p>
                  <small className=" text-muted">
                    {new Date(update.timestamp).toLocaleString()}
                  </small>
                </div>
                {update.image && (
                  <div className=" col-md-6 my-2">
                    <img
                      src={`${baseUrl}/uploads/contractor/${update?.image}`} // Adjust path if needed
                      alt={`progress-${index}`}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "100px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No updates available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkUpdates;
