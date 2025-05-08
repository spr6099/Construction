import React, { useState } from "react";
import { registerUser } from "../services/AuthServices";

function  Register() {
  const [form, setform] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rpassword: "",
  });

  const [profileImg, setprofileImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };
  // console.log(form);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("role", "user");
    formdata.append("name", form?.name);
    formdata.append("email", form?.email);
    formdata.append("contact", form?.phone);
    formdata.append("password", form?.password);
    formdata.append("profileImg", profileImg);
    formdata.append("status", "approved");

    if (form?.password !== form?.rpassword) {
      alert("password not match");
      return;
    }
    const response = await registerUser(formdata);
    // console.log(response);

    if (response.success === false) {
      const errData = response.data;
      setErrorMsg(errData || "Something went wrong.Please try again ..");
      return;
    }

    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div className="form-container">
      <form id="registrationForm" noValidate onSubmit={handlesubmit}>
        <div className="form-group">
          <input
            type="text"
            // className="form-control-input"
            className={`form-control-input ${form.name ? "filled" : ""}`}
            id="fname"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="fname">
            Full name
          </label>
          <div className="help-block with-errors"></div>
        </div>

        <div className="form-group">
          <input
            type="email"
            className={`form-control-input ${form.email ? "filled" : ""}`}
            id="remail"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="remail">
            Email address
          </label>
          <div className="help-block with-errors"></div>
        </div>

        <div className="form-group">
          <input
            type="text"
            className={`form-control-input ${form.phone ? "filled" : ""}`}
            id="rphone"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="rphone">
            Phone number
          </label>
          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-input"
            id="rimage"
            name="profile"
            onChange={(e) => setprofileImg(e.target.files[0])}
            required
          />

          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control-input ${form.password ? "filled" : ""}`}
            id="pswd"
            name="password"
            value={form.password || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="pswd">
            Password
          </label>
          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control-input ${form.rpassword ? "filled" : ""}`}
            id="rpswd"
            name="rpassword"
            value={form.rpassword || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="rpswd">
            Repeat Password
          </label>
          <div className="help-block with-errors"></div>
        </div>

        {/* <div className="form-group checkbox">
          <input
            type="checkbox"
            id="rterms"
            name="rterms"
            value="Agreed-to-Terms"
            required
          />
          <label htmlFor="rterms" className="ms-2">
            I've read and agree to Corso's written{" "}
            <a href="privacy-policy.html">Privacy Policy</a> and{" "}
            <a href="terms-conditions.html">Terms & Conditions</a>
          </label>
          <div className="help-block with-errors"></div>
        </div> */}

<div className="form-group">
  <button type="submit" className="btn btn-primary btn-block fw-bold py-2">
    REGISTER
  </button>
</div>


        <div className="form-message">
          <div id="rmsgSubmit" className="h3 text-center hidden"></div>
        </div>
      </form>
    </div>
  );
}

export default Register;
