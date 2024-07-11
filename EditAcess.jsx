import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../assets/styling/EditAccess.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { FaDivide } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { toast } from "react-toastify";

const EditAccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    topics: [],
  });

  useEffect(() => {
    //fetch the user based on id
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((response) => {
        const studentdata = response.data;
        setStudent(studentdata);
        setInitialValues({
          firstName: studentdata.firstName,
          lastName: studentdata.lastName,
          topics: studentdata.topics || [],
        });
      })
      .catch((error) => {});
  }, [id]);

  // topic checkbox validation
  const Validation = Yup.object().shape({
    topics: Yup.array().min(1, "* Please select at least one topic"),
  });

  //updating the topic array
  const handleSubmit = (values, { resetForm }) => {
    const updatedStudentTopics = {
      ...student,
      topics: values.topics,
    };

    // updating the arrray in json server
    axios
      .put(`http://localhost:8000/users/${id}`, updatedStudentTopics)
      .then(() => {})
      .catch((error) => {
        console.error("Error updating student:", error);
      });
    toast.success("topics updated in successfully");
    resetForm();
  };

  return (
    <div className="edit-topic-container d-flex justify-content-center align-items-center">
      <div className="edit-topic-section mt-5 m-3 w-60 p-3">
        <h2 className="topic-main-heading text-center mt-3 mb-5">
          Edit Student Topics
        </h2>
        <div className="form-section  d-flex justify-content-center align-items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Validation}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              // checkbox form
              <Form>
                <div className="form-input">
                  <label className="topic-heading register-label mb-3 mt-2">
                    Topics:
                  </label>
                  <div role="group" className="checkbox">
                    <label className="topic-label checkbox-label">
                      <Field
                        className="check-input"
                        type="checkbox"
                        name="topics"
                        value="History"
                        checked={values.topics.includes("History")}
                      />
                      History
                      <span className="icon">
                        <MdOutlineHistoryEdu size="40px" color="#DCA47C" />
                      </span>
                    </label>
                    <label className="topic-label checkbox-label">
                      <Field
                        className="check-input"
                        type="checkbox"
                        name="topics"
                        value="Geography"
                        checked={values.topics.includes("Geography")}
                      />
                      Geography
                      <span className="icon">
                        <FaEarthAmericas size="40px" color="#36BA98" />
                      </span>
                    </label>
                    <label className="topic-label checkbox-label">
                      <Field
                        className="check-input"
                        type="checkbox"
                        name="topics"
                        value="Maths"
                        checked={values.topics.includes("Maths")}
                      />
                      Maths
                      <span className="icon">
                        <FaDivide size="40px" color="#45474B" />
                      </span>
                    </label>
                    <label className="topic-label checkbox-label">
                      <Field
                        className="check-input"
                        type="checkbox"
                        name="topics"
                        value="Science"
                        checked={values.topics.includes("Science")}
                      />
                      Science
                      <span className="icon">
                        <GiMaterialsScience size="40px" color="#758694" />
                      </span>
                    </label>
                    <label className="topic-label checkbox-label">
                      <Field
                        className="check-input"
                        type="checkbox"
                        name="topics"
                        value="Economics"
                        checked={values.topics.includes("Economics")}
                      />
                      Economics
                      <span className="icon">
                        <FaSackDollar size="40px" color="#FFD35A" />
                      </span>
                    </label>
                  </div>
                  <div className="input-errors">
                    <ErrorMessage name="topics" />
                  </div>
                </div>
                {/* save and Dashboard button */}
                <div className="save-btn d-flex justify-content-center align-items-center mt-4">
                  <button className="save-button" type="sumbit">
                    Save
                  </button>
                  <Link to="/admin-dashboard">
                    <button className="save-button" type="sumbit">
                      Dashboard
                    </button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditAccess;
