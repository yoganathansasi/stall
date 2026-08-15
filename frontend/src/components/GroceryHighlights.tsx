"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./GroceryHighlights.module.css";

interface GroceryItem {
  id: number;
  name: string;
  description: string;
  category: string;
}

const FALLBACK_GROCERIES: GroceryItem[] = [
  { id: 1, name: "Premium Cooking Rice (அரிசி)", description: "High-grade, clean daily cooking rice bags, selected for taste and texture.", category: "staples" },
  { id: 2, name: "Fine White Sugar (சர்க்கரை)", description: "Pure, fine white sugar bags for sweets, tea, and daily kitchen use.", category: "staples" },
  { id: 3, name: "Quality Paruppu & Dals (பருப்பு)", description: "Essential lentils including Toor dal, Urad dal, and Moong dal for healthy cooking.", category: "staples" },
  { id: 4, name: "Wheat Flour Atta (கோடி)", description: "Fresh, finely ground wheat flour bags for soft rotis and chapatis.", category: "staples" },
  { id: 5, name: "Maggi Instant Noodles (மேகி)", description: "Quick, delicious, and convenient Maggi noodle packs, a favorite for kids.", category: "staples" },
  { id: 6, name: "Bathing & Laundry Soaps (சோப்பு)", description: "Leading brands of bathing soaps (Lux, Lifebuoy) and cleaning soaps (Rin) on our shelves.", category: "daily" },
  { id: 7, name: "Daily Fresh Shampoo Sachets (ஷாம்பு)", description: "Convenient single-use sachets of top shampoo brands (Clinic Plus, Chik) for clean hair care.", category: "daily" },
  { id: 8, name: "Packaged Biscuits (பிஸ்கட்)", description: "Popular sweet and salty biscuit brands (Parle-G, Marie Gold) perfect for tea pairings.", category: "daily" }
];

export default function GroceryHighlights() {
  const [items, setItems] = useState<GroceryItem[]>(FALLBACK_GROCERIES);

  useEffect(() => {
    fetch("http://localhost:8080/api/groceries")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => {
        console.log("Using static fallback groceries. (Backend API offline or CORS issues)", err);
      });
  }, []);

  return (
    <section id="groceries" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.introGrid}>
          {/* Left Column: Premium Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.visualContainer}
          >
            <Image
              src="/groceries_hero.jpg"
              alt="Premium Indian groceries and raw spices flatlay"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right Column: Provisions Content */}
          <div className={styles.contentContainer}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="title-sub">Maligai Essentials</span>
              <h2 className={styles.heading}>The SMK Grocery Collection</h2>
              <p className={styles.description}>
                Beyond our brewed beverages, Sasi Maligai Kadai offers a select stock of daily kitchen essentials. We deal in quality ingredients, hand-selected to ensure your household receives authentic flavors and healthy options.
              </p>
            </motion.div>

            {/* List of groceries */}
            <div className={styles.highlightsList}>
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={styles.highlightItem}
                >
                  <Leaf className={styles.bulletPoint} size={18} />
                  <div className={styles.itemText}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
