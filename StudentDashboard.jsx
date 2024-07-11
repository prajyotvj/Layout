import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../assets/styling/StudentDashboard.css";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { FaDivide } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";

//created the topic icons initialized with respective icons
const topicIcons = {
  History: <MdOutlineHistoryEdu size="50px" color="#DCA47C" />,
  Geography: <FaEarthAmericas size="50px" color="#36BA98" />,
  Maths: <FaDivide size="50px" color="#45474B" />,
  Science: <GiMaterialsScience size="50px" color="#758694" />,
  Economics: <FaSackDollar size="50px" color="#FFD35A" />,
};

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    //// get the student data
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      getStudentByEmail(userData.email);
    }
  }, []);

  const getStudentByEmail = (email) => {
    // finding the requierd student for fetched data
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        const validStudent = response.data.find((user) => user.email === email);
        setStudent(validStudent);
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="edit-topic-container d-flex justify-content-center align-items-center">
        <div className="edit-topic-section mt-5 m-3 w-50 p-3">
          <h2 className="topic-main-heading text-capitalize text-center mt-3 mb-5">
            Allocated Topics
          </h2>
          <div className="row mt-2">
            <div className="col-md-6 offset-md-4">
              {/* used map function to display the topics allocated to student */}
              {student?.topics?.map((topic) => {
                return (
                  <p>
                    <span className="icon">{topicIcons[topic]}</span> {topic}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
