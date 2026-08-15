"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.heroBackground} />
      
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Animated Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroContent}
          >
            <span className={styles.tagline}>A Century of Taste &amp; Trust</span>
            <h1 className={styles.title}>
              Savor the Finest <br />
              <span className={styles.titleEm}>Chai &amp; Comfort</span>
            </h1>
            <p className={styles.description}>
              Welcome to Sasi Tea Stall, Jolarpet’s legendary local hub serving rich, authentic masala teas, crispy fresh snacks, and carefully curated daily provisions.
            </p>
            <div className={styles.btnGroup}>
              <button onClick={() => scrollToSection("menu")} className={styles.primaryBtn}>
                Explore Menu
              </button>
              <button onClick={() => scrollToSection("groceries")} className={styles.secondaryBtn}>
                Shop Essentials
              </button>
            </div>
          </motion.div>

          {/* Animated Image Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className={styles.heroVisual}
          >
            <Image
              src="/tea_hero.jpg"
              alt="Steaming cup of premium South Indian masala tea"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Live rising steam animation overlay */}
            <div className={styles.steamContainer}>
              <div className={`${styles.steamLine} ${styles.steamLine1}`}>
                <svg className={styles.steamSvg} viewBox="0 0 10 100" preserveAspectRatio="none">
                  <path d="M5,100 Q2,70 5,40 T5,0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className={`${styles.steamLine} ${styles.steamLine2}`}>
                <svg className={styles.steamSvg} viewBox="0 0 10 100" preserveAspectRatio="none">
                  <path d="M5,100 Q8,75 5,50 T5,0" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className={`${styles.steamLine} ${styles.steamLine3}`}>
                <svg className={styles.steamSvg} viewBox="0 0 10 100" preserveAspectRatio="none">
                  <path d="M5,100 Q1,65 5,35 T5,0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
