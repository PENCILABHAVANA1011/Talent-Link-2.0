import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ClientProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProposals = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/client/proposals/",
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

  useEffect(() => {
    fetchProposals();
  }, []);

  const updateProposalStatus = async (proposalId, status) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/proposals/${proposalId}/status/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update proposal"
        );
      }

      // Update the proposal immediately on screen
      setProposals((currentProposals) =>
        currentProposals.map((proposal) =>
          proposal.id === proposalId
            ? {
                ...proposal,
                status: data.status,
              }
            : proposal
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  return (
    <div className="projects-page">

      {/* NAVBAR */}

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


      {/* CONTENT */}

      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK CLIENT
          </p>

          <h1>
            Received Proposals 📩
          </h1>

          <p>
            Review proposals submitted by freelancers.
          </p>

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


        {/* NO PROPOSALS */}

        {!loading && !error && proposals.length === 0 && (
          <div className="projects-message">

            <h2>
              No proposals yet
            </h2>

            <p>
              Freelancers haven't submitted any proposals.
            </p>

          </div>
        )}


        {/* PROPOSALS */}

        {!loading && !error && proposals.length > 0 && (

          <div className="projects-grid">

            {proposals.map((proposal) => (

              <div
                className="project-card"
                key={proposal.id}
              >

                <div className="project-card-top">

                  <span className="project-status">
                    {proposal.status}
                  </span>

                  <span className="project-budget">
                    ₹{proposal.bid_amount}
                  </span>

                </div>


                <h2>
                  Proposal #{proposal.id}
                </h2>


                <p className="project-description">
                  {proposal.cover_letter}
                </p>


                <p className="project-date">
                  Duration: {proposal.duration_days} days
                </p>


                <p className="project-date">
                  Project ID: {proposal.project}
                </p>


                {/* ACTION BUTTONS */}

                {proposal.status === "pending" && (

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "20px",
                    }}
                  >

                    <button
                      className="card-button"
                      onClick={() =>
                        updateProposalStatus(
                          proposal.id,
                          "accepted"
                        )
                      }
                    >
                      Accept ✓
                    </button>

                    <button
                      className="card-button"
                      onClick={() =>
                        updateProposalStatus(
                          proposal.id,
                          "rejected"
                        )
                      }
                    >
                      Reject ✕
                    </button>

                  </div>

                )}


                {/* ACCEPTED */}

                {proposal.status === "accepted" && (

                  <div
                    style={{
                      marginTop: "20px",
                      fontWeight: "600",
                    }}
                  >
                    ✓ Proposal Accepted
                  </div>

                )}


                {/* REJECTED */}

                {proposal.status === "rejected" && (

                  <div
                    style={{
                      marginTop: "20px",
                      fontWeight: "600",
                    }}
                  >
                    ✕ Proposal Rejected
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

export default ClientProposals;