import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
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

          <Link to="/freelancer-contracts">
            Contracts
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


      {/* DASHBOARD CONTENT */}

      <main className="projects-content">

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK FREELANCER DASHBOARD
          </p>

          <h1>
            Welcome back 👋
          </h1>

          <p>
            Find projects, submit proposals and grow your freelance work.
          </p>

        </div>


        {/* ⭐ ADD THE CARDS HERE */}

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <div className="dashboard-icon">
              🔎
            </div>

            <h2>
              Find Projects
            </h2>

            <p>
              Discover projects posted by clients
              and find work that matches your skills.
            </p>

            <Link
              to="/projects"
              className="card-button"
            >
              Find Projects →
            </Link>

          </div>


          <div className="dashboard-card">

            <div className="dashboard-icon">
              📄
            </div>

            <h2>
              My Proposals
            </h2>

            <p>
              Track proposals you have submitted
              to clients.
            </p>

            <Link
              to="/my-proposals"
              className="card-button"
            >
              View My Proposals →
            </Link>

          </div>


          <div className="dashboard-card">

            <div className="dashboard-icon">
              📑
            </div>

            <h2>
              My Contracts
            </h2>

            <p>
              View your active and completed contracts.
            </p>

            <Link
              to="/freelancer-contracts"
              className="card-button"
            >
              View Contracts →
            </Link>

          </div>


          <div className="dashboard-card">

            <div className="dashboard-icon">
              👤
            </div>

            <h2>
              My Profile
            </h2>

            <p>
              Update your skills, bio and freelancer information.
            </p>

            <Link
              to="/profile"
              className="card-button"
            >
              View Profile →
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;