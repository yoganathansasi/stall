"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BeveragesBites.module.css";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
}

const FALLBACK_MENU: MenuItem[] = [
  { id: 1, category: "tea", name: "Single Tea (சிங்கிள் டீ)", description: "Freshly brewed hot milk tea, single serving.", price: 10.00 },
  { id: 2, category: "tea", name: "Cup Tea (கப் டீ)", description: "A large comforting cup of hot milk tea.", price: 20.00 },
  { id: 3, category: "tea", name: "Single Coffee (சிங்கிள் காபி)", description: "South Indian style chicory-coffee milk blend, single serving.", price: 12.00 },
  { id: 4, category: "tea", name: "Full Coffee (புல் காபி)", description: "A full hot cup of South Indian style coffee.", price: 25.00 },
  { id: 5, category: "beverages", name: "Single Boost (சிங்கிள் பூஸ்ட்)", description: "Warm milk mixed with delicious chocolate Boost powder, single serving.", price: 15.00 },
  { id: 6, category: "beverages", name: "Full Boost (புல் பூஸ்ட்)", description: "Full comforting cup of warm chocolate Boost milk.", price: 20.00 },
  { id: 7, category: "beverages", name: "Single Horlicks (சிங்கிள் ஹார்லிக்ஸ்)", description: "Nutritious warm milk blended with Horlicks malt powder, single serving.", price: 15.00 },
  { id: 8, category: "beverages", name: "Full Horlicks (புல் ஹார்லிக்ஸ்)", description: "Full hot cup of nutritious malted Horlicks milk.", price: 20.00 },
  { id: 9, category: "beverages", name: "Sukku Malli Milk (சுக்குமல்லி பால்)", description: "Healthy warm milk infused with dry ginger (sukku) and coriander (malli) seeds.", price: 15.00 },
  { id: 10, category: "tea", name: "Black Tea (பிளாக் டீ)", description: "Strong, hot brewed black tea without milk.", price: 5.00 },
  { id: 11, category: "tea", name: "Black Coffee (பிளாக் காபி)", description: "Fresh, hot brewed black coffee without milk.", price: 5.00 },
  { id: 12, category: "tea", name: "Lemon Tea (லெமன் டீ)", description: "Zesty and refreshing brewed hot tea with fresh lemon squeeze.", price: 10.00 },
  { id: 13, category: "snacks", name: "Soft Tea Buns (3 Pcs)", description: "Freshly baked soft buns, perfect to dip in your tea. Three pieces serving.", price: 10.00 },
  { id: 14, category: "snacks", name: "Crispy Tea Rusks (3 Pcs)", description: "Golden baked crispy rusks, perfect for tea dipping. Three pieces serving.", price: 10.00 },
  { id: 15, category: "snacks", name: "Salt Biscuits (1 Pc)", description: "Light and crunchy salt biscuit, single piece.", price: 2.00 },
  { id: 16, category: "snacks", name: "Spicy Local Mixture", description: "Savory local South Indian mixture containing fried lentils, curry leaves, and spices.", price: 50.00 },
  { id: 17, category: "snacks", name: "Crispy Murukku & Savories", description: "Traditional crunchy fried savory snacks direct from local bakers.", price: 50.00 }
];

export default function BeveragesBites() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(FALLBACK_MENU);
  const [activeTab, setActiveTab] = useState<"all" | "brews" | "bites">("all");

  useEffect(() => {
    // Attempt to load from Go backend
    fetch("http://localhost:8080/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        }
      })
      .catch((err) => {
        console.log("Using static fallback menu. (Backend API offline or CORS issues)", err);
      });
  }, []);

  // Filter items based on active tab
  const filteredItems = menuItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "brews") return item.category === "tea" || item.category === "beverages";
    if (activeTab === "bites") return item.category === "snacks";
    return true;
  });

  return (
    <section id="menu" className={`section ${styles.section}`}>
      <div className="container">
        {/* Section Header */}
        <div className={`text-center ${styles.headerContainer}`}>
          <span className="title-sub">Our Offerings</span>
          <h2 className={styles.heading}>Brewed &amp; Bites Menu</h2>
        </div>

        {/* Filter Tabs */}
        <div className={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab("all")}
            className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab("brews")}
            className={`${styles.tabBtn} ${activeTab === "brews" ? styles.tabBtnActive : ""}`}
          >
            Signature Brews
          </button>
          <button
            onClick={() => setActiveTab("bites")}
            className={`${styles.tabBtn} ${activeTab === "bites" ? styles.tabBtnActive : ""}`}
          >
            Fresh Bites
          </button>
        </div>

        {/* Menu Grid */}
        <motion.div layout className={styles.menuGrid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className={styles.menuItemCard}
              >
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>
                <span className={styles.itemPrice}>₹{Number(item.price).toFixed(2)}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
