function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">
          <span>◆</span> TalentLink
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Get Started</button>
        </div>
      </nav>

      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="badge">
            ✦ Connecting Talent With Opportunity
          </div>

          <h1>
            Great Work Starts
            <span>With Great Talent.</span>
          </h1>

          <p>
            TalentLink brings clients and skilled freelancers together
            to build, collaborate and create amazing projects.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Find a Freelancer →
            </button>

            <button className="secondary-btn">
              Find Projects
            </button>
          </div>

          <div className="stats">
            <div>
              <h3>10K+</h3>
              <p>Freelancers</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>Projects</p>
            </div>

            <div>
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
          </div>

        </div>

        <div className="hero-card">

          <div className="floating-card top-card">
            ⭐ Top Rated Freelancer
          </div>

          <div className="main-card">

            <div className="profile-circle">
              👨‍💻
            </div>

            <h3>Build. Collaborate.</h3>

            <p>
              Find the right talent for your next big idea.
            </p>

            <div className="project-status">
              <span>●</span> Projects are waiting
            </div>

          </div>

          <div className="floating-card bottom-card">
            ✓ Project Successfully Completed
          </div>

        </div>

      </section>

      <section className="how-section" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>Simple. Fast. Powerful.</h2>

          <p>
            Everything you need to turn an idea into a completed project.
          </p>
        </div>

        <div className="steps">

          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Post a Project</h3>
            <p>
              Tell freelancers what you need and set your project budget.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Receive Proposals</h3>
            <p>
              Compare bids, experience and proposals from talented freelancers.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Get It Done</h3>
            <p>
              Choose the right freelancer and bring your project to life.
            </p>
          </div>

        </div>

      </section>

      <section className="cta-section">

        <h2>Ready to build something amazing?</h2>

        <p>
          Join TalentLink and connect with your next opportunity.
        </p>

        <button className="primary-btn">
          Get Started →
        </button>

      </section>

      <footer className="footer">

        <div>
          <h3>◆ TalentLink</h3>
          <p>
            Connecting clients with talented freelancers.
          </p>
        </div>

        <p>© 2026 TalentLink. All rights reserved.</p>

      </footer>

    </div>
  )
}

export default Home