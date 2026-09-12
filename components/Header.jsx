import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaBars, FaXmark } from "react-icons/fa6";

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink
          className="brand brand-text"
          to="/"
          onClick={closeMenu}
          aria-label="AuraOne home"
        >
          AuraOne <i>CREATIONS</i>
        </NavLink>
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FaXmark aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>
        <div className={isOpen ? "nav-links is-open" : "nav-links"}>
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <button className="theme-toggle mobile-theme" onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light theme" : "☾ Dark theme"}
          </button>
        </div>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <NavLink className="nav-cta" to="/contact">
            Let's work together <span>↗</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
