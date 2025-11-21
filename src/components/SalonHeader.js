import React from 'react'
import Link from "next/link";

const SalonHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 py-3 sticky-top">

      {/* LEFT SIDE LOGO / NAME */}
      <Link href="/" className="navbar-brand fw-bold fs-4">
        💈 Royal Style Salon
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#salonNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* RIGHT MENU */}
      <div className="collapse navbar-collapse justify-content-end" id="salonNav">
        <ul className="navbar-nav gap-3">

          <li className="nav-item">
            <Link href="#about-section" className="nav-link fw-semibold">
              About Us
            </Link>
          </li>

          <li className="nav-item">
            <Link href="#services-section" className="nav-link fw-semibold">
              Services
            </Link>
          </li>

          <li className="nav-item">
            <Link href="#pricing-section" className="nav-link fw-semibold">
              Pricing
            </Link>
          </li>

          <li className="nav-item">
            <Link href="#contact-section" className="nav-link fw-semibold">
              Contact Us
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default SalonHeader