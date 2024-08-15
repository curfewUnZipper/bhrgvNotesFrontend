import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://bhrgvnotesserver.adaptable.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/"); // Use navigate instead of history.push
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      class="border border-success p-2 mb-2 "
      style={{ borderRadius: "20px" }}
    >
      <div className="conatiner m-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 col-md-6">
            <label htmlFor="email" className="form-label">
              {" "}
              Email address{" "}
            </label>
            <input
              type="email"
              className="form-control col-md-6"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              required
              placeholder="Enter your mail"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="password" className="form-label">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
