import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ClientContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH CLIENT CONTRACTS
  // ==============================

  const fetchContracts = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/client/contracts/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Safely read response
      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to load contracts."
        );
      }

      console.log("CLIENT CONTRACTS:", data);

      setContracts(data);
      setError("");

    } catch (error) {
      console.error("Failed to load contracts:", error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);


  // ==============================
  // UPDATE CONTRACT STATUS
  // ==============================

  const updateContractStatus = async (
    contractId,
    newStatus
  ) => {
    const token = localStorage.getItem("access_token");

    if (!contractId) {
      alert("Contract ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/contracts/${contractId}/status/`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update contract."
        );
      }

      // Update contract on screen immediately
      setContracts((previousContracts) =>
        previousContracts.map((contract) =>
          contract.id === contractId
            ? {
                ...contract,
                status: data.status,
              }
            : contract
        )
      );

    } catch (error) {
      console.error(
        "Failed to update contract:",
        error
      );

      alert(error.message);
    }
  };


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="projects-page">

        <nav className="dashboard-navbar">

          <div className="logo">
            <span>◆</span> TalentLink
          </div>

        </nav>

        <main className="projects-content">

          <div className="projects-message">
            Loading contracts...
          </div>

        </main>

      </div>
    );
  }


  // ==============================
  // MAIN UI
  // ==============================

  return (
    <div className="projects-page">

      {/* ==============================
          NAVBAR
      ============================== */}

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


      {/* ==============================
          CONTENT
      ============================== */}

      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK CLIENT
          </p>

          <h1>
            My Contracts 📄
          </h1>

          <p>
            View contracts created from your
            accepted proposals.
          </p>

        </div>


        {/* ==============================
            ERROR
        ============================== */}

        {error && (
          <div className="projects-message error-message">

            <h2>
              Unable to load contracts
            </h2>

            <p>
              {error}
            </p>

            <button
              className="card-button"
              onClick={() => {
                setError("");
                setLoading(true);
                fetchContracts();
              }}
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==============================
            NO CONTRACTS
        ============================== */}

        {!error && contracts.length === 0 && (

          <div className="projects-message">

            <h2>
              No contracts yet
            </h2>

            <p>
              Contracts will appear here when
              you accept a proposal.
            </p>

          </div>

        )}


        {/* ==============================
            CONTRACTS
        ============================== */}

        {!error && contracts.length > 0 && (

          <div className="projects-grid">

            {contracts.map((contract) => (

              <div
                key={contract.id}
                className="project-card"
              >

                {/* ==========================
                    TOP
                ========================== */}

                <div className="project-card-top">

                  <span className="project-status">
                    {contract.status}
                  </span>

                  <span className="project-budget">
                    ₹{contract.bid_amount}
                  </span>

                </div>


                {/* ==========================
                    TITLE
                ========================== */}

                <h2>
                  Contract #{contract.id}
                </h2>


                {/* ==========================
                    DETAILS
                ========================== */}

                <p>
                  Project ID:{" "}
                  <strong>
                    {contract.project}
                  </strong>
                </p>


                <p>
                  Freelancer ID:{" "}
                  <strong>
                    {contract.freelancer}
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


                {/* ==========================
                    STATUS MESSAGE
                ========================== */}

                {contract.status === "active" && (

                  <div className="proposal-accepted">
                    ✓ Contract Active
                  </div>

                )}


                {contract.status === "completed" && (

                  <div className="proposal-accepted">
                    ✓ Contract Completed
                  </div>

                )}


                {contract.status === "cancelled" && (

                  <div className="proposal-rejected">
                    ✕ Contract Cancelled
                  </div>

                )}


                {/* ==========================
                    VIEW CONTRACT
                ========================== */}

                <Link
                  to={`/contracts/${contract.id}`}
                  className="card-button"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "15px",
                    textDecoration: "none",
                  }}
                >
                  View Contract →
                </Link>


                {/* ==========================
                    ACTION BUTTONS
                ========================== */}

                {contract.status === "active" && (

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >

                    <button
                      onClick={() =>
                        updateContractStatus(
                          contract.id,
                          "completed"
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        backgroundColor: "#22c55e",
                        color: "white",
                      }}
                    >
                      ✓ Complete
                    </button>


                    <button
                      onClick={() =>
                        updateContractStatus(
                          contract.id,
                          "cancelled"
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        backgroundColor: "#ef4444",
                        color: "white",
                      }}
                    >
                      ✕ Cancel
                    </button>

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

export default ClientContracts;