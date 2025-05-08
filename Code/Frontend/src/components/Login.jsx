import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { loginUser } from "../services/AuthServices";

function Login() {
  const context = useContext(AuthContext);
  const [form, setform] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logdata = {
      email: form?.email,
      password: form?.password,
    };
    try {
      const response = await loginUser(logdata);
      console.log(response);

      const user = response?.data?.user;
      // console.log(user);

      if (user?.role === "user") {
        sessionStorage.setItem("user", JSON.stringify(user));
        context.setuser(user);
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // alert(error.message)
    }
  };

  return (
    <div className="form-container">
      <form id="registrationForm" noValidate onSubmit={handleSubmit}>
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
            type="password"
            className={`form-control-input ${form.password ? "filled" : ""}`}
            id="rphone"
            name="password"
            value={form.password || ""}
            onChange={handleChange}
            required
          />
          <label className="label-control" htmlFor="rphone">
            Password
          </label>
          <div className="help-block with-errors"></div>
        </div>
        {/* 
        <div className="form-group">
          <button type="submit" className="form-control-submit-button">
            Login
          </button>
        </div> */}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-block fw-bold py-2"
          >
            LOGIN
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
