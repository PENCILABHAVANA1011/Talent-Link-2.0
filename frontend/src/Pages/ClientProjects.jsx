import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ClientProjects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     FETCH CLIENT PROJECTS
  ========================= */

  const fetchProjects = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/projects/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to load projects"
        );
      }

      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOAD PROJECTS
  ========================= */

  useEffect(() => {
    fetchProjects();
  }, []);

  /* =========================
     CREATE PROJECT
  ========================= */

  const handleCreateProject = async (e) => {
    e.preventDefault();

    setCreateError("");
    setSuccess("");
    setCreating(true);

    const token = localStorage.getItem("access_token");

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
            title: title,
            description: description,
            budget: Number(budget),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Create project response:", data);

        throw new Error(
          data.detail ||
          data.title?.[0] ||
          data.description?.[0] ||
          data.budget?.[0] ||
          "Failed to create project"
        );
      }

      /* Add newly created project immediately */

      setProjects((previousProjects) => [
        data,
        ...previousProjects,
      ]);

      /* Clear form */

      setTitle("");
      setDescription("");
      setBudget("");

      setSuccess(
        "Project created successfully! 🎉"
      );

    } catch (error) {
      console.error("Create project error:", error);
      setCreateError(error.message);
    } finally {
      setCreating(false);
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="projects-page">

      {/* =========================
          NAVBAR
      ========================= */}

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


      {/* =========================
          CONTENT
      ========================= */}

      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK CLIENT
          </p>

          <h1>
            My Projects 📁
          </h1>

          <p>
            Create projects, manage your posted work,
            and review freelancer proposals.
          </p>

        </div>


        {/* =========================
            CREATE PROJECT
        ========================= */}

        <div className="project-card">

          <h2>
            ➕ Create New Project
          </h2>

          <p>
            Post a project and find the right freelancer
            for your work.
          </p>


          <form
            onSubmit={handleCreateProject}
            style={{
              marginTop: "20px",
            }}
          >

            {/* TITLE */}

            <label>
              Project Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter project title"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />


            {/* DESCRIPTION */}

            <label>
              Project Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe your project requirements..."
              rows="5"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />


            {/* BUDGET */}

            <label>
              Budget (₹)
            </label>

            <input
              type="number"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              placeholder="Enter project budget"
              min="1"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            />


            {/* ERROR */}

            {createError && (
              <div className="error-message">
                {createError}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="proposal-accepted">
                {success}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="card-button"
              disabled={creating}
            >

              {creating
                ? "Creating..."
                : "➕ Create Project"}

            </button>

          </form>

        </div>


        {/* =========================
            EXISTING PROJECTS
        ========================= */}

        <div
          className="projects-header"
          style={{
            marginTop: "40px",
          }}
        >

          <h2>
            Your Posted Projects
          </h2>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="projects-message">
            Loading your projects...
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="projects-message error-message">
            {error}
          </div>
        )}


        {/* NO PROJECTS */}

        {!loading &&
          !error &&
          projects.length === 0 && (

            <div className="projects-message">

              <h2>
                No projects yet
              </h2>

              <p>
                You haven't created any projects yet.
              </p>

            </div>

          )}


        {/* PROJECTS */}

        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="projects-grid">

              {projects.map((project) => (

                <div
                  className="project-card"
                  key={project.id}
                >

                  <div className="project-card-top">

                    <span className="project-status">
                      {project.status}
                    </span>

                    <span className="project-budget">
                      ₹{project.budget}
                    </span>

                  </div>


                  <h2>
                    {project.title}
                  </h2>


                  <p className="project-description">
                    {project.description}
                  </p>


                  <p className="project-date">

                    Posted:{" "}

                    {new Date(
                      project.created_at
                    ).toLocaleDateString()}

                  </p>


                  <Link
                    to={`/client-projects/${project.id}`}
                    className="project-button"
                  >
                    Manage Project →
                  </Link>

                </div>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default ClientProjects;