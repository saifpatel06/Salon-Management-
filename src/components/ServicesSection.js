import React from 'react'

const ServicesSection = () => {
  const services = [
    { name: "Hair Cut", duration: "25 mins", icon: "💇‍♂️" },
    { name: "Shaving", duration: "15 mins", icon: "🪒" },
    { name: "Hair Wash", duration: "10 mins", icon: "🚿" },
    { name: "Beard Styling", duration: "20 mins", icon: "🧔" },
    { name: "Head Massage", duration: "20 mins", icon: "💆" },
  ];

  return (
    <div id="services-section" className="mb-4">
      <h3 className="fw-bold mb-3">Our Services</h3>

      {/* GRID OF CARDS */}
      <div className="row">

        {services.map((service, index) => (
          <div className="col-md-4 col-sm-6 mb-3" key={index}>
            <div
              className="p-3 shadow-sm rounded service-card h-100"
              style={{
                background: "#f8f9fa",
                border: "1px solid #eee",
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: "35px" }}>{service.icon}</div>

              {/* Title */}
              <h5 className="mt-2 fw-bold">{service.name}</h5>

              {/* Duration */}
              <p className="text-muted small m-0">{service.duration}</p>
            </div>
          </div>
        ))}

      </div>

      {/* Hover CSS */}
      <style jsx>{`
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          background: white;
        }
      `}</style>
    </div>
  );
}

export default ServicesSection