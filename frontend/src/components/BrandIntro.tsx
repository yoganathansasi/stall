"use client";

import { Award, HeartHandshake, Coffee, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./BrandIntro.module.css";

export default function BrandIntro() {
  const principles = [
    {
      icon: <Award size={32} />,
      title: "Quality",
      description: "We source our tea dust, grains, and provisions from top-tier, trusted regional suppliers.",
    },
    {
      icon: <HeartHandshake size={32} />,
      title: "Trust",
      description: "Decades of serving the Jolarpet community with transparent, reliable service.",
    },
    {
      icon: <Coffee size={32} />,
      title: "Taste",
      description: "Our legendary masala and cardamom brews are prepared fresh using heritage recipes.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "Convenience",
      description: "A comprehensive selection of daily maligai goods and quick snacks in one welcoming shop.",
    },
  ];

  return (
    <section id="about" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.introGrid}>
          {/* Left Column: Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={styles.storyContent}
          >
            <span className="title-sub">Our Legacy</span>
            <h2 className={styles.heading}>The Heart of Local Hospitality</h2>
            <p className={styles.highlightText}>
              “A trusted local shop serving quality tea, snacks, groceries, and everyday essentials.”
            </p>
            <p className={styles.bodyText}>
              At Sasi Tea Stall, we believe in simple values: providing our neighbors with the highest standard of products and a welcoming space to start their morning. Whether you stop by for our signature fresh cardamom tea, a quick crispy snack, or to stock up on premium kitchen staples, you receive the same signature hospitality that defines our brand.
            </p>
          </motion.div>

          {/* Right Column: Key Principles Grid */}
          <div className={styles.principlesGrid}>
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.card}
              >
                <div className={styles.iconWrapper}>{p.icon}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDescription}>{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
