"use client";

import React from "react";
import { Clock, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./LocationContact.module.css";

export default function LocationContact() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Shop Details */}
          <div className={styles.contentContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="title-sub">Visit &amp; Connect</span>
              <h2 className={styles.heading}>Where to Find Us</h2>
            </motion.div>

            {/* Shop Information Cards */}
            <div className={styles.infoCardsList}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={styles.infoCard}
              >
                <h3 className={styles.infoTitle}>
                  <MapPin className={styles.infoIcon} size={18} /> Address
                </h3>
                <p className={styles.infoDetail}>
                  Mariyamman Kovil Street, Jolarpet, Edayampatti, Tirupattur District
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.infoCard}
              >
                <h3 className={styles.infoTitle}>
                  <Phone className={styles.infoIcon} size={18} /> Contact
                </h3>
                <p className={styles.infoDetail}>
                  Phone: +91 97892 90902
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={styles.infoCard}
              >
                <h3 className={styles.infoTitle}>
                  <Clock className={styles.infoIcon} size={18} /> Shop Hours
                </h3>
                <p className={styles.infoDetail}>
                  <strong>Monday - Saturday:</strong> 5:00 AM - 12:00 PM, 3:00 PM - 7:00 PM <br />
                  <strong>Sunday:</strong> 5:00 AM - 10:00 AM, 3:00 PM - 6:00 PM
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.mapColumn}
          >
            <div className={styles.mapWrapper}>
              <iframe
                src="https://maps.google.com/maps?q=Mariyamman%20Kovil%20Street,%20Jolarpet,%20Edayampatti,%20Tirupattur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className={styles.mapIframe}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of Sasi Maligai Kadai"
              />
            </div>
            <div className={styles.mapBtnContainer}>
              <a
                href="https://share.google/B6y1o3Ym4uiAWQ5XB"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLinkBtn}
              >
                Open in Google Maps
              </a>
              <a
                href="https://maps.google.com/?daddr=Mariyamman+Kovil+Street,+Jolarpet,+Edayampatti,+Tirupattur"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLinkBtn}
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
