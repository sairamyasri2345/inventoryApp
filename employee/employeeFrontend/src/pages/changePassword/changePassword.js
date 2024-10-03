import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./changePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(""); // To store success or error message
  const [messageType, setMessageType] = useState(""); // To store the type of message ('success' or 'error')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const employeeId = window.localStorage.getItem("employeeId");

      const response = await axios.put("https://adminapps.onrender.com/changePwd", {
        employeeId,
        currentPassword,
        newPassword,
      });

      // Show success message
      setMessage(response.data.message);
      setMessageType("success");

      setTimeout(() => {
        navigate("/layout/dashboard"); // Redirect after successful change
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error changing password:", error);

      // Show error message
      if (error.response) {
        setMessage(error.response?.data?.message);
      } else {
        setMessage("An error occurred while changing the password.");
      }
      setMessageType("error");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-center align-items-center">
            <div className="change-password-container my-5 px-4 py-4">
              <h2>Change Password</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  Reset Password
                </button>
              </form>
              {message && (
                <div
                  style={{
                    color: messageType === "success" ? "green" : "red",
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
