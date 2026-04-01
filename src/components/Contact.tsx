import { MdArrowOutward, MdCopyright, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* CTA Header */}
        <div className="contact-cta">
          <p className="contact-label">Availability</p>
          <h2 className="contact-cta-heading">
            Let's Build the<br /><span>Future Web.</span>
          </h2>
          <p className="contact-cta-sub">
            Ready to take your digital products to the next level? I'm currently
            open for senior engineering roles and high-impact partnerships.
          </p>
        </div>

        <div className="contact-flex">
          {/* Contact Info */}
          <div className="contact-box">
            <h4>Get In Touch</h4>
            <div className="contact-info-item">
              <MdPhone className="contact-icon" />
              <a href="tel:+918828186537" data-cursor="disable">+91 88281 86537</a>
            </div>
            <div className="contact-info-item">
              <MdEmail className="contact-icon" />
              <a href="mailto:adarshsingh55555ac@gmail.com" data-cursor="disable">
                adarshsingh55555ac@gmail.com
              </a>
            </div>
            <div className="contact-info-item">
              <MdLocationOn className="contact-icon" />
              <span>Thane, Maharashtra, India</span>
            </div>
          </div>

          {/* Social */}
          <div className="contact-box">
            <h4>Connect</h4>
            <a href="https://github.com/adarsh22-dev" target="_blank" data-cursor="disable" className="contact-social">
              Github <MdArrowOutward />
            </a>
            <a href="https://linkedin.com/in/adarshvinodkumarsingh" target="_blank" data-cursor="disable" className="contact-social">
              LinkedIn <MdArrowOutward />
            </a>
            <a href="https://adarsh-singh-portfolio.vercel.app/" target="_blank" data-cursor="disable" className="contact-social">
              Portfolio <MdArrowOutward />
            </a>
          </div>

          {/* Tagline */}
          <div className="contact-box">
            <h2>
              Engineered for<br />performance by <span>Adarsh Singh</span>
            </h2>
            <p className="contact-philosophy">
              Web excellence isn't just about beautiful pixels — it's about building
              trust through flawless technical execution.
            </p>
            <h5>
              <MdCopyright /> 2026 Adarsh Singh
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
