import { Link } from "react-router-dom";
import "../App.css";

function ClientDashboard() {

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

      {/* ============================= */}
      {/* NAVBAR */}
      {/* ============================= */}

      <nav className="dashboard-navbar">

        {/* LOGO */}

        <div className="logo">
          <span>◆</span> TalentLink
        </div>


        {/* NAVIGATION */}

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


        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="dashboard-content">


        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              TALENTLINK CLIENT DASHBOARD
            </p>

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Manage your projects, review proposals
              and connect with talented freelancers.
            </p>

          </div>

        </div>


        {/* ============================= */}
        {/* DASHBOARD CARDS */}
        {/* ============================= */}

        <div className="dashboard-cards">


          {/* ============================= */}
          {/* CREATE PROJECT */}
          {/* ============================= */}

          <div className="dashboard-card">

            <div className="card-icon">
              ➕
            </div>

            <h2>
              Create a Project
            </h2>

            <p>
              Post a new project and find talented
              freelancers for your work.
            </p>

            <Link
              to="/create-project"
              className="card-button"
            >
              Create Project →
            </Link>

          </div>


          {/* ============================= */}
          {/* MY PROJECTS */}
          {/* ============================= */}

          <div className="dashboard-card">

            <div className="card-icon">
              📁
            </div>

            <h2>
              My Projects
            </h2>

            <p>
              Create and manage projects posted for
              freelancers.
            </p>

            <Link
              to="/client-projects"
              className="card-button"
            >
              View Projects →
            </Link>

          </div>


          {/* ============================= */}
          {/* PROPOSALS */}
          {/* ============================= */}

          <div className="dashboard-card">

            <div className="card-icon">
              📨
            </div>

            <h2>
              Proposals
            </h2>

            <p>
              Review proposals submitted by
              freelancers.
            </p>

            <Link
              to="/client-proposals"
              className="card-button"
            >
              View Proposals →
            </Link>

          </div>


          {/* ============================= */}
          {/* CONTRACTS */}
          {/* ============================= */}

          <div className="dashboard-card">

            <div className="card-icon">
              📄
            </div>

            <h2>
              My Contracts
            </h2>

            <p>
              View contracts created from your
              accepted proposals.
            </p>

            <Link
              to="/client-contracts"
              className="card-button"
            >
              View Contracts →
            </Link>

          </div>


          {/* ============================= */}
          {/* PROFILE */}
          {/* ============================= */}

          <div className="dashboard-card">

            <div className="card-icon">
              👤
            </div>

            <h2>
              My Profile
            </h2>

            <p>
              View and update your client profile
              information.
            </p>

            <Link
              to="/profile"
              className="card-button"
            >
              View Profile →
            </Link>

          </div>

        </div>


        {/* ============================= */}
        {/* QUICK ACTIONS */}
        {/* ============================= */}

        <div className="dashboard-welcome">

          <h2>
            What would you like to do?
          </h2>


          <div className="quick-actions">


            {/* ============================= */}
            {/* CREATE PROJECT */}
            {/* ============================= */}

            <Link
              to="/create-project"
              className="quick-action"
            >

              <span>
                ➕
              </span>

              <div>

                <strong>
                  Create a Project
                </strong>

                <small>
                  Post a new project and find
                  talented freelancers
                </small>

              </div>

            </Link>


            {/* ============================= */}
            {/* VIEW PROPOSALS */}
            {/* ============================= */}

            <Link
              to="/client-proposals"
              className="quick-action"
            >

              <span>
                📋
              </span>

              <div>

                <strong>
                  Review Proposals
                </strong>

                <small>
                  Check proposals submitted
                  by freelancers
                </small>

              </div>

            </Link>


            {/* ============================= */}
            {/* CONTRACTS */}
            {/* ============================= */}

            <Link
              to="/client-contracts"
              className="quick-action"
            >

              <span>
                📄
              </span>

              <div>

                <strong>
                  My Contracts
                </strong>

                <small>
                  View your active and completed
                  contracts
                </small>

              </div>

            </Link>


            {/* ============================= */}
            {/* PROFILE */}
            {/* ============================= */}

            <Link
              to="/profile"
              className="quick-action"
            >

              <span>
                👤
              </span>

              <div>

                <strong>
                  Update Profile
                </strong>

                <small>
                  Keep your client information
                  up to date
                </small>

              </div>

            </Link>


          </div>

        </div>


      </main>

    </div>
  );
}

export default ClientDashboard;