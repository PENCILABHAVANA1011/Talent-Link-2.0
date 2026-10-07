import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

function ContractDetails() {
  const { id } = useParams();

  /* =========================
     STATE
  ========================= */

  const [contract, setContract] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  const token = localStorage.getItem("access_token");

  /* =========================
     CURRENT USER
  ========================= */

  const currentUserId = Number(
    localStorage.getItem("user_id")
  );

  /* =========================
     FETCH CONTRACT
  ========================= */

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/contracts/${id}/`,
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
            data.detail || "Failed to load contract"
          );
        }

        setContract(data);

      } catch (error) {
        console.error(
          "Failed to load contract:",
          error
        );

        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchContract();
    }

  }, [id, token]);


  /* =========================
     FETCH REVIEWS
  ========================= */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/contracts/${id}/reviews/`,
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
            data.detail || "Failed to load reviews"
          );
        }

        setReviews(data);

      } catch (error) {
        console.error(
          "Failed to load reviews:",
          error
        );

        setReviewError(error.message);
      }
    };

    if (id && token) {
      fetchReviews();
    }

  }, [id, token]);


  /* =========================
     FETCH MESSAGES
  ========================= */

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/contracts/${id}/messages/`,
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
            data.detail || "Failed to load messages"
          );
        }

        setMessages(data);

      } catch (error) {
        console.error(
          "Failed to load messages:",
          error
        );

        setMessageError(error.message);
      }
    };

    if (id && token) {
      fetchMessages();
    }

  }, [id, token]);


  /* =========================
     SUBMIT REVIEW
  ========================= */

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setReviewError("");
    setReviewSuccess("");
    setReviewLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/reviews/",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            contract: Number(id),
            rating: Number(rating),
            comment: comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to submit review"
        );
      }

      setReviews((previousReviews) => [
        ...previousReviews,
        data,
      ]);

      setComment("");
      setRating(5);

      setReviewSuccess(
        "Review submitted successfully! ⭐"
      );

    } catch (error) {
      console.error(
        "Review error:",
        error
      );

      setReviewError(error.message);

    } finally {
      setReviewLoading(false);
    }
  };


  /* =========================
     SEND MESSAGE
  ========================= */

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setMessageError("");
    setMessageLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/contracts/${id}/messages/`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            content: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          data.message ||
          "Failed to send message"
        );
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        data,
      ]);

      setMessage("");

    } catch (error) {
      console.error(
        "Message error:",
        error
      );

      setMessageError(error.message);

    } finally {
      setMessageLoading(false);
    }
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="projects-page">

        <main className="projects-content">

          <div className="projects-message">
            Loading contract...
          </div>

        </main>

      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="projects-page">

        <main className="projects-content">

          <div className="projects-message error-message">

            <h2>
              Unable to load contract
            </h2>

            <p>
              {error}
            </p>

            <Link
              to="/freelancer-contracts"
              className="card-button"
            >
              ← Back to Contracts
            </Link>

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

        <div className="logo">

          <span>◆</span>

          TalentLink

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

      </nav>


      {/* =========================
          CONTENT
      ========================= */}

      <main className="projects-content">


        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="projects-header">

          <p className="dashboard-label">
            TALENTLINK FREELANCER
          </p>

          <h1>
            Contract Details 📄
          </h1>

          <p>
            View your contract, reviews and project
            conversation.
          </p>

        </div>


        {/* =========================
            CONTRACT CARD
        ========================= */}

        <div className="project-card">


          {/* CONTRACT TOP */}

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


          {/* =========================
              CONTRACT INFORMATION
          ========================= */}

          <div className="project-info">

            <span>
              Project ID:{" "}
              <strong>
                {contract.project}
              </strong>
            </span>


            <span>
              Client ID:{" "}
              <strong>
                {contract.client}
              </strong>
            </span>


            <span>
              Freelancer ID:{" "}
              <strong>
                {contract.freelancer}
              </strong>
            </span>


            <span>
              Agreed Amount:{" "}
              <strong>
                ₹{contract.bid_amount}
              </strong>
            </span>


            <span>
              Duration:{" "}
              <strong>
                {contract.duration_days} days
              </strong>
            </span>


            <span>
              Status:{" "}
              <strong>
                {contract.status}
              </strong>
            </span>


            <span>
              Created:{" "}
              <strong>
                {new Date(
                  contract.created_at
                ).toLocaleDateString()}
              </strong>
            </span>

          </div>


          {/* =========================
              CONTRACT STATUS
          ========================= */}

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


          {/* =====================================================
              REVIEWS
          ===================================================== */}

          {contract.status === "completed" && (

            <div
              style={{
                marginTop: "30px",
                paddingTop: "25px",
                borderTop: "1px solid #ddd",
              }}
            >

              <h2>
                ⭐ Reviews
              </h2>


              {/* REVIEW ERROR */}

              {reviewError && (

                <div className="error-message">

                  {reviewError}

                </div>

              )}


              {/* EXISTING REVIEWS */}

              {reviews.length > 0 && (

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >

                  {reviews.map((review) => (

                    <div
                      key={review.id}
                      className="project-card"
                      style={{
                        marginBottom: "15px",
                      }}
                    >

                      <h3>

                        {"⭐".repeat(
                          review.rating
                        )}

                      </h3>


                      <p>

                        <strong>
                          {review.reviewer_name}
                        </strong>

                        {" → "}

                        {review.reviewee_name}

                      </p>


                      <p>
                        {review.comment}
                      </p>


                      <small>

                        {new Date(
                          review.created_at
                        ).toLocaleDateString()}

                      </small>

                    </div>

                  ))}

                </div>

              )}


              {/* REVIEW FORM */}

              {reviews.length === 0 && (

                <form
                  onSubmit={handleSubmitReview}
                  style={{
                    marginTop: "20px",
                  }}
                >

                  <h3>
                    Leave a Review
                  </h3>


                  {/* RATING */}

                  <label>
                    Rating
                  </label>


                  <select
                    value={rating}
                    onChange={(e) =>
                      setRating(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    style={{
                      display: "block",
                      marginTop: "8px",
                      marginBottom: "15px",
                      padding: "10px",
                    }}
                  >

                    <option value="5">
                      ⭐⭐⭐⭐⭐ 5
                    </option>

                    <option value="4">
                      ⭐⭐⭐⭐ 4
                    </option>

                    <option value="3">
                      ⭐⭐⭐ 3
                    </option>

                    <option value="2">
                      ⭐⭐ 2
                    </option>

                    <option value="1">
                      ⭐ 1
                    </option>

                  </select>


                  {/* COMMENT */}

                  <label>
                    Comment
                  </label>


                  <textarea
                    value={comment}
                    onChange={(e) =>
                      setComment(
                        e.target.value
                      )
                    }
                    placeholder="Write your feedback..."
                    rows="4"
                    required
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "8px",
                      marginBottom: "15px",
                      padding: "10px",
                      boxSizing: "border-box",
                    }}
                  />


                  {/* SUCCESS */}

                  {reviewSuccess && (

                    <div className="proposal-accepted">

                      {reviewSuccess}

                    </div>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="card-button"
                    disabled={reviewLoading}
                  >

                    {reviewLoading
                      ? "Submitting..."
                      : "⭐ Submit Review"}

                  </button>

                </form>

              )}

            </div>

          )}


          {/* =====================================================
              PROJECT CHAT
          ===================================================== */}

          <div className="chat-section">


            {/* CHAT HEADER */}

            <div className="chat-header">

              <div>

                <h2>
                  💬 Project Chat
                </h2>

                <p>
                  Chat with the other person
                  about this contract.
                </p>

              </div>


              <span className="chat-status">

                ● {contract.status}

              </span>

            </div>


            {/* MESSAGE ERROR */}

            {messageError && (

              <div className="error-message">

                {messageError}

              </div>

            )}


            {/* =========================
                CHAT MESSAGES
            ========================= */}

            <div className="chat-messages">


              {messages.length === 0 ? (

                <div className="empty-chat">

                  <div className="empty-chat-icon">
                    💬
                  </div>

                  <h3>
                    No messages yet
                  </h3>

                  <p>
                    Start the conversation
                    about your project.
                  </p>

                </div>

              ) : (

                messages.map((msg) => {

                  const isMine =
                    msg.sender === currentUserId;

                  return (

                    <div
                      key={msg.id}
                      className={`chat-message ${
                        isMine
                          ? "chat-message-mine"
                          : "chat-message-other"
                      }`}
                    >

                      <div className="chat-bubble">


                        {/* SENDER */}

                        <div className="chat-sender">

                          {msg.sender_name}

                        </div>


                        {/* MESSAGE */}

                        <div className="chat-content">

                          {msg.content}

                        </div>


                        {/* TIME */}

                        <div className="chat-time">

                          {new Date(
                            msg.created_at
                          ).toLocaleString()}

                        </div>

                      </div>

                    </div>

                  );

                })

              )}

            </div>


            {/* =================================================
                SEND MESSAGE
            ================================================= */}

            {(contract.status === "active" ||
              contract.status === "completed") && (

              <form
                onSubmit={handleSendMessage}
                className="chat-input-area"
              >

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  placeholder="Write a message..."
                  rows="2"
                  required
                  className="chat-input"
                />


                <button
                  type="submit"
                  className="chat-send-button"
                  disabled={messageLoading}
                >

                  {messageLoading
                    ? "Sending..."
                    : "➤ Send"}

                </button>

              </form>

            )}

          </div>


          {/* =========================
              BACK BUTTON
          ========================= */}

          <div
            style={{
              marginTop: "25px",
            }}
          >

            <Link
              to="/freelancer-contracts"
              className="card-button"
            >

              ← Back to My Contracts

            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ContractDetails;

