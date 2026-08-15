"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <h2 className={styles.logoText}>Sasi Tea Stall</h2>
            <span className={styles.logoSubText}>Tea &amp; Provisions</span>
            <p className={styles.brandDesc}>
              A trusted local shop serving quality tea, snacks, groceries, and everyday essentials. Providing hospitality and convenience to Jolarpet for decades.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.title}>Quick Navigation</h3>
            <ul className={styles.linksList}>
              <li onClick={() => handleScroll("home")} className={styles.link}>
                Home
              </li>
              <li onClick={() => handleScroll("about")} className={styles.link}>
                Our Story
              </li>
              <li onClick={() => handleScroll("menu")} className={styles.link}>
                Brewed &amp; Bites
              </li>
              <li onClick={() => handleScroll("groceries")} className={styles.link}>
                Essentials
              </li>
              <li onClick={() => handleScroll("contact")} className={styles.link}>
                Find Us
              </li>
            </ul>
          </div>

          {/* Shop Hours Summary */}
          <div>
            <h3 className={styles.title}>Operating Hours</h3>
            <div className={styles.hoursList}>
              <div>
                <span className={styles.hoursDay}>Monday - Saturday:</span>
                <p>5:00 AM - 12:00 PM</p>
                <p>3:00 PM - 7:00 PM</p>
              </div>
              <div>
                <span className={styles.hoursDay}>Sunday:</span>
                <p>5:00 AM - 10:00 AM</p>
                <p>3:00 PM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Sasi Tea Stall. All rights reserved.
          </p>
          <p className={styles.signature}>
            Crafted for elegance &amp; trust by{" "}
            <a
              href="https://sasimaligaikadai.com"
              className={styles.signatureLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sasi Tea Stall
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
