import React from "react";

import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="desk-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">ATTIREX</h2>
            <p className="footer-tagline">Premium fashion for everyone</p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>

          <div className="footer-copyright">
            <p>© 2023 Ecommerce All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* ------------Mobile footer------------------- */}
      <footer className="mobile-footer">
        <div className="mobile-footer-brand">
          <h3 className="mobile-footer-logo">ATTIREX</h3>
          <p className="mobile-footer-tagline">Premium fashion for everyone</p>
        </div>
        <div className="mobile-footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>
        <p className="mobile-footer-copyright">© 2023 ATTIREX</p>
      </footer>
    </>
  );
}

export { Footer };
