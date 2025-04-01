import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function Module() {
  const { courseId } = useParams(); // Extract courseId from URL
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Extracted courseId:", courseId); // Debugging log

    if (!courseId || courseId === "undefined") {
      console.error("Invalid courseId. Redirecting...");
      navigate("/"); // Redirect to home if courseId is invalid
      return;
    }

    fetchModulesByCourseId(courseId);
  }, [courseId]);

  const fetchModulesByCourseId = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/modules`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched modules:", response.data); // Debugging log
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-center"
        >
          📘 Modules for Course
        </motion.h2>
        <div className="row">
          {modules.length > 0 ? (
            modules.map((module, index) => (
              <motion.div
                key={module.id}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="card h-100 shadow-sm hover-shadow transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={module.photoUrl || "https://via.placeholder.com/300"} // Fallback image
                    className="card-img-top"
                    alt="Module"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center mb-3">{module.moduleName}</h5>
                    <div className="mt-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mb-3"
                      >
                        <a
                          href={module.notes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-100"
                        >
                          📄 Download Notes
                        </a>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mb-3"
                      >
                        <a
                          href={module.previousYearPaper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary w-100"
                        >
                          📚 Download PYQ
                        </a>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a
                          href={module.syllabus}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-info w-100"
                        >
                          📖 Download Syllabus
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-danger fs-1"
            >
              <br />
              <br />
               Please login to access the resources😊🚫 
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Module;