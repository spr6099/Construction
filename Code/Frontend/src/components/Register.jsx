import React, { useState } from "react";

function Register() {
  const [form, setform] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [Rpassword, setRpassword] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };
  console.log(form);
  console.log(Rpassword);

  return (
    <div className="form-container">
      <form id="registrationForm" noValidate>
        <div className="form-group">
          <input
            type="text"
            className="form-control-input"
            id="fname"
            name="name"
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
            className="form-control-input"
            id="remail"
            name="email"
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
            className="form-control-input"
            id="rphone"
            name="phone"
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
            type="password"
            className="form-control-input"
            id="pswd"
            name="password"
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
            className="form-control-input"
            id="rpswd"
            name="Rpassword"
            onChange={(e) => {
              setRpassword(e.target.value);
            }}
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
          <button type="submit" className="form-control-submit-button">
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
