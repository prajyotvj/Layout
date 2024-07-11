// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Protected(props) {
//   const { Component, requiredRole } = props;
//   const navigate = useNavigate();

//   useEffect(() => {
//     let user = localStorage.getItem("user");
//     if (!user) {
//       navigate("/login");
//     } else {
//       user = JSON.parse(user);
//       if (user) {
//         if (user.role === "student") {
//           navigate("/student-dashboard");
//         } else if (user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/login");
//         }
//       }
//     }
//   }, [navigate, requiredRole]);

//   return (
//     <div>
//       <Component />
//     </div>
//   );
// }

// export default Protected;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component, requiredRole } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // protected the route using condition
    let user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      user = JSON.parse(user);
      if (requiredRole && user.role !== requiredRole) {
        if (user.role === "student") {
          navigate("/student-dashboard");
        } else if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/login");
        }
      }
    }
  }, [navigate, requiredRole]);

  return (
    <div>
      {localStorage.getItem("user") &&
      (!requiredRole ||
        JSON.parse(localStorage.getItem("user")).role === requiredRole) ? (
        <Component />
      ) : null}
    </div>
  );
}

export default Protected;
