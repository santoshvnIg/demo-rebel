import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()}. All rights reserved. Powered by
        Impact Guru Foundation.
      </p>
    </footer>
  );
};

export default Footer;
