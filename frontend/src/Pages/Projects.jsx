import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/freelancer/projects/`,
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
          throw new Error(data.detail || "Failed to load projects");
        }

        setProjects(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page">

      {/* NAVBAR */}
      <nav className="dashboard-navbar">

        <div className="logo">
          <span>◆</span> TalentLink
        </div>

        <div className="dashboard-nav-links">
          <Link to="/freelancer-dashboard">
            Dashboard
          </Link>

          <Link to="/projects">
            Find Projects
          </Link>

          <Link to="/my-
          proposals">
            My Proposals
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>

      </nav>


      {/* CONTENT */}
      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK PROJECTS
          </p>

          <h1>
            Find Projects 🔎
          </h1>

          <p>
            Discover projects posted by clients and find work
            that matches your skills.
          </p>

        </div>


        {/* LOADING */}
        {loading && (
          <div className="projects-message">
            Loading projects...
          </div>
        )}


        {/* ERROR */}
        {!loading && error && (
          <div className="projects-message error-message">
            {error}
          </div>
        )}


        {/* NO PROJECTS */}
        {!loading && !error && projects.length === 0 && (
          <div className="projects-message">

            <h2>
              No projects available
            </h2>

            <p>
              Clients haven't posted any projects yet.
            </p>

          </div>
        )}


        {/* PROJECTS */}
        {!loading && !error && projects.length > 0 && (

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
                   to={`/projects/${project.id}`}
                    className="project-button"
                >
                View Project →
                </Link>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Projects;


