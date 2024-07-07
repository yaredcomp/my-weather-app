import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center md:text-left">
          <p>1234 Street Name, City, State, 12345</p>
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <i className="fab fa-facebook-f"></i>{" "}
            {/* Example icon, you might need to import Font Awesome or similar */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <i className="fab fa-twitter"></i> {/* Example icon */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <i className="fab fa-instagram"></i> {/* Example icon */}
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-4">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
