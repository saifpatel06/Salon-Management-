import React from 'react'

const ContactSection = () => {
  return (
    <div id="contact-section" className="card p-4 shadow-sm mb-4">
      <h3 className="fw-bold mb-3">Contact Us</h3>

      <p><strong>📍 Address:</strong> Lokhandwala, Andheri West, Mumbai</p>
      <p><strong>📞 Phone:</strong> +91 9876543210</p>
      <p><strong>📧 Email:</strong> royalstylesalon@gmail.com</p>

      <hr />

      {/* Contact Form */}
      <h5 className="fw-bold mb-3">Send us a message</h5>

      <form className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Your Name" required />
        </div>

        <div className="col-md-6">
          <input type="email" className="form-control" placeholder="Your Email" required />
        </div>

        <div className="col-12">
          <textarea className="form-control" rows="3" placeholder="Your Message"></textarea>
        </div>

        <div className="col-12">
          <button className="btn btn-primary w-100">Send Message</button>
        </div>
      </form>
    </div>
  );
}

export default ContactSection