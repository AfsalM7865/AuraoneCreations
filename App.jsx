import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import {
  FaBullhorn,
  FaCamera,
  FaCode,
  FaEnvelope,
  FaFilePowerpoint,
  FaFileWord,
  FaFilm,
  FaInstagram,
  FaMobileScreenButton,
  FaPalette,
  FaPenRuler,
  FaRegNewspaper,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa6";
import "./App.css";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import Portfolio from "./components/Portfolio";
import SectionHeading from "./components/SectionHeading";
import { ThemeProvider } from "./context/ThemeContext";
import { services, contactDetails, socialLinks } from "./data/siteData";

const serviceIcons = {
  "Website Build": FaCode,
  "Website Design": FaPenRuler,
  "UI/UX Design": FaMobileScreenButton,
  "Video Editing": FaFilm,
  "Portfolio Design": FaUserTie,
  "PPT Presentations": FaFilePowerpoint,
  "Word Presentations": FaFileWord,
  "Magazine Design": FaRegNewspaper,
  "Branding & Graphics": FaPalette,
  "Digital Marketing": FaBullhorn,
  Photography: FaCamera,
};

function Hero() {
  return (
    <section className="hero">
      <div>
        <small className="eyebrow">✦ CREATIVE DIGITAL STUDIO</small>
        <h1>
          We turn ideas into <em>digital experiences.</em>
        </h1>
        <p>
          AuraOne Creations is a creative freelancing studio helping ambitious
          businesses build modern digital experiences that look great and
          deliver real results.
        </p>
        <Link className="button" to="/contact">
          Start a project ↗
        </Link>
      </div>
      <aside className="hero-logo-panel">
        <img
          src="/auraone-logo.jpeg"
          alt="AuraOne logo"
          draggable="false"
          onContextMenu={(event) => event.preventDefault()}
        />
      </aside>
    </section>
  );
}
function About() {
  return (
    <section className="about page-section">
      <SectionHeading eyebrow="ABOUT AURAONE">
        Creative thinking.
        <br />
        <em>Digital execution.</em>
      </SectionHeading>
      <div className="about-content">
        <p>
          AuraOne Creations is a creative digital studio that helps businesses
          turn ideas into memorable online experiences. We blend strategy,
          design and technology to create work that feels polished and works
          with purpose.
        </p>
        <p>
          From a first portfolio website to a complete brand presence, we listen
          closely, keep the process simple and build solutions around your
          goals.
        </p>
        <div className="about-points">
          <div>
            <b>01</b>
            <span>Designed around your brand</span>
          </div>
          <div>
            <b>02</b>
            <span>Clear, collaborative process</span>
          </div>
          <div>
            <b>03</b>
            <span>Built to grow with you</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function WhyChooseUs() {
  const strengths = [
    ["On Time Delivery", "Clear timelines and focused execution to keep your project moving."],
    ["Responsive, Clean Designs", "Polished visuals that work beautifully on every screen size."],
    ["Client Focused Solutions", "Simple, intuitive experiences shaped around your customers."],
    ["Transparent Pricing", "Straightforward quotes with no hidden surprises."],
    ["Ongoing Support", "Helpful support after launch whenever you need it."],
    ["Client Focused Solutions, On Time Delivery & Quality Guaranty", "Every detail is shaped around your goals and expectations."],
  ];

  return (
    <section className="why-choose page-section">
      <SectionHeading eyebrow="WHY CHOOSE AURAONE?">
        The details that make the <em>difference.</em>
      </SectionHeading>
      <div className="why-choose-list">
        {strengths.map(([title, description], index) => (
          <article key={title}>
            <b>0{index + 1}</b>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Services() {
  return (
    <section className="page-section">
      <SectionHeading eyebrow="OUR EXPERTISE">
        Built for the work
        <br />
        <em>you want to be known for.</em>
      </SectionHeading>
      <div className="cards">
        {services.map((service, index) => {
          const ServiceIcon = serviceIcons[service];
          return (
            <article key={service}>
              <small>0{index + 1}</small>
              <strong aria-hidden="true">
                {ServiceIcon && <ServiceIcon />}
              </strong>
              <h3>{service}</h3>
              <p>Thoughtful, polished solutions designed around your goals.</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media links">
      {socialLinks.map(({ label, type, url }) => {
        const SocialIcon =
          type === "whatsapp"
            ? FaWhatsapp
            : type === "email"
              ? FaEnvelope
              : FaInstagram;
        const isEmail = type === "email";

        return (
          <a
            className={`social-link social-link--${type}`}
            key={label}
            href={url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noreferrer"}
            aria-label={`${isEmail ? "Email" : "Visit"} AuraOne ${isEmail ? "at" : "on"} ${label}`}
          >
            <SocialIcon aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </a>
        );
      })}
    </div>
  );
}
function BookingPopup() {
  function focusBookingForm() {
    document.getElementById("booking-name")?.focus();
  }

  return (
    <button
      className="booking-popup"
      type="button"
      onClick={focusBookingForm}
      aria-label="Start booking your project needs"
    >
      <span className="booking-spark">✦</span>
      <span>
        <small>READY TO START?</small>
        <b>Book your needs</b>
      </span>
      <i>↗</i>
    </button>
  );
}
function Contact() {
  return (
    <section className="contact page-section">
      <div>
        <SectionHeading eyebrow="LET’S MAKE SOMETHING MEANINGFUL">
          Have a project in mind? <em>Let’s build it.</em>
        </SectionHeading>
        <p>
          Tell us about your idea. We will get back to you with a thoughtful
          next step.
        </p>
        <div className="contact-direct">
          <a href={`mailto:${contactDetails.email}`}>
            <span>✉</span>
            <div>
              <small>Email us</small>
              <b>{contactDetails.email}</b>
            </div>
          </a>
        </div>
        <SocialLinks />
      </div>
      <div className="booking-area">
        <BookingPopup />
        <ContactForm />
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}
function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer>
        <div className="footer-brand">
          <b>AuraOne Creations</b>
          <span>Preservance Triumphs</span>
        </div>
        <div className="footer-social">
          <span className="footer-social-label">GET IN TOUCH</span>
          <SocialLinks />
        </div>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
