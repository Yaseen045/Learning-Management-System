// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";  // Import Axios for API requests
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     if (loggedInStatus === "true") {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const toggleAuth = () => {
//     if (isLoggedIn) {
//       setIsLoggedIn(false);
//       localStorage.setItem("isLoggedIn", "false");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   // Handle Search Input
//   const handleSearchChange = async (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       try {
//         const response = await axios.get(`http://localhost:9000/api/courses/search?query=${query}`);
//         const { courses, modules } = response.data;

//         // Transform results for UI display
//         const formattedResults = [
//           ...courses.map(course => ({ id: course.id, name: course.branchName, type: "Course" })),
//          ];

//         setSearchResults(formattedResults);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//         setSearchResults([]);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleResultClick = (id, type) => {
//     if (type === "Course") {
//       navigate(`/module/${id}`); // ✅ Redirect to course modules
//     } else {
//       navigate(`/module/details/${id}`); // ✅ Redirect to specific module details
//     }
//     setSearchQuery("");
//     setSearchResults([]);
//   };
  
  
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <span className="fs-4 fw-bold text-uppercase text-light">LMS</span>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link text-white hover-underline-animation" to="/">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white hover-underline-animation" to="/about">
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white hover-underline-animation" to="/feedback">
//                 Feedback
//               </Link>
//             </li>

//             {/* Search Bar */}
//             <li className="nav-item ms-3">
//               <div className="position-relative">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search courses/modules..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//                 {searchResults.length > 0 && (
//                 <ul className="list-group position-absolute w-100">
//                 {searchResults.map((item) => (
//                   <li
//                     key={item.id}
//                     className="list-group-item list-group-item-action"
//                     onClick={() => handleResultClick(item.id, item.type)} // ✅ Pass ID and type
//                     style={{ cursor: "pointer" }}
//                   >
//                     {item.name} ({item.type})
//                   </li>
//                 ))}
//               </ul>
              
//                 )}
//               </div>
//             </li>

//             <li className="nav-item">
//               <button
//                 className={`btn ${isLoggedIn ? "btn-danger" : "btn-light"} ms-3`}
//                 onClick={toggleAuth}
//               >
//                 {isLoggedIn ? "Logout" : "Login"}
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Import Axios for API requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Initialize to null
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/"); // Redirect to home page after logout
  };

  const toggleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  // Handle Search Input
  const handleSearchChange = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/search?query=${query}`);
        const { courses, modules } = response.data;

        // Transform results for UI display
        const formattedResults = [
          ...courses.map(course => ({ id: course.id, name: course.branchName, type: "Course" })),
         ];

        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (id, type) => {
    if (type === "Course") {
      navigate(`/module/${id}`); // ✅ Redirect to course modules
    } else {
      navigate(`/module/details/${id}`); // ✅ Redirect to specific module details
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fs-4 fw-bold text-uppercase text-light">LMS</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white hover-underline-animation" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white hover-underline-animation" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white hover-underline-animation" to="/feedback">
                Feedback
              </Link>
            </li>

            {/* Search Bar */}
            <li className="nav-item ms-3">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchResults.length > 0 && (
                <ul className="list-group position-absolute w-100">
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleResultClick(item.id, item.type)} // ✅ Pass ID and type
                      style={{ cursor: "pointer" }}
                    >
                      {item.name} ({item.type})
                    </li>
                  ))}
                </ul>
                )}
              </div>
            </li>

            <li className="nav-item">
              {isLoggedIn !== null && ( // Add a check to ensure state is not null
                <button
                  className={`btn ${isLoggedIn ? "btn-danger" : "btn-light"} ms-3`}
                  onClick={toggleAuth}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
