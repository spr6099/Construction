import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import Register from "../components/Register";
import Header from "../components/Header";
import Login from "../components/Login";

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [login, setlogin] = useState(false);

  useEffect(() => {
    imageSwipper();
    headerScroll();
  }, []);

  const imageSwipper = () => {
    new Swiper(".image-slider-1", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
    new Swiper(".text-slider", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  };

  const headerScroll = () => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  };
  console.log(login);

  return (
    <div>
      <div data-spy="scroll" data-target=".fixed-top">
        {/* Preloader */}
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        {/* End of preloader */}

        {/* Navigation */}
        {/* <nav className="navbar navbar-expand-lg navbar-custom navbar-dark navbar-custom fixed-top"> */}
        <Header isScrolled={isScrolled} logins={login} setlogins={setlogin} />

        <header id="header" className="header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-container">
                  <div className="countdown">
                    <span id="clock"></span>
                  </div>
                  <h1>SEO Training Course</h1>
                  <p className="p-large">
                    Do you feel like you're doing a lot of guess work when it
                    comes to SEO for your website? Take the SEO training course
                    to change that
                  </p>
                  <a className="btn-solid-lg page-scroll" href="#register">
                    REGISTER
                  </a>
                  <a className="btn-outline-lg page-scroll" href="#instructor">
                    DISCOVER
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="outer-container">
            <div className="slider-container">
              <div className="swiper-container image-slider-1">
                <div className="swiper-wrapper">
                  {/* Slide 1 */}
                  <div className="swiper-slide">
                    <img
                      className="img-fluid"
                      src="/assets/images/details-slide-1.jpg"
                      alt="alternative"
                    />
                  </div>
                  {/* Slide 2 */}
                  <div className="swiper-slide">
                    <img
                      className="img-fluid"
                      src="/assets/images/details-slide-2.jpg"
                      alt="alternative"
                    />
                  </div>
                  {/* Slide 3 */}
                  <div className="swiper-slide">
                    <img
                      className="img-fluid"
                      src="/assets/images/details-slide-3.jpg"
                      alt="alternative"
                    />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="swiper-button-next "></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
          </div>
        </header>
        <div id="register" className="form-1">
          <div className="container">
            <div className="row">
              {/* Left Text */}
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>Register Using The Form</h2>
                  <p>
                    It's easy to register for the course, just fill out the form
                    and click submit. Then you will be registered for one of the
                    best SEO training courses in the industry
                  </p>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <strong>Your information</strong> is required to
                        complete the registration
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <strong>It's safe with us</strong> and will not be used
                        for marketing
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <strong>You will receive</strong> a confirmation email
                        in less than 24h
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Form */}
              <div className="col-lg-6">{login ? <Login /> : <Register />}</div>
            </div>
          </div>
        </div>

        <div className="slider-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p className="p-small">FEATURED IN</p>

                {/* Image Slider */}
                <div className="slider-container">
                  <div className="swiper-container image-slider-2">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-1.png"
                          alt="alternative"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-2.png"
                          alt="alternative"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-3.png"
                          alt="alternative"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-4.png"
                          alt="alternative"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-5.png"
                          alt="alternative"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          className="img-fluid"
                          src="/assets/images/customer-logo-6.png"
                          alt="alternative"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of image slider */}
              </div>
            </div>
          </div>
        </div>
        <div id="instructor" className="basic-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src="/assets/images/instructor.jpg"
                  alt="alternative"
                />
              </div>
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>I’m Garry Your Trainer</h2>
                  <p>
                    Hi everybody! I am Garry and I will be your main instructor
                    during the SEO training course. I have more than 10 years
                    experience in SEO and I am very passionate about this field.
                    Register for the course and let's meet.
                  </p>
                  <p>
                    Teaching students all about the best SEO techniques is
                    something I love to do as a full-time job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="description" className="basic-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>What Will You Learn In Our SEO Focused Training Course</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled li-space-lg first">
                  <li className="media">
                    <i className="bullet">1</i>
                    <div className="media-body">
                      <h4>Optimizing your site for mobile devices</h4>
                      <p>
                        One of the keys of great SEO is having a mobile friendly
                        website which works smoothly on all devices
                      </p>
                    </div>
                  </li>
                  <li className="media">
                    <i className="bullet">2</i>
                    <div className="media-body">
                      <h4>Understand how users search</h4>
                      <p>
                        It's not enough anymore to find relevant industry
                        keywords and write huge amounts of content
                      </p>
                    </div>
                  </li>
                  <li className="media">
                    <i className="bullet">3</i>
                    <div className="media-body">
                      <h4>Write for humans optimize for engines</h4>
                      <p>
                        Write well structured and understandable articles not
                        just a mix of paragraphs that contain keywords
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="list-unstyled li-space-lg second">
                  <li className="media">
                    <i className="bullet">4</i>
                    <div className="media-body">
                      <h4>Analyse your existing search traffic</h4>
                      <p>
                        A good action plan comes out of understanding where your
                        current position is and the environment
                      </p>
                    </div>
                  </li>
                  <li className="media">
                    <i className="bullet">5</i>
                    <div className="media-body">
                      <h4>Keep updated with the latest changes</h4>
                      <p>
                        Google changes its search indexing algorithm twice a
                        year so it's important to stay updated with news
                      </p>
                    </div>
                  </li>
                  <li className="media">
                    <i className="bullet">6</i>
                    <div className="media-body">
                      <h4>Learn the most important ranking factors</h4>
                      <p>
                        Learn which are the most important search engine ranking
                        factors and optimize your website accordingly
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="basic-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>Who Should Attend The SEO Training Course</h2>
                  <p>
                    This course is for anyone passionate about the web and
                    especially fit for those seeking to improve their online
                    presence for company websites and blogs
                  </p>
                  <a
                    className="btn-solid-reg popup-with-move-anim"
                    href="#details-lightbox"
                  >
                    LIGHTBOX
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src="/assets/images/students.jpg"
                  alt="alternative"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="details-lightbox"
          className="lightbox-basic zoom-anim-dialog mfp-hide"
        >
          <div className="container">
            <div className="row">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close x-button"
              >
                ×
              </button>
              <div className="col-lg-8">
                <div className="image-container">
                  <img
                    className="img-fluid"
                    src="/assets/images/details-lightbox.jpg"
                    alt="alternative"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <h3>SEO Training Course</h3>
                <hr />
                <h5>For everybody</h5>
                <p>
                  The training course is dedicated to anyone passionate about
                  the web and in need of improving their current online
                  presence.
                </p>
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Link building framework</div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Know your current position</div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Partnering with blogs</div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Naming your images</div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Creating good sitemaps</div>
                  </li>
                  <li className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">Writing for humans</div>
                  </li>
                </ul>
                <a
                  className="btn-solid-reg mfp-close page-scroll"
                  href="#register"
                >
                  SIGN UP
                </a>{" "}
                <a
                  className="btn-outline-reg mfp-close as-button"
                  href="#screenshots"
                >
                  BACK
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Course Video Presentation</h2>

                {/* Video Preview */}
                <div className="image-container">
                  <div className="video-wrapper">
                    <a
                      className="popup-youtube"
                      href="https://www.youtube.com/watch?v=fLCjQJCekTs"
                      data-effect="fadeIn"
                    >
                      <img
                        className="img-fluid"
                        src="/assets/images/video.jpg"
                        alt="alternative"
                      />
                      <span className="video-play-button">
                        <span></span>
                      </span>
                    </a>
                  </div>
                </div>
                {/* end of video preview */}
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Key Takeaways</h2>
                <p className="p-heading">
                  Here are the main topics that will be covered in the SEO
                  training course. They cover all the basics of SEO and even
                  some advanced techniques that will help you along the way
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="fas fa-atom"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Position Analysis</h4>
                    <p>
                      Understand where your website is currently positioned in
                      search engine queries
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="fas fa-key"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Keyword Planning</h4>
                    <p>
                      Find the best relevant keywords that fit your website SEO
                      strategy in the long run
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="fas fa-newspaper"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Writing Articles</h4>
                    <p>
                      How to plan your content strategy and write articles that
                      are optimized for SEO
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="fas fa-link"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Gathering Backlinks</h4>
                    <p>
                      Backlinks are vital for SEO and we'll teach you everything
                      there is to know about them
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="far fa-handshake"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Build Partnerships</h4>
                    <p>
                      Partnerships will help you establish your website or blog
                      as an authority in your field
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div className="card">
                  <div className="card-image">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Evaluate Actions</h4>
                    <p>
                      Learn how to use the right analytics tools to evaluate
                      your SEO actions and improve them
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="slider-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>
                  Check out our attendees testimonials from previous editions of
                  the SEO Training
                </h3>

                {/* Text Slider */}
                <div className="slider-container">
                  <div className="swiper-container text-slider">
                    <div className="swiper-wrapper">
                      {/* Slide */}
                      {[
                        {
                          img: "/assets/images/testimonial-1.jpg",
                          text: "I took the SEO training course about a year ago and I am very happy. It taught me all the basics of search engine optimization and some tricks.",
                          author: "Jude Thorn - Online Marketer",
                        },
                        {
                          img: "/assets/images/testimonial-2.jpg",
                          text: "Awesome course for the money. I never thought I could learn so much about search engine optimization in such a short amount of time. Highly recommend.",
                          author: "Roy Smith - Developer",
                        },
                        {
                          img: "/assets/images/testimonial-3.jpg",
                          text: "Corso is the best SEO training course in the market. It teaches you all the basics but it also adds value with some advanced tips & tricks the are great.",
                          author: "Martin Singer - Online Marketer",
                        },
                        {
                          img: "/assets/images/testimonial-4.jpg",
                          text: "Learning SEO can actually be fun. I attended Corso SEO training and I had a great time with my peer students and the instructors. Highly recommended course.",
                          author: "Ronda Louis - Business Owner",
                        },
                      ].map((item, index) => (
                        <div className="swiper-slide" key={index}>
                          <div className="image-wrapper">
                            <img
                              className="img-fluid"
                              src={item.img}
                              alt="alternative"
                            />
                          </div>
                          <div className="text-wrapper">
                            <div className="testimonial-text">{item.text}</div>
                            <div className="testimonial-author">
                              {item.author}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Arrows */}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Date */}

        <div id="date" className="basic-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-container">
                  <h2>December 22nd 2020 at Innovation Hub Space</h2>
                  <p>
                    Our mission is to help people do better SEO. The team is
                    excited to invite you to the next SEO Training Course
                    session which undoubtedly will provide you with the
                    necessary skills to improve your online presence. Fill out
                    the form to register and we'll contact you in less than 24h
                  </p>
                  <a className="btn-solid-lg page-scroll" href="#register">
                    REGISTER
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter */}
        <div className="form-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>
                  Stay updated with news by subscribing to our newsletter and
                  our social channels
                </h3>

                {/* Newsletter Form */}
                <form
                  id="newsletterForm"
                  data-toggle="validator"
                  data-focus="false"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control-input"
                      id="nemail"
                      required
                    />
                    <label className="label-control" htmlFor="nemail">
                      Email
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group checkbox">
                    <input
                      type="checkbox"
                      id="nterms"
                      value="Agreed-to-Terms"
                      required
                    />
                    I've read and agree to Corso's written{" "}
                    <a href="privacy-policy.html">Privacy Policy</a> and{" "}
                    <a href="terms-conditions.html">Terms Conditions</a>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control-submit-button"
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div className="form-message">
                    <div
                      id="nmsgSubmit"
                      className="h3 text-center hidden"
                    ></div>
                  </div>
                </form>

                {/* Social Links */}
                <div className="icon-container">
                  {[
                    "facebook-f",
                    "twitter",
                    "pinterest-p",
                    "instagram",
                    "linkedin-in",
                  ].map((icon, i) => (
                    <span className="fa-stack" key={i}>
                      <a href="#your-link">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className={`fab fa-${icon} fa-stack-1x`}></i>
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact" className="form-3">
          <div className="container">
            <div className="row">
              {/* Contact Info */}
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>Contact Details</h2>
                  <p>
                    For registration questions please get in touch using the
                    contact details below. For any questions use the form.
                  </p>
                  <h3>Main Office Location</h3>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="media-body">
                        22 Innovative, San Francisco, CA 94043, US
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-mobile-alt"></i>
                      <div className="media-body">
                        +44 68 554 332,&nbsp;&nbsp;
                        <i className="fas fa-mobile-alt"></i>&nbsp; +44 31 276
                        112
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-envelope"></i>
                      <div className="media-body">
                        <a
                          className="light-gray"
                          href="mailto:contact@zigo.com"
                        >
                          contact@zigo.com
                        </a>{" "}
                        <i className="fas fa-globe"></i>
                        <a className="light-gray" href="#your-link">
                          www.zigo.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-6">
                <form
                  id="contactForm"
                  data-toggle="validator"
                  data-focus="false"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input"
                      id="cname"
                      required
                    />
                    <label className="label-control" htmlFor="cname">
                      Name
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control-input"
                      id="cemail"
                      required
                    />
                    <label className="label-control" htmlFor="cemail">
                      Email
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-textarea"
                      id="cmessage"
                      required
                    ></textarea>
                    <label className="label-control" htmlFor="cmessage">
                      Your message
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group checkbox">
                    <input
                      type="checkbox"
                      id="cterms"
                      value="Agreed-to-Terms"
                      required
                    />
                    I have read and agree to Corso's stated{" "}
                    <a href="privacy-policy.html">Privacy Policy</a> and{" "}
                    <a href="terms-conditions.html">Terms Conditions</a>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control-submit-button"
                    >
                      SUBMIT
                    </button>
                  </div>
                  <div className="form-message">
                    <div
                      id="cmsgSubmit"
                      className="h3 text-center hidden"
                    ></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-col first">
                  <h5>About Corso</h5>
                  <p className="p-small">
                    We're passionate about teaching people how to do better SEO
                    for their online presence
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-col second">
                  <h5>Links</h5>
                  <ul className="list-unstyled li-space-lg p-small">
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="terms-conditions.html">Terms & Conditions</a>
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="privacy-policy.html">Privacy Policy</a>
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="article-details.html">Article Details</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-col third">
                  <h5>Links</h5>
                  <ul className="list-unstyled li-space-lg p-small">
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="article-details.html">Article Details</a>
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="terms-conditions.html">Terms & Conditions</a>
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        <a href="privacy-policy.html">Privacy Policy</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-col fourth">
                  <h5>Social Media</h5>
                  <p className="p-small">For news & updates follow us</p>
                  <a href="#your-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#your-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#your-link">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                  <a href="#your-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#your-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#your-link">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p className="p-small">
                  Copyright © 2020 <a href="https://inovatik.com">Inovatik</a> -
                  All rights reserved
                </p>
                <p className="p-small">
                  Distributed By:{" "}
                  <a href="https://themewagon.com" target="_blank">
                    ThemeWagon
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
