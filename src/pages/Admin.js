import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [user, setUser] = useState({ username: "Guest", role: "N/A" });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching admin:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
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

export default Admin;
