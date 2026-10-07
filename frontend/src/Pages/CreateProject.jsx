import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function CreateProject() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("You are not logged in. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/projects/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            budget: Number(budget),
          }),
        }
      );

      const data = await response.json();

      console.log("Create project response:", data);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          alert("Session expired. Please login again.");
          navigate("/login");
          return;
        }

        throw new Error(
          data.detail ||
          data.title?.[0] ||
          data.description?.[0] ||
          data.budget?.[0] ||
          "Failed to create project"
        );
      }

      setSuccess("Project created successfully! 🎉");

      setTitle("");
      setDescription("");
      setBudget("");

      setTimeout(() => {
        navigate("/client-projects");
      }, 1000);

    } catch (error) {
      console.error("Create project error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-page">

      {/* ============================= */}
      {/* NAVBAR */}
      {/* ============================= */}

      <nav className="dashboard-navbar">

        <div className="logo">
          <span>◆</span> TalentLink
        </div>

        <div className="dashboard-nav-links">

          <Link to="/client-dashboard">
            Dashboard
          </Link>

          <Link to="/client-projects">
            My Projects
          </Link>

          <Link to="/client-proposals">
            Proposals
          </Link>

          <Link to="/client-contracts">
            Contracts
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* ============================= */}
      {/* CONTENT */}
      {/* ============================= */}

      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK CLIENT
          </p>

          <h1>
            Create a New Project ➕
          </h1>

          <p>
            Post your project and find the right
            freelancer for your work.
          </p>

        </div>


        {/* ============================= */}
        {/* FORM CARD */}
        {/* ============================= */}

        <div className="create-project-card">

          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="form-group">

              <label>
                Project Title
              </label>

              <input
                type="text"
                placeholder="Enter your project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Project Description
              </label>

              <textarea
                placeholder="Describe what you need from the freelancer..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="6"
                required
              />

            </div>


            {/* BUDGET */}

            <div className="form-group">

              <label>
                Budget (₹)
              </label>

              <input
                type="number"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                min="1"
                required
              />

            </div>


            {/* ERROR */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}


            {/* BUTTONS */}

            <div className="create-project-actions">

              <Link
                to="/client-dashboard"
                className="secondary-button"
              >
                ← Cancel
              </Link>

              <button
                type="submit"
                className="card-button"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Project →"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateProject;