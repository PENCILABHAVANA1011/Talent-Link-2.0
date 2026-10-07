import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login
      const loginResponse = await fetch(
        "${import.meta.env.VITE_API_URL}/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        alert("Invalid username or password");
        console.log(loginData);
        return;
      }

      // Step 2: Save JWT
      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);

      // Step 3: Get logged-in user's profile
      const profileResponse = await fetch(
        "${import.meta.env.VITE_API_URL}/api/profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginData.access}`,
          },
        }
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        console.log(profileData);
        alert("Unable to load your profile.");
        return;
      }

      console.log("Profile:", profileData);
      console.log("Role:", profileData.role);

      // Step 4: Redirect based on role
      if (profileData.role === "client") {
        navigate("/client-dashboard");
      } else if (profileData.role === "freelancer") {
        navigate("/freelancer-dashboard");
      } else {
        alert("User role not found.");
      }

    } catch (error) {
      console.error(error);
      alert("Cannot connect to the backend.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ◆ TalentLink
        </div>

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Login to continue to TalentLink
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
          Get Started
        </Link>
        </p>
        

      </div>

    </div>
  );
}

export default Login;

