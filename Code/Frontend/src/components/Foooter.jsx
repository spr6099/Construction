import React from "react";

function Foooter() {
  return (
    <div>
      {" "}
      <div className="footer wow fadeIn" data-wow-delay="0.3s">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="footer-contact">
                <h2>Office Contact</h2>
                <p>
                  <i className="fa fa-map-marker-alt" />
                  123 Street, New York, USA
                </p>
                <p>
                  <i className="fa fa-phone-alt" />
                  +012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope" />
                  info@example.com
                </p>
                <div className="footer-social">
                  <a href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="">
                    <i className="fab fa-youtube" />
                  </a>
                  <a href="">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-link">
                <h2>Services Areas</h2>
                <a href="">Building Construction</a>
                <a href="">House Renovation</a>
                <a href="">Architecture Design</a>
                <a href="">Interior Design</a>
                <a href="">Painting</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-link">
                <h2>Useful Pages</h2>
                <a href="">About Us</a>
                <a href="">Contact Us</a>
                <a href="">Our Team</a>
                <a href="">Projects</a>
                <a href="">Testimonial</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="newsletter">
                <h2>Newsletter</h2>
                <p>
                  Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi.
                  Curabitur facilisis ornare velit non vulpu
                </p>
                <div className="form">
                  <input className="form-control" placeholder="Email here" />
                  <button className="btn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container footer-menu">
          <div className="f-menu">
            <a href="">Terms of use</a>
            <a href="">Privacy policy</a>
            <a href="">Cookies</a>
            <a href="">Help</a>
            <a href="">FQAs</a>
          </div>
        </div>
        <div className="container copyright">
          <div className="row">
            <div className="col-md-6">
              <p>
                &copy; <a href="#">Your Site Name</a>, All Right Reserved.
              </p>
            </div>
            <div className="col-md-6">
              <p>
                Designed By <a>HTML Codex</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foooter;
