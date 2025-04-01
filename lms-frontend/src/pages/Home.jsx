import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css"; // Ensure you have this CSS file

function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((response) => {
        console.log("Fetched courses:", response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleCourseClick = (courseId) => {
    if (!courseId) {
      console.error("Invalid courseId:", courseId);
      return;
    }
    navigate(`/module/${courseId}`);
  };

  const carouselItems = [
    {
      id: 1,
      image:
        "https://i.imgur.com/yxr5Kki.jpeg",
      description: "Unlock Knowledge, Anytime, Anywhere!",
    },
    {
      id: 2,
      image:
        "https://i.imgur.com/r9zNGaF.jpeg",
      description: "CDAC's Cutting-Edge Supercomputer Powering Innovation & Research ",
    },
    {
      id: 3,
      image:
        "https://i.imgur.com/JpeQNxK.jpeg",
      description: "The Uses of Various Technologies in Our Day Today Life",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container my-4"
    >
      {/* Carousel for featured courses */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        id="courseCarousel"
        className="carousel slide mb-5 shadow-lg rounded"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={item.image || "/placeholder.svg"}
                className="d-block w-100 rounded"
                alt={item.description}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                <h5 className="mb-0">{item.description}</h5>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#courseCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#courseCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </motion.div>

      {/* LMS Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-5"
      >
        <h2 className="text-center mb-4 text-uppercase fw-bold text-dark">
          Why Choose Our Learning Management System
        </h2>
        <div className="row justify-content-center">
          {/* Benefit 1 */}
          <motion.div
            className="col-md-4 text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="benefit-card">
              <div className="icon-container text-primary">
                <i className="fas fa-book"></i>
              </div>
              <h4>Comprehensive Course Library</h4>
              <p>
                Access a wide range of courses tailored to your learning needs, from beginner to advanced levels.
              </p>
            </div>
          </motion.div>

          {/* Benefit 2 */}
          <motion.div
            className="col-md-4 text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="benefit-card">
              <div className="icon-container text-success">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h4>Expert Instructors</h4>
              <p>
                Learn from industry experts with years of experience and practical knowledge.
              </p>
            </div>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div
            className="col-md-4 text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="benefit-card">
              <div className="icon-container text-info">
                <i className="fas fa-laptop"></i>
              </div>
              <h4>Flexible Learning</h4>
              <p>
                Study at your own pace, anytime and anywhere, with our easy-to-use online platform.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Available Courses Section */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mb-3 text-uppercase text-dark"
      >
        Available Courses
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="row"
      >
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div
              key={course.id || index}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="card h-100 shadow-sm hover-shadow transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src={course.imageUrl || "https://via.placeholder.com/250"}
                  className="card-img-top"
                  alt={course.branchName || "No branch name"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.branchName || "Unknown Branch"}</h5>
                  <p className="card-text flex-grow-1 fs-6">{course.description || "No description available."}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCourseClick(course.id)}
                    className="btn btn-dark mt-auto"
                  >
                    Go to Modules
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            Loading courses...
          </motion.p>
        )}
      </motion.div>

      {/* CDAC Section */}
       <div className="container mt-5">
        {/* Section 1: Website Description */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-5 p-4"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1>About CDAC</h1>
          <p className="lead text-muted">
          C-DAC has emerged as a trusted partner for the industry and government, offering cutting-edge solutions in
          areas like high-performance computing, artificial intelligence, and cybersecurity.
          </p>
          <a
          href="https://www.cdac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg mt-3"
        >
          Visit Official CDAC Website
        </a>

        </motion.section>
        </div>
    </motion.div>
  );
}

export default Home;