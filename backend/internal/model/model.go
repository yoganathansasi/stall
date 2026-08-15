package model

import "time"

type MenuItem struct {
	ID          int       `json:"id"`
	Category    string    `json:"category"` // 'tea', 'beverages', 'snacks'
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	IsAvailable bool      `json:"is_available"`
	CreatedAt   time.Time `json:"created_at"`
}

type GroceryItem struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Category    string    `json:"category"` // 'spices', 'staples', 'beverages', 'daily'
	IsFeatured  bool      `json:"is_featured"`
	CreatedAt   time.Time `json:"created_at"`
}

type ContactSubmission struct {
	ID        int       `json:"id,omitempty"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Subject   string    `json:"subject"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type Review struct {
	ID        int       `json:"id,omitempty"`
	Name      string    `json:"name"`
	Rating    int       `json:"rating"`
	Comment   string    `json:"comment"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type ShopInfo struct {
	Name         string            `json:"name"`
	Address      string            `json:"address"`
	Phone        string            `json:"phone"`
	Email        string            `json:"email"`
	OpeningHours map[string]string `json:"opening_hours"`
	GoogleMaps   string            `json:"google_maps"`
}
