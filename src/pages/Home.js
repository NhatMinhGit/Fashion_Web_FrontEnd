import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState({ username: "Guest", role: "N/A" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <button
        onClick={() =>
          axios
            .post(
              "http://localhost:8080/api/logout",
              {},
              { withCredentials: true }
            )
            .then(() => navigate("/login?logout=true"))
        }
        className="btn btn-danger mt-3"
      >
        Đăng xuất
      </button>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

export default Home;
