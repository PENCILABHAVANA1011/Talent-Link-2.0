import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/freelancer/proposals/`,
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
            data.detail || "Failed to load proposals"
          );
        }

        setProposals(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
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

          <Link to="/my-proposals">
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

          <div>
            <p className="dashboard-label">
              TALENTLINK FREELANCER
            </p>

            <h1>My Proposals</h1>

            <p>
              Track the proposals you have submitted
              to clients.
            </p>
          </div>

        </div>


        {/* LOADING */}
        {loading && (
          <div className="projects-message">
            Loading proposals...
          </div>
        )}


        {/* ERROR */}
        {!loading && error && (
          <div className="projects-message error-message">
            {error}
          </div>
        )}


        {/* EMPTY */}
        {!loading &&
          !error &&
          proposals.length === 0 && (
            <div className="projects-message">
              You haven't submitted any proposals yet.
            </div>
          )}


        {/* PROPOSALS */}
        {!loading &&
          !error &&
          proposals.length > 0 && (

            <div className="projects-grid">

              {proposals.map((proposal) => (

                <div
                  className="project-card"
                  key={proposal.id}
                >

                  <div className="project-card-top">

                    <span
                      className={`project-status ${proposal.status}`}
                    >
                      {proposal.status}
                    </span>

                    <span className="project-budget">
                      ₹{proposal.bid_amount}
                    </span>

                  </div>


                  <h2>
                    Proposal #{proposal.id}
                  </h2>


                  <p>
                    {proposal.cover_letter}
                  </p>


                  <div className="project-info">

                    <span>
                      Duration:{" "}
                      <strong>
                        {proposal.duration_days} days
                      </strong>
                    </span>

                    <span>
                      Project ID:{" "}
                      <strong>
                        {proposal.project}
                      </strong>
                    </span>

                  </div>


                  {proposal.status === "accepted" && (
                    <div className="proposal-accepted">
                      ✓ Proposal Accepted
                    </div>
                  )}

                  {proposal.status === "rejected" && (
                    <div className="proposal-rejected">
                      ✕ Proposal Rejected
                    </div>
                  )}

                  {proposal.status === "pending" && (
                    <div className="proposal-pending">
                      ⏳ Waiting for client response
                    </div>
                  )}

                </div>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default MyProposals;


