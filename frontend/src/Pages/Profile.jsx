import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Profile() {

  const [profile, setProfile] = useState({
    full_name: "",
    bio: "",
    location: "",
    role: "",
    average_rating: 0,
    review_count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");


  /* =========================
     FETCH PROFILE
  ========================= */

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/profile/`,
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
            data.detail ||
            "Failed to load profile"
          );

        }

        setProfile(data);

      } catch (error) {

        console.error(error);
        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, [token]);


  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };


  /* =========================
     UPDATE PROFILE
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            full_name: profile.full_name,

            bio: profile.bio,

            location: profile.location,

          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Failed to update profile"
        );

      }

      setProfile(data);

      setMessage(
        "Profile updated successfully!"
      );

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setSaving(false);

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
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="projects-page">

        <main className="projects-content">

          <div className="projects-message">

            Loading profile...

          </div>

        </main>

      </div>

    );

  }


  /* =========================
     MAIN UI
  ========================= */

  return (

    <div className="projects-page">


      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="dashboard-navbar">


        {/* LOGO */}

        <div className="logo">

          <span>◆</span> TalentLink

        </div>


        {/* NAVIGATION */}

        <div className="dashboard-nav-links">


          {/* CLIENT NAVIGATION */}

          {profile.role === "client" && (

            <>

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

            </>

          )}


          {/* FREELANCER NAVIGATION */}

          {profile.role === "freelancer" && (

            <>

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

            </>

          )}


          {/* PROFILE */}

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


      {/* =========================
          CONTENT
      ========================= */}

      <main className="projects-content">


        {/* HEADER */}

        <div className="projects-header">

          <p className="dashboard-label">

            TALENTLINK PROFILE

          </p>


          <h1>

            My Profile 👤

          </h1>


          <p>

            View and update your TalentLink profile.

          </p>

        </div>


        {/* ERROR */}

        {error && (

          <div className="projects-message error-message">

            {error}

          </div>

        )}


        {/* SUCCESS */}

        {message && (

          <div className="projects-message">

            {message}

          </div>

        )}


        {/* =========================
            PROFILE FORM
        ========================= */}

        <div className="profile-card">


          <form onSubmit={handleSubmit}>


            {/* FULL NAME */}

            <label>

              Full Name

            </label>


            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />


            {/* BIO */}

            <label>

              Bio

            </label>


            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows="5"
            />


            {/* LOCATION */}

            <label>

              Location

            </label>


            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />


            {/* ROLE */}

            <label>

              Role

            </label>


            <input
              type="text"
              value={profile.role}
              readOnly
            />


            {/* UPDATE BUTTON */}

            <button
              type="submit"
              className="auth-button"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Update Profile"}

            </button>


          </form>


        </div>


        {/* =========================
            FREELANCER RATING
        ========================= */}

        {profile.role === "freelancer" && (

          <div
            className="profile-card"
            style={{
              marginTop: "25px",
            }}
          >


            <h2>

              ⭐ Freelancer Rating

            </h2>


            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginTop: "15px",
              }}
            >

              ⭐{" "}
              {Number(profile.average_rating || 0).toFixed(1)}
              {" "} / 5

            </div>


            <p>

              {profile.review_count || 0}{" "}

              {Number(profile.review_count || 0) === 1
                ? "review"
                : "reviews"}

            </p>


          </div>

        )}


      </main>


    </div>

  );

}


export default Profile;


