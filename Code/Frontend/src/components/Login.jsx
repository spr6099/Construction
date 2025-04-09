import React from "react";

function Login() {
  
  return (
    <div className="form-container">
      <form id="registrationForm" noValidate>
        <div className="form-group">
          <input
            type="email"
            className="form-control-input"
            id="remail"
            name="remail"
            required
          />
          <label className="label-control" htmlFor="remail">
            Email address
          </label>
          <div className="help-block with-errors"></div>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control-input"
            id="rphone"
            name="rphone"
            required
          />
          <label className="label-control" htmlFor="rphone">
            Password
          </label>
          <div className="help-block with-errors"></div>
        </div>

        <div className="form-group">
          <button type="submit" className="form-control-submit-button">
            Login
          </button>
        </div>

        <div className="form-message">
          <div id="rmsgSubmit" className="h3 text-center hidden"></div>
        </div>
      </form>
    </div>
  );
}

export default Login;
