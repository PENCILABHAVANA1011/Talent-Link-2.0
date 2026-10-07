import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showProposalForm, setShowProposalForm] = useState(false);

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [durationDays, setDurationDays] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // =============================
  // FETCH PROJECT
  // =============================

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

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
          throw new Error(
            data.detail || "Failed to load project"
          );
        }

        const selectedProject = data.find(
          (item) => item.id === Number(id)
        );

        if (!selectedProject) {
          throw new Error("Project not found");
        }

        setProject(selectedProject);

      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);


  // =============================
  // SUBMIT PROPOSAL
  // =============================

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proposals/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project: project.id,
            cover_letter: coverLetter,
            bid_amount: bidAmount,
            duration_days: durationDays,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to submit proposal"
        );
      }

      alert("Proposal submitted successfully! 🎉");

      // Clear form
      setCoverLetter("");
      setBidAmount("");
      setDurationDays("");

      // Hide form
      setShowProposalForm(false);

    } catch (error) {
      console.error(error);
      alert(error.message);

    } finally {
      setSubmitting(false);
    }
  };


  // =============================
  // LOADING
  // =============================

  if (loading) {
    return (
      <div className="projects-page">

        <div className="projects-message">
          Loading project...
        </div>

      </div>
    );
  }


  // =============================
  // ERROR
  // =============================

  if (error) {
    return (
      <div className="projects-page">

        <div className="projects-message error-message">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <Link
            to="/projects"
            className="back-link"
          >
            ← Back to Projects
          </Link>

        </div>

      </div>
    );
  }


  // =============================
  // MAIN PAGE
  // =============================

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

          <Link to="/proposals">
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


      {/* ============================= */}
      {/* PROJECT DETAILS */}
      {/* ============================= */}

      <main className="project-details-content">


        <Link
          to="/projects"
          className="back-link"
        >
          ← Back to Projects
        </Link>


        <div className="project-details-card">


          {/* TOP SECTION */}

          <div className="project-details-top">

            <span className="project-status">
              {project.status}
            </span>

            <span className="project-budget">
              ₹{project.budget}
            </span>

          </div>


          {/* TITLE */}

          <h1>
            {project.title}
          </h1>


          {/* DESCRIPTION */}

          <p className="project-details-description">
            {project.description}
          </p>


          {/* PROJECT INFORMATION */}

          <div className="project-details-info">

            <div>

              <span>
                Posted
              </span>

              <strong>
                {new Date(
                  project.created_at
                ).toLocaleDateString()}
              </strong>

            </div>


            <div>

              <span>
                Budget
              </span>

              <strong>
                ₹{project.budget}
              </strong>

            </div>


            <div>

              <span>
                Status
              </span>

              <strong>
                {project.status}
              </strong>

            </div>

          </div>


          {/* ============================= */}
          {/* APPLY SECTION */}
          {/* ============================= */}

          {!showProposalForm && (

            <div className="project-apply-section">

              <h2>
                Interested in this project?
              </h2>

              <p>
                Submit a proposal to let the client
                know why you're a good fit.
              </p>

              <button
                className="project-button"
                onClick={() =>
                  setShowProposalForm(true)
                }
              >
                Submit Proposal →
              </button>

            </div>

          )}


          {/* ============================= */}
          {/* PROPOSAL FORM */}
          {/* ============================= */}

          {showProposalForm && (

            <div className="proposal-form-card">

              <h2>
                Submit Your Proposal
              </h2>

              <p>
                Tell the client why you're the right
                freelancer for this project.
              </p>


              <form
                onSubmit={handleSubmitProposal}
              >


                {/* COVER LETTER */}

                <label>
                  Cover Letter
                </label>

                <textarea
                  placeholder="Write your proposal..."
                  value={coverLetter}
                  onChange={(e) =>
                    setCoverLetter(e.target.value)
                  }
                  required
                />


                {/* BID */}

                <label>
                  Your Bid Amount (₹)
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) =>
                    setBidAmount(e.target.value)
                  }
                  required
                />


                {/* DURATION */}

                <label>
                  Estimated Duration (Days)
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Example: 7"
                  value={durationDays}
                  onChange={(e) =>
                    setDurationDays(e.target.value)
                  }
                  required
                />


                {/* BUTTONS */}

                <div className="proposal-form-actions">


                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {

                      setShowProposalForm(false);

                    }}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="project-button"
                    disabled={submitting}
                  >

                    {submitting
                      ? "Submitting..."
                      : "Submit Proposal →"}

                  </button>

                </div>

              </form>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default ProjectDetails;


