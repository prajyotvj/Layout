import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styling/AdminDashboard.css";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  // state to store the student data
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // getting the student data
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        const users = response.data;
        const students = users.filter((user) => user.role === "student");
        setStudents(students);
      })
      .catch((error) => {
        toast.error("Error in fetching data");
      });
  }, []);

  return (
    // admin-section
    <div className="admin-dashboard">
      <h2>List of Students</h2>
      <ul>
        <>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th scope="col" style={{ width: "5%" }}>
                  Id
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Name
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Email
                </th>
                <th scope="col" style={{ width: "30%" }}>
                  Access topics
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* use map function to display the topics allocated with the student details */}
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.email}</td>
                  <td>{student.topics.join(", ")}</td>
                  <td>
                    <div className="button-container">
                      <Link
                        to={`/edit-access/${student.id}`}
                        className="edit-link"
                      >
                        <button className="button-edit">Edit</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </ul>
    </div>
  );
};

export default AdminDashboard;
