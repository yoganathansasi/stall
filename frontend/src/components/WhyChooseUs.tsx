"use client";

import { Flame, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: <Flame size={28} />,
      title: "Heritage Recipes",
      description: "Our signature masala and cardamom chais are brewed using traditional, time-tested recipes.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Fresh Sourcing",
      description: "Fresh farm dairy and ground spices are delivered each morning to guarantee quality.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Handpicked Quality",
      description: "We carefully select and inspect every bag of provisions before it reaches our shelves.",
    },
    {
      icon: <Heart size={28} />,
      title: "Community First",
      description: "Proudly serving the Jolarpet neighborhood with friendly, authentic care.",
    },
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="title-sub">Our Commitment</span>
          <h2 className={styles.heading}>Why Choose Sasi Maligai Kadai</h2>
        </div>

        {/* Highlights Grid */}
        <div className={styles.grid}>
          {highlights.map((h, idx) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>{h.icon}</div>
              <h3 className={styles.cardTitle}>{h.title}</h3>
              <p className={styles.cardDesc}>{h.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
