import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Profile = () => {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center mall-container"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {user !== null ? user.email : null}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
          <div className="w-100 text-center mt-2 mb-3">
            <Button
              variant="link"
              onClick={handleLogout}
              className="text-decoration-none"
            >
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Profile;
