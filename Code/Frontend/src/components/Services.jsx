import React from "react";

function Services() {
  return (
    <div>
      <div className="service">
        <div className="container">
          <div className="section-header text-center">
            <h2>We Provide Services</h2>
          </div>
          <div className="row">
            {[
              {
                delay: "0.1s",
                img: "../img/service-1.jpg",
                title: "Building Construction",
              },
              {
                delay: "0.2s",
                img: "../img/service-2.jpg",
                title: "House Renovation",
              },
              {
                delay: "0.3s",
                img: "../img/service-3.jpg",
                title: "Architecture Design",
              },
              {
                delay: "0.4s",
                img: "../img/service-4.jpg",
                title: "Interior Design",
              },
              {
                delay: "0.5s",
                img: "../img/service-5.jpg",
                title: "Fixing & Support",
              },
              {
                delay: "0.6s",
                img: "../img/service-6.jpg",
                title: "Painting",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={service.delay}
              >
                <div className="service-item">
                  <div className="service-img">
                    <img src={service.img} alt="Image" />
                    <div className="service-overlay">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem.
                      </p>
                    </div>
                  </div>
                  <div className="service-text">
                    <h3>{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
