import React, { useState, useRef } from "react";
import { registerUser } from "../services/AuthServices";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

const Register = () => {
  const firstFormRef = useRef(null);
  const [user, setuser] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [form, setform] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user role is selected
    if (!user) {
      alert("Please select a role");
      return;
    }

    // Validate form data fields
    if (!form?.name || form?.name.trim() === "") {
      alert("Please provide a name");
      return;
    }

    if (
      !form?.email ||
      form?.email.trim() === "" ||
      !/\S+@\S+\.\S+/.test(form?.email)
    ) {
      alert("Please provide a valid email");
      return;
    }

    if (
      !form?.contact ||
      form?.contact.trim() === "" ||
      !/^[\+]?[0-9]{1,4}[-\s]?[0-9]{1,4}[-\s]?[0-9]{6,15}$/.test(form?.contact)
    ) {
      alert("Please provide a valid contact number");
      return;
    }

    if (!form?.password || form?.password.trim() === "") {
      alert("Please provide a password");
      return;
    }

    if (!form?.address || form?.address.trim() === "") {
      alert("Please provide an address");
      return;
    }

    if (!profileImg) {
      alert("Please upload a profile image");
      return;
    }

    // Prepare form data
    const formdata = new FormData();
    formdata.append("role", user);
    formdata.append("name", form?.name);
    formdata.append("email", form?.email);
    formdata.append("contact", form?.contact);
    formdata.append("password", form?.password);
    formdata.append("address", form?.address);
    formdata.append("profileImg", profileImg);
    formdata.append("bio", form?.bio);
    if (user === "labour") {
      formdata.append("status", "approved");
    } else {
      formdata.append("status", "pending");
    }
    try {
      // Submit form data
      const response = await registerUser(formdata);

      if (response.success === false) {
        const errData = response.data;
        setErrorMsg(errData || "Something went wrong. Please try again.");
        return;
      }

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Name and Contact */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <div>
              <select
                className="form-select border-0"
                style={{
                  boxShadow: "none",
                  height: "30px",
                  marginTop: "1px",
                  outline: "none",
                  backgroundColor: "#2A3038",
                  color: "white",
                }}
                value={user}
                onChange={(e) => setuser(e.target.value)}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="consultancy">Consultancy</option>
                <option value="contractor">Contractor</option>
                <option value="labour">Labour</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
          />
        </div>

        {/* Profile Image */}
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setprofileImg(e.target.files[0])}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={form.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* Bio (optional) */}
        <div className="mb-3">
          <textarea
            name="bio"
            className="form-control"
            placeholder="Short bio (optional)"
            value={form.bio || ""}
            onChange={handleChange}
            rows={3}
          ></textarea>
        </div>

        {/* Role and Password */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="tel"
              name="contact"
              className="form-control"
              placeholder="Contact Number"
              value={form.contact || ""}
              onChange={handleChange}
              pattern="[\+]?[0-9]{1,4}[-\s]?[0-9]{1,4}[-\s]?[0-9]{6,15}" // Optional: This pattern allows a "+" at the start and numeric digits.
              required
            />
          </div>
          <div className="col">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-purple w-100 mb-3">
          Create account
        </button>

        {/* Error Message */}
        {errorMsg && (
          <div className="alert alert-danger text-center">{errorMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Register;
