import React from 'react'

const PricingSection = () => {
  const packages = [
    {
      title: "Basic Grooming",
      price: "₹299",
      includes: ["Hair Cut", "Shaving", "Hair Wash"]
    },
    {
      title: "Premium Grooming",
      price: "₹499",
      includes: ["Hair Cut", "Beard Styling", "Face Massage", "Hair Wash"]
    },
    {
      title: "Royal Experience",
      price: "₹799",
      includes: ["Hair Cut", "Beard Styling", "Hair Spa", "Head Massage", "Face Massage"]
    }
  ];

  return (
    <div id="pricing-section" className="card p-4 shadow-sm mb-4">
      <h3 className="fw-bold mb-3">Pricing & Packages</h3>

      <div className="row">
        {packages.map((p, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="border rounded p-3 h-100">
              <h5 className="fw-bold">{p.title}</h5>
              <h4 className="text-primary fw-bold">{p.price}</h4>

              <ul className="text-muted small">
                {p.includes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PricingSection