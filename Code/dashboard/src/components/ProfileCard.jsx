import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/Profile.css";
import { getProfile, updateProfile } from "../services/AuthServices";
import { baseUrl } from "../config";
import { IoCamera } from "react-icons/io5";
import Skills from "../pages/labour/Skills";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProfileCard({ userid }) {
  const [currentTable, setcurrentTable] = useState("personalInfo");
  const [user, setUser] = useState(useContext(AuthContext));
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    contact: "",
    address: "",
    bio: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch user profile when component mounts
  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserProfile = async () => {
    try {
      const res = await getProfile({ id: userid });
      const userData = res.data.user;
      setUser(userData);
      // Initialize formData with fetched user values
      setFormData({
        name: userData.name || "",
        licenseNo: userData.licenseNo || "",
        contact: userData.contact || "",
        address: userData.address || "",
        bio: userData.bio || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update profile on the backend
  const updateProfileData = async (data) => {
    try {
      const res = await updateProfile({ id: userid, ...data });
      // Optionally, update local state with response data
      setUser(res.data.user);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Toggle edit mode and, if saving, send data to backend
  const toggleEditMode = async () => {
    if (editMode) {
      // Save data when exiting edit mode
      await updateProfileData(formData);
    }
    setEditMode((prevMode) => !prevMode);
  };

  const fileInputRef = useRef(null);

  // Trigger the file input click when button is clicked
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Call the provided function to update the image (e.g., upload to server)
      await handleImageUpdate(file);
    }
  };

  
  return (
    <div className="row">
      {/* Profile Header */}
      <div className="col-12 mb-4">
        <div className="profile-header position-relative mb-4">
          <div className="position-absolute top-0 end-0 p-3">
            <button className="btn btn-light">
              <i className="fas fa-edit me-2"></i>Edit Cover
            </button>
          </div>
        </div>
        <div className="text-center">
          <div className="position-relative d-inline-block">
            <img
              src={`${baseUrl}/uploads/${user?.profileImg}`}
              className="rounded-circle profiles-pic"
              alt="Profile"
            />
            <button
              className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle"
              onClick={handleButtonClick}
            >
              <IoCamera />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
          <h3 className="mt-3 mb-1">{user?.name}</h3>
          <p className="text-muted mb-3">Senior Product Designer</p>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-outline-primary">
              <i className="fas fa-envelope me-2"></i>Message
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-user-plus me-2"></i>Connect
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="row g-0">
              {/* Sidebar */}
              <div className="col-lg-3 border-end">
                <div className="p-4">
                  <div className="nav flex-column nav-pills">
                    <Link
                      className="nav-link active"
                      onClick={() => setcurrentTable("personalInfo")}
                    >
                      <i className="fas fa-user me-2"></i>Personal Info
                    </Link>
                    {user?.role === "labour" && (
                      <Link
                        className="nav-link"
                        onClick={() => setcurrentTable("skills")}
                      >
                        <i className="fas fa-lock me-2"></i>Skills
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="col-lg-9">
                <div className="p-4">
                  {/* Personal Information */}
                  {currentTable === "personalInfo" && (
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Personal Information</h5>
                        <button
                          className="btn btn-primary"
                          onClick={toggleEditMode}
                        >
                          {editMode ? "Save" : "Edit"}
                        </button>
                      </div>
                      <div className="row g-3 prof ">
                        <div className="col-md-6 ">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control "
                            // style={{ backgroundColor: "#2A3038" }}

                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            defaultValue={user?.email}
                            // onChange={handleInputChange}
                            disabled
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            name="contact"
                            className="form-control"
                            value={formData.contact}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Bio</label>
                          <textarea
                            name="bio"
                            className="form-control "
                            rows="4"
                            value={formData.bio}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentTable === "skills" && <Skills />}

                  {/* Settings Cards */}
                  {/* <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <div className="settings-card card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">
                                Two-Factor Authentication
                              </h6>
                              <p className="text-muted mb-0 small">
                                Add an extra layer of security
                              </p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="settings-card card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">Email Notifications</h6>
                              <p className="text-muted mb-0 small">
                                Receive activity updates
                              </p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* Recent Activity */}
                  {/* <div>
                    <h5 className="mb-4">Recent Activity</h5>
                    <div className="activity-item mb-3">
                      <h6 className="mb-1">Updated profile picture</h6>
                      <p className="text-muted small mb-0">2 hours ago</p>
                    </div>
                    <div className="activity-item mb-3">
                      <h6 className="mb-1">Changed password</h6>
                      <p className="text-muted small mb-0">Yesterday</p>
                    </div>
                    <div className="activity-item">
                      <h6 className="mb-1">Updated billing information</h6>
                      <p className="text-muted small mb-0">3 days ago</p>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* End Content Area */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
