// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css"; // Ensure you have this CSS file
// import { Line, Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);
// function Dashbord() {
//   const [users, setUsers] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [feedback, setFeedback] = useState([]); // State to store feedback
//   const [newCourse, setNewCourse] = useState({ branchName: "", description: "", imageUrl: "" });
//   const [newModule, setNewModule] = useState({ courseId: "", notes: "", previousYearPaper: "", photoUrl: "" });

//   const token = localStorage.getItem("token"); // Retrieve token from localStorage

//   // Fetch all data (users, courses, feedback) when the component mounts
//   useEffect(() => {
//     fetchUsers();
//     fetchCourses();
//     fetchFeedback();
//   }, []);

//   // Function to fetch users
//   const fetchUsers = async () => {
//     try {
//       const usersResponse = await axios.get("http://localhost:9000/api/auth/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(usersResponse.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       handleAxiosError(error);
//     }
//   };

//   const userGrowthData = {
//     labels: users.map((_, index) => `User ${index + 1}`),
//     datasets: [
//       {
//         label: "Users Added",
//         data: users.map((_, index) => index + 1),
//         fill: false,
//         borderColor: "blue",
//         backgroundColor: "lightblue",
//         tension: 0.4,
//       },
//     ],
//   };
  
//   const courseGrowthData = {
//     labels: courses.map((course, index) => `Course ${index + 1}`),
//     datasets: [
//       {
//         label: "Courses Added",
//         data: courses.map((_, index) => index + 1),
//         backgroundColor: "green",
//       },
//     ],
//   };
  

//   // Function to fetch courses
//   const fetchCourses = async () => {
//     try {
//       const coursesResponse = await axios.get("http://localhost:9000/api/courses");
//       setCourses(coursesResponse.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       handleAxiosError(error);
//     }
//   };

//   // Function to fetch feedback
//   const fetchFeedback = async () => {
//     try {
//       const feedbackResponse = await axios.get("http://localhost:9000/api/feedback");
//       setFeedback(feedbackResponse.data);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//       handleAxiosError(error);
//     }
//   };

//   // Generalized error handler
//   const handleAxiosError = (error) => {
//     if (error.response) {
//       alert(`Error: ${error.response.data.message || error.response.statusText}`);
//     } else {
//       alert("Error: No response from server.");
//     }
//   };

//   // Remove a user
//   const removeUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to remove this user?")) {
//       return; // Exit if user cancels
//     }
  
//     try {
//       const response = await axios.delete(`http://localhost:9000/api/auth/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       alert(response.data.message || "User removed successfully!");
  
//       // Update state after deletion
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error);
  
//       if (error.response) {
//         alert(`Error: ${error.response.data.message || error.response.statusText}`);
//       } else {
//         alert("Error: Could not connect to the server.");
//       }
//     }
//   };
  

//   // Add a new course
//   const addCourse = async () => {
//     try {
//       const response = await axios.post("http://localhost:9000/api/courses", newCourse);
//       setCourses([...courses, response.data]); // Update the courses state
//       setNewCourse({ branchName: "", description: "", imageUrl: "" }); // Reset the form
//     } catch (error) {
//       console.error("Error adding course:", error);
//     }
//   };

//   // Add a new module
//   const addModule = async () => {
//     if (!newModule.courseId || !newModule.notes) {
//       alert("Please select a course and enter module details.");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `http://localhost:9000/api/courses/${newModule.courseId}/modules`, // ✅ Fixed URL
//         {
//           moduleName:newModule.moduleName,
//           syllabus:newModule.syllabus,
//           notes: newModule.notes,
//           previousYearPaper: newModule.previousYearPaper,
//           photoUrl: newModule.photoUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is included
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       alert("Module added successfully!");
//       setNewModule({ courseId: "", notes: "", previousYearPaper: "", photoUrl: "" });
//     } catch (error) {
//       console.error("Error adding module:", error);
//       alert("Error adding module: " + (error.response?.data || error.message));
//     }
//   };
  
//   const removeCourse = async (courseId) => {
//     try {
//       await axios.delete(`http://localhost:9000/api/courses/${courseId}`);
//       setCourses(courses.filter((course) => course.id !== courseId));
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   };
//   const [selectedCourseId, setSelectedCourseId] = useState(""); // ✅ Store selected course ID
// const [modules, setModules] = useState([]); // ✅ Store modules of selected course

// // ✅ Fetch modules when a course is selected
// const fetchModulesByCourseId = async (courseId) => {
//   if (!courseId) {
//     setModules([]); // Reset modules when no course is selected
//     return;
//   }

//   try {
//     const response = await axios.get(
//       `http://localhost:9000/api/courses/${courseId}/modules`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     setModules(response.data);
//   } catch (error) {
//     console.error("Error fetching modules:", error);
//     alert("Error fetching modules: " + (error.response?.data || error.message));
//   }
// };

// // ✅ Handle course selection
// const handleCourseSelection = (event) => {
//   const courseId = event.target.value;
//   setSelectedCourseId(courseId);
//   fetchModulesByCourseId(courseId); // Fetch modules for selected course
// };
// const removeModule = async (courseId, moduleId) => {
//   if (!moduleId) {
//     console.error("Error: moduleId is undefined!");
//     alert("Error: Unable to remove module. Module ID is missing.");
//     return;
//   }

//   if (!window.confirm("Are you sure you want to remove this module?")) {
//     return;
//   }

//   console.log(`Deleting module ${moduleId} from course ${courseId}`);

//   try {
//     const token = localStorage.getItem("token"); // Get auth token

//     const response = await axios.delete(
//       `http://localhost:9000/api/courses/${courseId}/modules/${moduleId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Ensure correct token
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     alert("Module deleted successfully!");

//     // ✅ Update UI after deletion
//     setModules((prevModules) => prevModules.filter((module) => module.id !== moduleId));
//   } catch (error) {
//     console.error("Error deleting module:", error);
//     alert("Error deleting module: " + (error.response?.data || error.message));
//   }
// };


//   return (
//     <div className="container-fluid mt-5">
//       <h2 className="mb-4 text-center">📊 LMS Dashboard</h2>

//       {/* Main Layout: 1:3 Ratio */}
//       <div className="row">
//         {/* Left Side (1/3) */}
//         <div className="col-md-4">
//           {/* Statistics Cards */}
//           <div className="row">
//             <div className="col-md-12 mb-3">
//               <div className="card text-white bg-primary">
//                 <div className="card-body">
//                   <h5 className="card-title">👤 Total Users</h5>
//                   <p className="card-text display-6">{users.length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-12 mb-3">
//               <div className="card text-white bg-success">
//                 <div className="card-body">
//                   <h5 className="card-title">📚 Total Courses</h5>
//                   <p className="card-text display-6">{courses.length}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-12 mb-3">
//   <div className="card text-white bg-warning">
//     <div className="card-body">
//       <h5 className="card-title">📝 Total Feedback</h5>
//       <p className="card-text display-6">{feedback.length}</p>
//     </div>
//   </div>
// </div>

//            {/* Feedback Section (Scrollable) */}
//            <div className="card mb-3 feedback-card">
//             <div className="card-body">
//               <h5 className="card-title">📝 Feedback</h5>
//               <div className="feedback-container">
//                 {feedback.length > 0 ? (
//                   <ul className="list-group feedback-list">
//                     {feedback.map((fb) => (
//                       <li key={fb.id} className="list-group-item">
//                         <strong>Name:</strong> {fb.name} <br />
//                         <strong>Email:</strong> {fb.email} <br />
//                         <strong>Email:</strong> {fb.location} <br />
//                         <strong>Message:</strong> {fb.message}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-muted">No feedback available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>



//         {/* Right Side (2/3) */}
//         <div className="col-md-8">
//           {/* User Management */}
//           <h3 className="mt-4">👥 User Management</h3>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button className="btn btn-danger btn-sm" onClick={() => removeUser(user.id)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <label>Select Course</label>
// <select
//   className="form-control mb-2"
//   value={selectedCourseId}
//   onChange={handleCourseSelection} // ✅ Trigger fetching modules
// >
//   <option value="">-- Select Course --</option>
//   {courses.map((course) => (
//     <option key={course.id} value={course.id}>
//       {course.branchName}
//     </option>
//   ))}
// </select>
// {/* ✅ Show Modules Table Only If a Course is Selected */}
// {selectedCourseId && (
//   <>
//     <h3 className="mt-4">📘 Modules for Selected Course</h3>
//     {modules.length > 0 ? (
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Notes</th>
//             {/* <th>Previous Year Paper</th> */}
//             <th>Photo</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {modules.map((module) => (
//             <tr key={module.id}>
//               <td>{module.id}</td>
//               <td>{module.moduleName}</td>
//               <td>Notes</td>
//               {/* <td>{module.previousYearPaper}</td> */}
//               <td>
//                 {module.photoUrl ? (
//                   <img
//                     src={module.photoUrl}
//                     alt="Module"
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                 ) : (
//                   "No Image"
//                 )}
//               </td>
//               <td>
//               {module.id && (
//   <button
//     className="btn btn-danger btn-sm"
//     onClick={() => removeModule(Number(selectedCourseId), module.id)}
//   >
//     Delete
//   </button>
// )}

//         </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : (
//       <p className="text-muted">No modules available for this course.</p>
//     )}
//   </>
// )}


//           {/* Course Management */}
//           <h3 className="mt-4">📚 Add New Course</h3>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Branch Name"
//               className="form-control mb-2"
//               value={newCourse.branchName}
//               onChange={(e) => setNewCourse({ ...newCourse, branchName: e.target.value })}
//             />
//             <textarea
//               placeholder="Course Description"
//               className="form-control mb-2"
//               value={newCourse.description}
//               onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               className="form-control mb-2"
//               value={newCourse.imageUrl}
//               onChange={(e) => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
//             />
//             <button className="btn btn-success" onClick={addCourse}>
//               Add Course
//             </button>
//           </div>

//  <h3 className="mt-4">📚 Courses</h3>
// <table className="table table-striped">
//   <thead>
//     <tr>
//       <th>Branch Name</th>
//       <th>Description</th>
//       <th>Image</th>
//       <th>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {courses.map((course) => (
//       <tr key={course.id}>
//         <td>{course.branchName}</td>
//         <td>{course.description}</td>
//         <td>
//           <img
//             src={course.imageUrl}
//             alt={course.branchName}
//             style={{ width: "50px", height: "50px" }}
//           />
//         </td>
//         <td>
//           <button
//             className="btn btn-danger btn-sm"
//             onClick={() => removeCourse(course.id)}
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>

//           {/* Module Management */}
//           <h3 className="mt-4">📘 Add Module to Course</h3>
//           <div className="mb-3">
//             <label>Select Course</label>
//             <select
//               className="form-control mb-2"
//               value={newModule.courseId}
//               onChange={(e) => setNewModule({ ...newModule, courseId: e.target.value })}
//             >
//               <option value="">-- Select Course --</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.branchName}
//                 </option>
//               ))}
//             </select>

//             <label>Name :</label>
//             <input
//               type="text"
//               placeholder="names"
//               className="form-control mb-2"
//               value={newModule.moduleName}
//               onChange={(e) => setNewModule({ ...newModule, moduleName: e.target.value })}
//             />


//             <label>Notes</label>
//             <input
//               type="text"
//               placeholder="Notes"
//               className="form-control mb-2"
//               value={newModule.notes}
//               onChange={(e) => setNewModule({ ...newModule, notes: e.target.value })}
//             />

            
//             <label>Syllabus : </label>
//             <input
//               type="text"
//               placeholder="Syllabus"
//               className="form-control mb-2"
//               value={newModule.syllabus}
//               onChange={(e) => setNewModule({ ...newModule, syllabus: e.target.value })}
//             />

//             <label>Previous Year Paper</label>
//             <input
//               type="text"
//               placeholder="Previous Year Paper"
//               className="form-control mb-2"
//               value={newModule.previousYearPaper}
//               onChange={(e) => setNewModule({ ...newModule, previousYearPaper: e.target.value })}
//             />

//             <label>Photo URL</label>
//             <input
//               type="text"
//               placeholder="Photo URL"
//               className="form-control mb-2"
//               value={newModule.photoUrl}
//               onChange={(e) => setNewModule({ ...newModule, photoUrl: e.target.value })}
//             />

//             <button className="btn btn-primary" onClick={addModule}>
//               Add Module
//             </button>
//           </div>
//         </div>
        
//         <div className="row">
//   {/* User Growth Chart */}
//   <div className="col-md-6">
//     <h3>📈 User Growth</h3>
//     <Line data={userGrowthData} />
//   </div>

//   {/* Course Growth Chart */}
//   <div className="col-md-6">
//     <h3>📊 Course Growth</h3>
//     <Bar data={courseGrowthData} />
//   </div>
// </div>

//       </div>
//     </div>
//   );
// }

// export default Dashbord;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashbord() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [newCourse, setNewCourse] = useState({ branchName: "", description: "", imageUrl: "" });
  const [newModule, setNewModule] = useState({ courseId: "", notes: "", previousYearPaper: "", photoUrl: "" });
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [modules, setModules] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(5); // State to control the number of visible users
  const [showAllUsers, setShowAllUsers] = useState(false); // State to toggle between "Show More" and "Show Less"

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchFeedback();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:8080/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      handleAxiosError(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const coursesResponse = await axios.get("http://localhost:8080/api/courses");
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      handleAxiosError(error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const feedbackResponse = await axios.get("http://localhost:8080/api/feedback");
      setFeedback(feedbackResponse.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      alert(`Error: ${error.response.data.message || error.response.statusText}`);
    } else {
      alert("Error: No response from server.");
    }
  };

  const removeUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      alert("User removed successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      handleAxiosError(error);
    }
  };

  const addCourse = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/courses", newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({ branchName: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const addModule = async () => {
    if (!newModule.courseId || !newModule.notes) {
      alert("Please select a course and enter module details.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/courses/${newModule.courseId}/modules`,
        newModule,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Module added successfully!");
      setNewModule({ courseId: "", notes: "", previousYearPaper: "", photoUrl: "" });
    } catch (error) {
      console.error("Error adding module:", error);
      alert("Error adding module: " + (error.response?.data || error.message));
    }
  };

  const removeCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const fetchModulesByCourseId = async (courseId) => {
    if (!courseId) {
      setModules([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/modules`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      alert("Error fetching modules: " + (error.response?.data || error.message));
    }
  };

  const handleCourseSelection = (event) => {
    const courseId = event.target.value;
    setSelectedCourseId(courseId);
    fetchModulesByCourseId(courseId);
  };

  const removeModule = async (courseId, moduleId) => {
    if (!moduleId) {
      alert("Error: Unable to remove module. Module ID is missing.");
      return;
    }
    if (!window.confirm("Are you sure you want to remove this module?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/courses/${courseId}/modules/${moduleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Module deleted successfully!");
      setModules(modules.filter((module) => module.id !== moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Error deleting module: " + (error.response?.data || error.message));
    }
  };

  const userGrowthData = {
    labels: users.map((_, index) => `User ${index + 1}`),
    datasets: [
      {
        label: "Users Added",
        data: users.map((_, index) => index + 1),
        fill: false,
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.4,
      },
    ],
  };

  const courseGrowthData = {
    labels: courses.map((_, index) => `Course ${index + 1}`),
    datasets: [
      {
        label: "Courses Added",
        data: courses.map((_, index) => index + 1),
        backgroundColor: "green",
      },
    ],
  };

  // Function to handle "Show More" / "Show Less" toggle
  const handleToggleShowUsers = () => {
    setShowAllUsers((prevShowAllUsers) => !prevShowAllUsers);
    setVisibleUsers(showAllUsers ? 5: users.length); // Toggle between showing 8 users and all users
  };

  return (
    <div className="container-fluid mt-2">
      <h2 className="mb-4 text-center">📊 LMS Dashboard</h2>

      {/* Main Layout: 1:3 Ratio */}
      <div className="row">
        {/* Left Side (1/3) */}
        <div className="col-md-4">
          {/* Statistics Cards */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">👤 Total Users</h5>
                  <p className="card-text display-6">{users.length}+</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">📚 Total Courses</h5>
                  <p className="card-text display-6">{courses.length}+</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <h5 className="card-title">📝 Total Feedback</h5>
                <p className="card-text display-6">{feedback.length}+</p>
              </div>
            </div>
          </div>

          {/* Feedback Section (Scrollable) */}
          <div className="card mb-3 feedback-card">
            <div className="card-body">
              <h5 className="card-title">📝 Feedback</h5>
              <div className="feedback-container">
                {feedback.length > 0 ? (
                  <ul className="list-group feedback-list">
                    {feedback.map((fb) => (
                      <li key={fb.id} className="list-group-item">
                        <strong>Name:</strong> {fb.name} <br />
                        <strong>Email:</strong> {fb.email} <br />
                        <strong>Location:</strong> {fb.location} <br />
                        <strong>Message:</strong> {fb.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No feedback available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (2/3) */}
        <div className="col-md-8">
          {/* User Management */}
          <h3 className="mt-4">👥 User Management</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, visibleUsers).map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeUser(user.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length > 8 && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={handleToggleShowUsers}>
                {showAllUsers ? "Show Less" : "Show More"}
              </button>
            </div>
            
          )}
          <h3 className="mt-4">📚 Select Courses</h3>
<select
  className="form-control mb-2"
  value={selectedCourseId}
  onChange={handleCourseSelection} // ✅ Trigger fetching modules
>
  <option value="">-- Select Course --</option>
  {courses.map((course) => (
    <option key={course.id} value={course.id}>
      {course.branchName}
    </option>
  ))}
</select>
{/* ✅ Show Modules Table Only If a Course is Selected */}
{selectedCourseId && (
  <>
    <h3 className="mt-4">📘 Modules for Selected Course</h3>
    {modules.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Notes</th>
            {/* <th>Previous Year Paper</th> */}
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.id}</td>
              <td>{module.moduleName}</td>
              <td>Notes</td>
              {/* <td>{module.previousYearPaper}</td> */}
              <td>
                {module.photoUrl ? (
                  <img
                    src={module.photoUrl}
                    alt="Module"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
              {module.id && (
  <button
    className="btn btn-danger btn-sm"
    onClick={() => removeModule(Number(selectedCourseId), module.id)}
  >
    Delete
  </button>
)}

        </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-muted">No modules available for this course.</p>
    )}
  </>
)}

          {/* Course Management */}
          <h3 className="mt-4">📚 Add New Course</h3>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Branch Name"
              className="form-control mb-2"
              value={newCourse.branchName}
              onChange={(e) => setNewCourse({ ...newCourse, branchName: e.target.value })}
            />
            <textarea
              placeholder="Course Description"
              className="form-control mb-2"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="form-control mb-2"
              value={newCourse.imageUrl}
              onChange={(e) => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
            />
            <button className="btn btn-success" onClick={addCourse}>
              Add Course
            </button>
          </div>

          <h3 className="mt-4">📚 Courses</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Branch Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.branchName}</td>
                  <td>{course.description}</td>
                  <td>
                    <img
                      src={course.imageUrl}
                      alt={course.branchName}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCourse(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Module Management */}
          <h3 className="mt-4">📘 Add Module to Course</h3>
          <div className="mb-3">
            <label>Select Course</label>
            <select
              className="form-control mb-2"
              value={newModule.courseId}
              onChange={(e) => setNewModule({ ...newModule, courseId: e.target.value })}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.branchName}
                </option>
              ))}
            </select>

            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control mb-2"
              value={newModule.moduleName}
              onChange={(e) => setNewModule({ ...newModule, moduleName: e.target.value })}
            />

            <label>Notes:</label>
            <input
              type="text"
              placeholder="Notes"
              className="form-control mb-2"
              value={newModule.notes}
              onChange={(e) => setNewModule({ ...newModule, notes: e.target.value })}
            />

            <label>Syllabus:</label>
            <input
              type="text"
              placeholder="Syllabus"
              className="form-control mb-2"
              value={newModule.syllabus}
              onChange={(e) => setNewModule({ ...newModule, syllabus: e.target.value })}
            />

            <label>Previous Year Paper:</label>
            <input
              type="text"
              placeholder="Previous Year Paper"
              className="form-control mb-2"
              value={newModule.previousYearPaper}
              onChange={(e) => setNewModule({ ...newModule, previousYearPaper: e.target.value })}
            />

            <label>Photo URL:</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="form-control mb-2"
              value={newModule.photoUrl}
              onChange={(e) => setNewModule({ ...newModule, photoUrl: e.target.value })}
            />

            <button className="btn btn-primary" onClick={addModule}>
              Add Module
            </button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>📈 User Growth</h3>
            <Line data={userGrowthData} />
          </div>
          <div className="col-md-6">
            <h3>📊 Course Growth</h3>
            <Bar data={courseGrowthData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;