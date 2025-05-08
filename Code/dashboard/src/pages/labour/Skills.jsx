import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getlabourSkills,
  labourSkills,
  updatelabourSkills,
} from "../../services/LabourServices";
import { baseUrl } from "../../config";

function Skills() {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false); // State to control modal visibility

  const [inputValue, setInputValue] = useState("");
  const [expCertificate, setexpCertificate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [empdata, setempdata] = useState(null);
  const [availableSkills] = useState([
    // Predefined skill options
    "Plumber",
    "Carpenter",
    "Electrician",
    "Mason",
    "Painter",
    "Welder",
    "Architect",
    "Project Manager",
    "Civil Engineer",
    "Laborer",
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]); // State to store selected skills in modal

  const [data, setdata] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    bio: "",
    status: "",
  });

  const id = {
    id: user._id,
  };

  useEffect(() => {
    getSkills();
  }, []);

  // Handle adding skills to the list
  const handleAddSkills = () => {
    setSkills([...skills, ...selectedSkills]);
    setIsSkillModalOpen(false); // Close modal after adding skills
    setSelectedSkills([]); // Reset selected skills in modal
  };

  // Handle skill selection in modal
  const handleSelectSkill = (skill) => {
    setSelectedSkills((prevSelected) => {
      if (prevSelected.includes(skill)) {
        return prevSelected.filter((s) => s !== skill); // Remove skill if already selected
      } else {
        return [...prevSelected, skill]; // Add skill to selected skills
      }
    });
  };

  // Handle skill removal
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills); // Remove selected skill from main skills list
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleInputSubmit = async () => {
    const formdata = new FormData();

    formdata.append("labourId", user?._id);
    formdata.append("height", data?.height || empdata.height);
    formdata.append("weight", data?.weight || empdata.weight);
    formdata.append("gender", data?.gender || empdata.gender);
    formdata.append("exp_salary", data?.expSalary || empdata.expSalary);
    formdata.append("age", data?.age || empdata.age);
    formdata.append("status", data?.status || empdata.status);
    if (expCertificate) {
      formdata.append("exp_certificate", expCertificate);
    }
    skills.forEach((skill, index) => {
      formdata.append(`skills[${index}]`, skill);
    });

    try {
      const response = await labourSkills(formdata);
      alert("Skills saved successfully!");
      getSkills();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("failed to save skills");
    }
  };

  const getSkills = async () => {
    try {
      const res = await getlabourSkills(id);

      const fetched = res?.data?.data;
      console.log(fetched);

      if (fetched) {
        setSkills(fetched.skills || []);
        setSelectedSkills(fetched.skills || []);
        setempdata({
          weight: fetched.weight || "",
          height: fetched.height || "",
          salary: fetched.exp_salary || "",
          gender: fetched.gender || "",
          age: fetched.age || "",
          exp_certificate: fetched.exp_certificate || "",
          status: fetched.status || "",
        });
        setdata({
          skillId: fetched._id,
          weight: fetched.weight || "",
          height: fetched.height || "",
          age: fetched.age || "",
          gender: fetched.gender || "",
          expSalary: fetched.exp_salary || "",
          exp_certificate: fetched.exp_certificate || "",
          status: fetched.status || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditMode = async () => {
    if (editMode) {
      // Save data when exiting edit mode
      await handleUpdateSubmit();
    }
    setEditMode((prevMode) => !prevMode);
  };

  const handleUpdateSubmit = async () => {
    const formdata = new FormData();

    formdata.append("skillid", data.skillId);
    formdata.append("userid", user._id);
    formdata.append("height", data?.height);
    formdata.append("weight", data?.weight);
    formdata.append("exp_certificate", expCertificate); // only append if newly uploaded
    formdata.append("gender", data?.gender);
    formdata.append("exp_salary", data?.expSalary);
    formdata.append("age", data?.age);
    formdata.append("status", data?.status);

    skills.forEach((skill, index) => {
      formdata.append(`skills[${index}]`, skill);
    });

    try {
      const response = await updatelabourSkills(formdata);
      alert("Profile updated successfully!");
      getSkills(); // reload data
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  console.log(data);
  console.log(empdata);

  return (
    <div>
      {/* Content Area */}

      {empdata === null && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Personal Information</h5>

            <button className="btn btn-primary" onClick={handleInputSubmit}>
              Save
            </button>
          </div>
          <div className="row g-3 prof ">
            <div className="col-md-6  ">
              {/* <label className="form-label">Height</label> */}
              <label className="form-label">Height (in cm)</label>

              <input
                type="text"
                name="height"
                className="form-control border border-light border-2px "
                // style={{ backgroundColor: "#2A3038" }}

                // value={data.height}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 ">
              <label className="form-label">Weight (in kg)</label>
              <input
                type="text"
                name="weight"
                className="form-control border border-light border-2px"
                // value={data?.weight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6 ">
              <label className="form-label">Experience certificate</label>

              <input
                type="file"
                name="exp-certificate"
                className="form-control border border-light border-2px"
                onChange={(e) => setexpCertificate(e.target.files[0])}
                required
              />
            </div>

            <div className=" col-md-6 ">
              <label className="form-label">Skills</label>
              {/* <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "6px",
                  minHeight: "50px",
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "#d0ebff",
                      // color: "#003366",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      margin: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {skill}

                    <span
                      onClick={() => handleRemoveSkill(index)}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    minWidth: "120px",
                  }}
                  required
                />
              </div> */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "6px",
                  minHeight: "50px",
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      margin: "4px",
                      fontSize: "14px",
                      backgroundColor: "#d0ebff",
                      color: "#003366",
                    }}
                  >
                    {skill}
                    <span
                      onClick={() => handleRemoveSkill(index)}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(true)} // Open modal when clicked
                  style={{
                    padding: "6px 12px",
                    borderRadius: "5px",
                    // backgroundColor: "#007bff",
                    // color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Select Skills
                </button>
              </div>
            </div>

            <div className=" col-md-6 ">
              <label className="form-label">Gender</label>
              <select
                required
                defaultValue=""
                className="form-control border border-light border-2px"
                name="gender"
                onChange={handleInputChange}
                // disabled={!editMode}
              >
                <option disabled value="">
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>

            <div className="col-md-6  ">
              <label className="form-label">Expected Salary/day</label>
              <input
                className="form-control border border-light border-2px"
                type="text"
                placeholder="Expected salary/day"
                name="expSalary"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6  ">
              <label className="form-label">Age</label>
              <input
                className="form-control border border-light border-2px"
                type="text"
                placeholder="Enter your age"
                name="age"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className=" col-md-6 ">
              <label className="form-label">Status</label>
              <select
                required
                defaultValue=""
                className="form-control border border-light border-2px"
                name="status"
                onChange={handleInputChange}
              >
                <option disabled value="">
                  Select status
                </option>
                <option>available</option>
                <option>busy</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {empdata && (
        <div className="col-lg-9">
          <div className="p-4">
            {/* Personal Information */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Personal Information</h5>
                <button className="btn btn-primary" onClick={toggleEditMode}>
                  {editMode ? "Save" : "Edit"}
                </button>
              </div>
              <div className="row g-3 prof ">
                <div className="col-md-6  ">
                  {/* <label className="form-label">Height</label> */}
                  <label className="form-label">Height (in cm)</label>

                  <input
                    type="text"
                    name="height"
                    className="form-control "
                    // style={{ backgroundColor: "#2A3038" }}

                    value={data?.height}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    required
                  />
                </div>
                <div className="col-md-6 ">
                  <label className="form-label">Weight (in kg)</label>
                  <input
                    type="text"
                    name="weight"
                    className="form-control"
                    value={data?.weight}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    required
                  />
                </div>

                <div className="col-md-6 ">
                  <label className="form-label">Experience certificate</label>
                  {data?.exp_certificate ? (
                    <div className="mb-2">
                      <img
                        src={`${baseUrl}/uploads/labour/${data?.exp_certificate}`}
                        alt="Experience Certificate"
                        style={{
                          height: "50px",
                          width: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <p>No experience certificate</p>
                    </div>
                  )}
                  {editMode && (
                    <input
                      type="file"
                      name="exp-certificate"
                      className="form-control"
                      onChange={(e) => setexpCertificate(e.target.files[0])}
                      required={!data?.exp_certificate} // only required if not already uploaded
                    />
                  )}
                </div>

                <div className=" col-md-6 ">
                  <label className="form-label">Skills</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      border: editMode ? "1px solid #ccc" : "none",
                      padding: "10px",
                      borderRadius: "6px",
                      minHeight: "50px",
                    }}
                  >
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // backgroundColor: "#d0ebff",
                          // color: "#003366",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          margin: "4px",
                          fontSize: "14px",
                        }}
                      >
                        {skill}

                        {editMode && (
                          <span
                            onClick={() => handleRemoveSkill(index)}
                            style={{
                              marginLeft: "8px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            &times;
                          </span>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          // border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "6px",
                          minHeight: "50px",
                        }}
                      >
                        {/* {skills.map((skill, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              margin: "4px",
                              fontSize: "14px",
                              backgroundColor: "#d0ebff",
                              color: "#003366",
                            }}
                          >
                            {skill}
                            <span
                              onClick={() => handleRemoveSkill(index)}
                              style={{
                                marginLeft: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              &times;
                            </span>
                          </div>
                        ))} */}
                        <button
                          type="button"
                          onClick={() => setIsSkillModalOpen(true)} // Open modal when clicked
                          style={{
                            padding: "6px 12px",
                            borderRadius: "5px",
                            // backgroundColor: "#007bff",
                            // color: "#fff",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Select Skills
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-md-6 ">
                  <label className="form-label">Gender</label>
                  <p>{data?.gender}</p>
                  {editMode && (
                    <select
                      required
                      Value={data?.gender}
                      className="form-control"
                      name="gender"
                      onChange={handleInputChange}
                      // disabled={!editMode}
                    >
                      <option disabled value="">
                        Select gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </select>
                  )}
                </div>

                <div className="col-md-6  ">
                  <label className="form-label">Expected Salary/day</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter expected salary per day"
                    name="expSalary"
                    onChange={handleInputChange}
                    value={data.expSalary}
                    required
                    disabled={!editMode}
                  />
                </div>

                <div className="col-md-6  ">
                  <label className="form-label">Age</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your age"
                    name="age"
                    value={data.age}
                    onChange={handleInputChange}
                    required
                    disabled={!editMode}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={data?.status}
                    onChange={handleInputChange}
                    required
                    disabled={!editMode}
                  >
                    <option value="">Select status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSkillModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#191c24",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Select Skills</h3>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {availableSkills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSelectSkill(skill)}
                    style={{ marginRight: "10px" }}
                  />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                type="button"
                onClick={handleAddSkills}
                style={{
                  padding: "6px 12px",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  // color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add Selected Skills
              </button>
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)} // Close modal without saving
                style={{
                  padding: "6px 12px",
                  marginLeft: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#ccc",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End Content Area */}
    </div>
  );
}

export default Skills;

// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { labourSkills } from "../../services/LabourServices";

// function Skills() {
//   const { user } = useContext(AuthContext);
//   const [skills, setSkills] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [data, setdata] = useState([]);
//   const [expCertificate, setexpCertificate] = useState(null);

//   const handleKeyDown = (e) => {
//     if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
//       e.preventDefault();
//       const newSkill = inputValue.trim();
//       if (!skills.includes(newSkill)) {
//         setSkills([...skills, newSkill]);
//       }
//       setInputValue("");
//     }
//   };

//   const handleRemoveSkill = (indexToRemove) => {
//     setSkills(skills.filter((_, index) => index !== indexToRemove));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setdata({ ...data, [name]: value });
//   };

//   const handleInputSubmit = async(e) => {
//     e.preventDefault();
//     const response = labourSkills(formdata)

//   };
//   console.log(data);
//   console.log(expCertificate);
//   console.log(skills);

//   return (
//     <div className="main-panel">
//       <div className="content-wrapper">
//         <div className="row">
//           {/* Main Content */}
//           <div className="col-12">
//             <div className="card border-0 shadow-sm">
//               <div className="card-body p-0">
//                 <div className="row g-0">
//                   {/* Sidebar */}
//                   <div className="col-lg-3 border-end">
//                     <div className="p-4">
//                       <div className="nav flex-column nav-pills">
//                         <a className="nav-link active" href="#">
//                           <i className="fas fa-user me-2"></i>Skills
//                         </a>
//                         {/* <a className="nav-link" href="#">
//                           <i className="fas fa-lock me-2"></i>Security
//                         </a> */}
//                         {/* <a className="nav-link" href="#">
//                           <i className="fas fa-bell me-2"></i>Notifications
//                         </a>
//                         <a className="nav-link" href="#">
//                           <i className="fas fa-credit-card me-2"></i>Billing
//                         </a>
//                         <a className="nav-link" href="#">
//                           <i className="fas fa-chart-line me-2"></i>Activity
//                         </a> */}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Area */}
//                   <div className="col-lg-9">
//                     <div className="p-4">
//                       {/* Personal Information */}
//                       <div className="mb-4">
//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                           <h5 className="mb-0">Personal Information</h5>
//                           <button
//                             className="btn btn-primary"
//                             // onClick=toggleEditMode
//                           >
//                             Edit
//                           </button>
//                         </div>
//                         <div className="row g-3 prof ">
//                           <div className="col-md-6  ">
//                             {/* <label className="form-label">Height</label> */}
//                             <label className="form-label">Height (in cm)</label>

//                             <input
//                               type="text"
//                               name="height"
//                               className="form-control "
//                               // style={{ backgroundColor: "#2A3038" }}

//                               //   value={formData.name}
//                               onChange={handleInputChange}
//                               //   disabled={!editMode}
//                             />
//                           </div>
//                           <div className="col-md-6 ">
//                             <label className="form-label">Weight (in kg)</label>
//                             <input
//                               type="text"
//                               name="weight"
//                               className="form-control"
//                               //   value={formData.address}
//                               onChange={handleInputChange}
//                               //   disabled={!editMode}
//                             />
//                           </div>

//                           <div className="col-md-6 ">
//                             <label className="form-label">
//                               Experience certificate
//                             </label>
//                             <input
//                               type="file"
//                               name="exp-certificate"
//                               className="form-control"
//                               //   value={user?.email}
//                               onChange={(e) =>
//                                 setexpCertificate(e.target.files[0])
//                               }
//                               //   disabled
//                             />
//                           </div>

//                           <div className=" col-md-6 ">
//                             <label className="form-label">Skills</label>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 flexWrap: "wrap",
//                                 border: "1px solid #ccc",
//                                 padding: "10px",
//                                 borderRadius: "6px",
//                                 minHeight: "50px",
//                               }}
//                             >
//                               {skills.map((skill, index) => (
//                                 <div
//                                   key={index}
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     backgroundColor: "#d0ebff",
//                                     color: "#003366",
//                                     padding: "4px 10px",
//                                     borderRadius: "20px",
//                                     margin: "4px",
//                                     fontSize: "14px",
//                                   }}
//                                 >
//                                   {skill}
//                                   <span
//                                     onClick={() => handleRemoveSkill(index)}
//                                     style={{
//                                       marginLeft: "8px",
//                                       cursor: "pointer",
//                                       fontWeight: "bold",
//                                     }}
//                                   >
//                                     &times;
//                                   </span>
//                                 </div>
//                               ))}
//                               <input
//                                 type="text"
//                                 placeholder="Type a skill and press Enter"
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                                 style={{
//                                   flex: 1,
//                                   border: "none",
//                                   outline: "none",
//                                   fontSize: "14px",
//                                   minWidth: "120px",
//                                 }}
//                                 required
//                               />
//                             </div>
//                           </div>

//                           <div className=" col-md-6 ">
//                             <label className="form-label">Gender</label>
//                             <select
//                               required
//                               defaultValue=""
//                               className="form-control"
//                               name="gender"
//                               onChange={handleInputChange}
//                             >
//                               <option disabled value="">
//                                 Select gender
//                               </option>
//                               <option>Male</option>
//                               <option>Female</option>
//                               <option>Others</option>
//                             </select>
//                           </div>

//                           <div className="col-md-6  ">
//                             <label className="form-label">
//                               Expected Salary
//                             </label>
//                             <input
//                               className="form-control"
//                               type="text"
//                               placeholder="Enter expected salary"
//                               name="exp-salary"
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>

//                           <div className="col-md-6  ">
//                             <label className="form-label">Age</label>
//                             <input
//                               className="form-control"
//                               type="text"
//                               placeholder="Enter your age"
//                               name="age"
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>

//                           <div className="col-12 ">
//                             <label className="form-label">Bio</label>
//                             <textarea
//                               name="bio"
//                               className="form-control"
//                               rows="4"
//                               //   value={formData.bio}
//                               onChange={handleInputChange}
//                               //   disabled={!editMode}
//                             ></textarea>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* End Content Area */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Skills;
