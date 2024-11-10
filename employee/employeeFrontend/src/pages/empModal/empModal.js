import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3003"); // Connect to employee server

    socket.on("statusUpdated", (data) => {
      // When admin updates status, show modal on employee side
      setUpdatedStatus(data.status);
      setShowModal(true);
    });

    return () => {
      socket.disconnect(); // Clean up socket connection
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedStatus(null);
  };

  return (
    <div>
      {/* Rest of your component */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Status Updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The status of one of your applied products has been updated to: {updatedStatus}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => navigate("/orders")}>
              Go to Orders
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default EmployeeDashboard