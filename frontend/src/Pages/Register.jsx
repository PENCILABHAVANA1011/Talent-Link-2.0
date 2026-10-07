import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            role: role,
          }),
        }
      );

      // Read response safely
      const text = await response.text();

      console.log("Register status:", response.status);
      console.log("Register response:", text);

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        alert(
          "Server returned an invalid response. Check the Django terminal."
        );
        return;
      }

      // Registration failed
      if (!response.ok) {
        console.log("Registration error:", data);

        alert(
          data.detail ||
          data.username?.[0] ||
          data.password?.[0] ||
          data.role?.[0] ||
          "Registration failed"
        );

        return;
      }

      // Registration successful
      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "Cannot connect to the backend. Make sure Django is running."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ◆ TalentLink
        </div>

        <h1>Create account</h1>

        <p className="auth-subtitle">
          Join TalentLink today
        </p>

        <form onSubmit={handleRegister}>

          {/* USERNAME */}

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* PASSWORD */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE */}

          <label>
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >

            <option value="freelancer">
              Freelancer
            </option>

            <option value="client">
              Client
            </option>

          </select>

          {/* REGISTER */}

          <button
            type="submit"
            className="auth-button"
          >
            Register
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;