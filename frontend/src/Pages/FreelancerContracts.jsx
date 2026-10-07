import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function FreelancerContracts() {

  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchContracts = async () => {

      const token = localStorage.getItem("access_token");

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/freelancer/contracts/`,
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
            data.detail || "Failed to load contracts"
          );
        }

        setContracts(data);

      } catch (error) {

        console.error(error);
        setError(error.message);

      } finally {

        setLoading(false);

      }
    };

    fetchContracts();

  }, []);


  const handleLogout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";

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

          <Link to="/freelancer-dashboard">
            Dashboard
          </Link>

          <Link to="/projects">
            Find Projects
          </Link>

          <Link to="/my-proposals">
            My Proposals
          </Link>

          <Link to="/freelancer-contracts">
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
            TALENTLINK FREELANCER
          </p>

          <h1>
            My Contracts 📄
          </h1>

          <p>
            View contracts for projects you have been selected for.
          </p>

        </div>


        {/* ============================= */}
        {/* LOADING */}
        {/* ============================= */}

        {loading && (

          <div className="projects-message">

            Loading contracts...

          </div>

        )}


        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {!loading && error && (

          <div className="projects-message error-message">

            {error}

          </div>

        )}


        {/* ============================= */}
        {/* NO CONTRACTS */}
        {/* ============================= */}

        {!loading &&
          !error &&
          contracts.length === 0 && (

            <div className="projects-message">

              <h2>
                No contracts yet
              </h2>

              <p>
                You don't have any active contracts yet.
              </p>

            </div>

        )}


        {/* ============================= */}
        {/* CONTRACTS */}
        {/* ============================= */}

        {!loading &&
          !error &&
          contracts.length > 0 && (

            <div className="projects-grid">

              {contracts.map((contract) => (

                <Link
                  key={contract.id}
                  to={`/contracts/${contract.id}`}
                  className="project-card"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >

                  <div className="project-card-top">

                    <span className="project-status">
                      {contract.status}
                    </span>

                    <span className="project-budget">
                      ₹{contract.bid_amount}
                    </span>

                  </div>


                  <h2>
                    Contract #{contract.id}
                  </h2>


                  <p>
                    Project ID:{" "}
                    <strong>
                      {contract.project}
                    </strong>
                  </p>


                  <p>
                    Duration:{" "}
                    <strong>
                      {contract.duration_days} days
                    </strong>
                  </p>


                  <p className="project-date">

                    Created:{" "}

                    {new Date(
                      contract.created_at
                    ).toLocaleDateString()}

                  </p>


                  {/* ACTIVE */}

                  {contract.status === "active" && (

                    <div className="proposal-accepted">

                      ✓ Contract Active

                    </div>

                  )}


                  {/* COMPLETED */}

                  {contract.status === "completed" && (

                    <div className="proposal-accepted">

                      ✓ Contract Completed

                    </div>

                  )}


                  {/* CANCELLED */}

                  {contract.status === "cancelled" && (

                    <div className="proposal-rejected">

                      ✕ Contract Cancelled

                    </div>

                  )}


                  <div
                    style={{
                      marginTop: "15px",
                      fontWeight: "600",
                    }}
                  >
                    View Contract →
                  </div>

                </Link>

              ))}

            </div>

        )}

      </main>

    </div>

  );

}

export default FreelancerContracts;


