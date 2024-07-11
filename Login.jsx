import React, { useState, useRunOnce, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styling/Login.css";
import { toast } from "react-toastify";

//initialize the login field value
const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //fetchin the user data for authentication
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast.error("Error occured in fetching user details");
      });
  }, []);

  //Login field validation
  const LoginValidation = Yup.object({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "*invalid email format")
      .required("*Please enter the email"),
    password: Yup.string()
      .min(5, "*password has minimum 5 length")
      .required("*please enter your password"),
  });

  // handle login authenticate the use based on email and password
  const handleLogin = (values) => {
    const user = userData.find((u) => {
      return u.email === values.email && u.password === values.password;
    });

    //if login success the user navigated to respective dashboard
    if (user) {
      if (user.role === "admin") {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin-dashboard");
        toast.success("Admin Logged in successfully");
      } else if (user.role === "student") {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/student-dashboard");
        toast.success("User Logged in successfully");
      }
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    // login form
    <div className="login-container">
      <div className="login-section">
        <h2 className="login-heading">
          <strong>Login</strong>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginValidation}
          onSubmit={(values, { resetForm }) => {
            handleLogin(values);
            resetForm();
          }}
        >
          {() => (
            <Form className="loginFrm">
              {/* email-field */}
              <div className="form-input-login">
                <label className="login-label" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="e.g. name@abc.com"
                  className="input-field"
                />
                <div className="input-errors">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* password-field */}
              <div className="form-input-login">
                <label className="login-label" htmlFor="password">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input-field"
                />
                <div className="input-errors">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div className="flex-container-btn">
                <div className="form-input-login">
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  <button className="login-btn" type="reset">
                    Reset
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
