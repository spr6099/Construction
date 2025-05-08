import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addworks } from "../../services/consultancyServices";

function AddWorks() {
  const { user } = useContext(AuthContext);
  const [siteImage, setsiteImage] = useState([]);
  const [data, setdata] = useState(null);

  const fileinputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleInputSubmit = async () => {
    const formdata = new FormData();

    formdata.append("userid", user._id);
    formdata.append("description", data?.description);
    siteImage.forEach((file) => {
      formdata.append("siteimages", file);
    });
    try {
      const response = await addworks(formdata);
      setsiteImage([]);
      setdata({});
      if (fileinputRef.current) {
        fileinputRef.current.value = null;
      }
      alert("works added succesfully");
      console.log(response);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("failed to add datas");
    }
  };

  console.log(siteImage[1]);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          {/* Main Content */}
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="row g-0">
                  {/* Sidebar */}
                  <div className="col-lg-3 border-end">
                    <div className="p-4">
                      <div className="nav flex-column nav-pills">
                        <a className="nav-link active" href="#">
                          <i className="fas fa-user me-2"></i>Add Works
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}

                  <div className="col-lg-9">
                    <div className="p-4">
                      {/* Personal Information */}
                      <div className="mb-4">
                        <h5 className="mb-0">Add completed works</h5>

                        <div className="row g-3 prof ">
                          <div className="col-md-6 ">
                            <label className="form-label">site image </label>

                            <input
                              type="file"
                              name="exp-certificate"
                              className="form-control border border-light border-2px"
                              onChange={(e) =>
                                setsiteImage([...e.target.files])
                              }
                              ref={fileinputRef}
                              multiple
                              required
                            />
                          </div>

                          <div className="col-12 ">
                            <label className="form-label">
                              site description
                            </label>
                            <textarea
                              name="description"
                              className="form-control border border-light border-2px"
                              rows="4"
                              onChange={handleInputChange}
                              value={data?.description || ""}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <p></p>
                          <button
                            className="btn btn-primary"
                            onClick={handleInputSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End Content Area */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWorks;
