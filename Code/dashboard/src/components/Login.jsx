import React, { useContext, useState } from "react";
import { loginUser } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const context = useContext(AuthContext);

  const [form, setform] = useState([]);
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
      const user = response.data.user;

      context.setuser(user);
      sessionStorage.setItem("user", JSON.stringify(user));

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "consultancy") {
        navigate("/consultancy/dashboard");
      } else if (user?.role === "contractor") {
        navigate("/contractor/dashboard");
      } else if (user?.role === "supplier") {
        navigate("/supplier/dashboard");
      } else if (user?.role === "labour") {
        navigate("/labour/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // You can show an error alert here if needed
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control bg-transparent text-white border border-secondary rounded-3"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control bg-transparent text-white border border-secondary rounded-3"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-info w-100 rounded-3 fw-semibold py-2"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
