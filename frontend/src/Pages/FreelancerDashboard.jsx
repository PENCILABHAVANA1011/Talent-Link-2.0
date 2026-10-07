import { Link } from "react-router-dom";
import "../App.css";

function FreelancerDashboard() {

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

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
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* MAIN CONTENT */}
      <main className="dashboard-content">

        <div className="dashboard-header">

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


        {/* DASHBOARD CARDS */}
        <div className="dashboard-cards">


          {/* FIND PROJECTS */}
          <div className="dashboard-card">

            <div className="card-icon">
              🔎
            </div>

            <h2>
              Find Projects
            </h2>

            <p>
              Browse projects posted by clients.
            </p>

            <Link
              to="/projects"
              className="card-button"
            >
              Browse Projects →
            </Link>

          </div>


          {/* MY PROPOSALS */}
          <div className="dashboard-card">

            <div className="card-icon">
              📨
            </div>

            <h2>
              My Proposals
            </h2>

            <p>
              Track the proposals you have submitted.
            </p>

            <Link
              to="/my-proposals"
              className="card-button"
            >
              View My Proposals →
            </Link>

          </div>


          {/* PROFILE */}
          <div className="dashboard-card">

            <div className="card-icon">
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


        {/* QUICK ACTIONS */}
        <div className="dashboard-welcome">

          <h2>
            What would you like to do?
          </h2>

          <div className="quick-actions">


            {/* FIND PROJECTS */}
            <Link
              to="/projects"
              className="quick-action"
            >

              <span>🔎</span>

              <div>

                <strong>
                  Find Projects
                </strong>

                <small>
                  Explore projects posted by clients
                </small>

              </div>

            </Link>


            {/* SUBMIT PROPOSAL */}
            <Link
              to="/projects"
              className="quick-action"
            >

              <span>📨</span>

              <div>

                <strong>
                  Submit a Proposal
                </strong>

                <small>
                  Apply for projects that match your skills
                </small>

              </div>

            </Link>


            {/* PROFILE */}
            <Link
              to="/profile"
              className="quick-action"
            >

              <span>👤</span>

              <div>

                <strong>
                  Update Profile
                </strong>

                <small>
                  Add your skills and experience
                </small>

              </div>

            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default FreelancerDashboard;


