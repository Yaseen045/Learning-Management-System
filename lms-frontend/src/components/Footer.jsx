import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap CSS is included

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3">About Us</h5>
            <p>We are a team dedicated to providing the best learning management experience for students and instructors.</p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none hover-underline-animation">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none hover-underline-animation">
                  About Us
                </a>
              </li>
              <li>
                <a href="/feedback" className="text-white text-decoration-none hover-underline-animation">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: info@lms.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-0">© 2025 Learning Management System | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
