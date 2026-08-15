"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section highlighters
      const sections = ["home", "about", "menu", "groceries", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll navigation
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Branding Logo */}
        <div className={styles.logoContainer} onClick={() => handleNavClick("home")}>
          <span className={styles.logoText}>Sasi Tea Stall</span>
          <span className={styles.logoSubText}>Tea &amp; Provisions</span>
        </div>

        {/* Desktop Menu */}
        <nav className={styles.navMenu}>
          <a
            onClick={() => handleNavClick("home")}
            className={`${styles.navLink} ${activeSection === "home" ? styles.navLinkActive : ""}`}
            href="#home"
          >
            Home
          </a>
          <a
            onClick={() => handleNavClick("about")}
            className={`${styles.navLink} ${activeSection === "about" ? styles.navLinkActive : ""}`}
            href="#about"
          >
            Our Story
          </a>
          <a
            onClick={() => handleNavClick("menu")}
            className={`${styles.navLink} ${activeSection === "menu" ? styles.navLinkActive : ""}`}
            href="#menu"
          >
            Brewed &amp; Bites
          </a>
          <a
            onClick={() => handleNavClick("groceries")}
            className={`${styles.navLink} ${activeSection === "groceries" ? styles.navLinkActive : ""}`}
            href="#groceries"
          >
            Essentials
          </a>
          <button onClick={() => handleNavClick("contact")} className={styles.contactBtn}>
            Find Us
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileNav}
          >
            <a
              onClick={() => handleNavClick("home")}
              className={`${styles.mobileLink} ${activeSection === "home" ? styles.mobileLinkActive : ""}`}
              href="#home"
            >
              Home
            </a>
            <a
              onClick={() => handleNavClick("about")}
              className={`${styles.mobileLink} ${activeSection === "about" ? styles.mobileLinkActive : ""}`}
              href="#about"
            >
              Our Story
            </a>
            <a
              onClick={() => handleNavClick("menu")}
              className={`${styles.mobileLink} ${activeSection === "menu" ? styles.mobileLinkActive : ""}`}
              href="#menu"
            >
              Brewed &amp; Bites
            </a>
            <a
              onClick={() => handleNavClick("groceries")}
              className={`${styles.mobileLink} ${activeSection === "groceries" ? styles.mobileLinkActive : ""}`}
              href="#groceries"
            >
              Essentials
            </a>
            <button
              onClick={() => handleNavClick("contact")}
              className={`${styles.contactBtn} ${styles.mobileContactBtn}`}
            >
              Find Us
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
