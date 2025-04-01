import React from "react";
import { motion } from "framer-motion";
import praveen from "../assets/images/praveen1.png";
import pawan from "../assets/images/pawan.jpg";
import pratyush from "../assets/images/pratyush.jpg";
import yaseen from "../assets/images/yaseen.jpg";
import harsh from "../assets/images/harsh.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const teamMembers = [
  {
    name: "Praveen",
    photo: praveen,
    course: "CDAC - DAC",
    role: "Software Engineer",
    github: "https://github.com/johndoe",
    linkdin: "https://github.com/johndoe",
  },
  {
    name: "Pawan",
    photo: pawan,
    course: "CDAC - DAC",
    role: "Frontend Developer",
    github: "https://github.com/janesmith",
    linkdin: "https://github.com/johndoe",
  },
  {
    name: "Pratyush",
    photo: pratyush,
    course: "CDAC - DAC",
    role: "Backend Developer",
    github: "https://github.com/alexjohnson",
    linkdin: "https://github.com/johndoe",
  },
  {
    name: "Yaseen",
    photo: yaseen,
    course: "CDAC - DAC",
    role: "Full Stack Developer",
    github: "https://github.com/emilydavis",
    linkdin: "https://github.com/johndoe",
  },
  {
    name: "Harsh",
    photo: harsh,
    course: "CDAC - DAC",
    role: "UI/UX Designer",
    github: "https://github.com/michaelbrown",
    linkdin: "https://github.com/johndoe",
  },
];

function AboutUs() {
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
          <h1>About Our Website</h1>
          <p className="lead text-muted">
            Welcome to our Learning Management System (LMS)! 🚀 Our platform is
            designed to enhance online education by providing well-structured courses,
            organized modules, and easy access to notes, previous year question papers,
            and important study materials. We aim to make learning interactive and accessible
            for everyone.
          </p>
        </motion.section>

        {/* Section 2: Team Members */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">Meet Our Team</h2>
          <div className="row justify-content-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
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
                    src={member.photo}
                    className="card-img-top rounded-circle mx-auto mt-4"
                    alt={member.name}
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text"><strong>Course:</strong> {member.course}</p>
                    <p className="card-text"><strong>Role:</strong> {member.role}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-3"
                    >
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark w-100"
                      >
                        GitHub Profile
                      </a>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={member.linkdin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-100"
                      >
                        LinkedIn Profile
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Google Map (Bangalore, Karnataka) */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-5 text-center"
        >
          <h2>📍 Our Location</h2>
          <div className="map-container mx-auto">
            <iframe
              title="Google Map - Bangalore"
              className="w-100 rounded shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.8323588835!2d77.55498735869538!3d12.97159899509465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167c360f8351%3A0x9736f0e6d5b0b766!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1648517565785!5m2!1sen!2sin"
              width="600"
              height="400"
              allowFullScreen=""
              loading="lazy"
              style={{
                border: "5px solid rgb(0, 0, 139)", // Dark blue border
                borderRadius: "10px", // Rounded corners
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
              }}
            ></iframe>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default AboutUs;