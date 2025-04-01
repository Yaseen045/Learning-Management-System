// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // For error messages
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     try {
//       console.log("Sending login request...");
//       const response = await axios.post(
//         "http://localhost:9000/api/auth/login",
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true, // ✅ Ensures cookies are sent to backend
//         }
//       );

//       console.log("Response received:", response.data);

//       // Check if response contains token & roles
//       if (response.data.token && response.data.roles) {
//         const { token, roles } = response.data;
//         localStorage.setItem("token", token);

//         // Convert roles to array if needed
//         const userRoles = Array.isArray(roles) ? roles : [roles];

//         // Redirect based on role
//         if (userRoles.includes("ADMIN")) {
//           navigate("/dashboard"); // Redirect to Admin Dashboard
//         } else {
//           navigate("/"); // Redirect to Home for normal users
//         }
//       } else {
//         setError("Invalid credentials or unexpected response from the backend.");
//       }
//     } catch (error) {
//       console.error("Login failed", error.response?.data || error.message);
//       setError(error.response?.data || "Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow-sm border-0" style={{ width: "350px", borderRadius: "10px" }}>
//         <h3 className="text-center mb-3">Login</h3>

//         {/* Display error message */}
//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* Login Form */}
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-dark w-100">Login</button>
//         </form>

//         {/* Sign-up redirect */}
//         <div className="text-center mt-3">
//           <p>Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      console.log("Sending login request...");
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ Ensures cookies are sent to backend
        }
      );

      console.log("Response received:", response.data);

      // Check if response contains token & roles
      if (response.data.token && response.data.roles) {
        const { token, roles } = response.data;
        localStorage.setItem("token", token);

        // Convert roles to array if needed
        const userRoles = Array.isArray(roles) ? roles : [roles];

        // Redirect based on role
        if (userRoles.includes("ADMIN")) {
          navigate("/dashboard"); // Redirect to Admin Dashboard
        } else {
          navigate("/"); // Redirect to Home for normal users
        }
      } else {
        setError("Invalid credentials or unexpected response from the backend.");
      }
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      setError(error.response?.data || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
    style={{
      backgroundImage:
      "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    }}>
      <div className="card p-4 shadow-sm border-0" style={{ width: "350px", borderRadius: "10px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {/* Display error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>

        {/* Sign-up redirect */}
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (response.data.token && response.data.roles) {
//         const { token, roles } = response.data;
//         localStorage.setItem("token", token);

//         if (roles.includes("ADMIN")) {
//           navigate("/dashboard"); // Redirect Admins to Dashboard
//         } else {
//           navigate("/home"); // Redirect Users to Home
//         }
//       } else {
//         setError("Invalid credentials or unexpected response.");
//       }
//     } catch (error) {
//       console.error("Login failed", error.response?.data || error.message);
//       setError(error.response?.data || "Login failed. Check credentials.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow-sm border-0" style={{ width: "350px", borderRadius: "10px" }}>
//       <h7 className="text-center text-danger">Please login to access resources😊</h7>
//       <br />
//         <h3 className="text-center mb-3">Login</h3>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-dark w-100">Login</button>
//         </form>

//         <div className="text-center mt-3">
//           <p>Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (response.data.token && response.data.roles) {
//         const { token, roles } = response.data;
//         localStorage.setItem("token", token);

//         if (roles.includes("ADMIN")) {
//           navigate("/dashboard"); // Redirect Admins to Dashboard
//         } else {
//           navigate("/home"); // Redirect Users to Home
//         }
//       } else {
//         setError("Invalid credentials or unexpected response.");
//       }
//     } catch (error) {
//       console.error("Login failed", error.response?.data || error.message);
//       setError(error.response?.data || "Login failed. Check credentials.");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         backgroundImage: "url('https://img.freepik.com/free-vector/combination-circuit-head-shape-artificial-intelligence-moral-electronic-world-illustration_456031-123.jpg?semt=ais_hybrid')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//       }}
      
//     >
//       <div
//         className="card p-4 shadow-lg border-0"
//         style={{
//           width: "350px",
//           borderRadius: "10px",
//           background: "rgba(255, 255, 255, 0.9)", // Slight transparency effect
//           backdropFilter: "blur(5px)", // Glassmorphism effect
//         }}
//       >
//         <h5 className="text-center text-danger">Please login to access resources 😊</h5>
//         <br />
//         <h3 className="text-center mb-3">Login</h3>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-dark w-100">
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <p>
//             Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"

// function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post(
//         "http://localhost:9000/api/auth/login",
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         },
//       )

//       if (response.data.token && response.data.roles) {
//         const { token, roles } = response.data
//         localStorage.setItem("token", token)

//         if (roles.includes("ADMIN")) {
//           navigate("/dashboard")
//         } else {
//           navigate("/")
//         }
//       } else {
//         setError("Invalid credentials or unexpected response.")
//       }
//     } catch (error) {
//       console.error("Login failed", error.response?.data || error.message)
//       setError(error.response?.data || "Login failed. Check credentials.")
//     }
//   }

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="card p-4 shadow-lg border-0"
//         style={{
//           width: "350px",
//           borderRadius: "10px",
//           background: "rgba(255, 255, 255, 0.8)",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         <motion.h5
//           className="text-center text-danger"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//         >
//           Please login to access resources 😊
//         </motion.h5>
//         <br />
//         <motion.h3
//           className="text-center mb-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           Login
//         </motion.h3>

//         {error && (
//           <motion.div
//             className="alert alert-danger"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {error}
//           </motion.div>
//         )}

//         <motion.form
//           onSubmit={handleLogin}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7, duration: 0.5 }}
//         >
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <motion.button
//             type="submit"
//             className="btn btn-dark w-100"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Login
//           </motion.button>
//         </motion.form>

//         <motion.div
//           className="text-center mt-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.9, duration: 0.5 }}
//         >
//           <p>
//             Don't have an account?{" "}
//             <a href="/signup" className="text-primary">
//               Sign Up
//             </a>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// export default Login