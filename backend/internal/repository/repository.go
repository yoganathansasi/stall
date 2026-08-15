package repository

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"sync"
	"time"

	"backend/internal/model"

	_ "github.com/jackc/pgx/v5/stdlib" // SQL driver wrapper for pgx
)

type Repository interface {
	GetMenuItems(ctx context.Context) ([]model.MenuItem, error)
	GetGroceryItems(ctx context.Context) ([]model.GroceryItem, error)
	SaveContactSubmission(ctx context.Context, submission *model.ContactSubmission) error
	GetReviews(ctx context.Context) ([]model.Review, error)
	SaveReview(ctx context.Context, review *model.Review) error
}

// PostgresRepository implements Repository using PostgreSQL
type PostgresRepository struct {
	db *sql.DB
}

func NewPostgresRepository(databaseURL string) (*PostgresRepository, error) {
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, err
	}

	// Test the connection
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	
	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return nil, err
	}

	return &PostgresRepository{db: db}, nil
}

func (r *PostgresRepository) Close() error {
	if r.db != nil {
		return r.db.Close()
	}
	return nil
}

func (r *PostgresRepository) GetMenuItems(ctx context.Context) ([]model.MenuItem, error) {
	query := `SELECT id, category, name, description, price, is_available, created_at 
	          FROM menu_items 
	          WHERE is_available = TRUE 
	          ORDER BY category, name`
	
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []model.MenuItem
	for rows.Next() {
		var item model.MenuItem
		var desc sql.NullString
		err := rows.Scan(
			&item.ID,
			&item.Category,
			&item.Name,
			&desc,
			&item.Price,
			&item.IsAvailable,
			&item.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		item.Description = desc.String
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *PostgresRepository) GetGroceryItems(ctx context.Context) ([]model.GroceryItem, error) {
	query := `SELECT id, name, description, category, is_featured, created_at 
	          FROM grocery_highlights 
	          WHERE is_featured = TRUE 
	          ORDER BY category, name`
	
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []model.GroceryItem
	for rows.Next() {
		var item model.GroceryItem
		var desc sql.NullString
		err := rows.Scan(
			&item.ID,
			&item.Name,
			&desc,
			&item.Category,
			&item.IsFeatured,
			&item.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		item.Description = desc.String
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *PostgresRepository) SaveContactSubmission(ctx context.Context, s *model.ContactSubmission) error {
	query := `INSERT INTO contact_submissions (name, email, subject, message, created_at) 
	          VALUES ($1, $2, $3, $4, $5) 
	          RETURNING id`
	
	now := time.Now()
	err := r.db.QueryRowContext(ctx, query, s.Name, s.Email, s.Subject, s.Message, now).Scan(&s.ID)
	if err != nil {
		return err
	}
	s.CreatedAt = now
	return nil
}

func (r *PostgresRepository) GetReviews(ctx context.Context) ([]model.Review, error) {
	query := `SELECT id, name, rating, comment, created_at 
	          FROM customer_reviews 
	          ORDER BY created_at DESC`
	
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []model.Review
	for rows.Next() {
		var rev model.Review
		err := rows.Scan(
			&rev.ID,
			&rev.Name,
			&rev.Rating,
			&rev.Comment,
			&rev.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, rev)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reviews, nil
}

func (r *PostgresRepository) SaveReview(ctx context.Context, s *model.Review) error {
	query := `INSERT INTO customer_reviews (name, rating, comment, created_at) 
	          VALUES ($1, $2, $3, $4) 
	          RETURNING id`
	
	now := time.Now()
	err := r.db.QueryRowContext(ctx, query, s.Name, s.Rating, s.Comment, now).Scan(&s.ID)
	if err != nil {
		return err
	}
	s.CreatedAt = now
	return nil
}

// InMemoryRepository implements Repository using local memory (fallback)
type InMemoryRepository struct {
	mu           sync.RWMutex
	menuItems    []model.MenuItem
	groceryItems []model.GroceryItem
	submissions  []model.ContactSubmission
	reviews      []model.Review
	subIDCounter int
	revIDCounter int
}

func NewInMemoryRepository() *InMemoryRepository {
	log.Println("[Warning] Initializing in-memory fallback repository. No PostgreSQL connected.")
	
	repo := &InMemoryRepository{
		subIDCounter: 1,
		revIDCounter: 1,
	}

	// Seed in-memory data matching photos
	repo.menuItems = []model.MenuItem{
		{ID: 1, Category: "tea", Name: "Single Tea (சிங்கிள் டீ)", Description: "Freshly brewed hot milk tea, single serving.", Price: 10.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 2, Category: "tea", Name: "Cup Tea (கப் டீ)", Description: "A large comforting cup of hot milk tea.", Price: 20.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 3, Category: "tea", Name: "Single Coffee (சிங்கிள் காபி)", Description: "South Indian style chicory-coffee milk blend, single serving.", Price: 12.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 4, Category: "tea", Name: "Full Coffee (புல் காபி)", Description: "A full hot cup of South Indian style coffee.", Price: 25.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 5, Category: "beverages", Name: "Single Boost (சிங்கிள் பூஸ்ட்)", Description: "Warm milk mixed with delicious chocolate Boost powder, single serving.", Price: 15.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 6, Category: "beverages", Name: "Full Boost (புல் பூஸ்ட்)", Description: "Full comforting cup of warm chocolate Boost milk.", Price: 20.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 7, Category: "beverages", Name: "Single Horlicks (சிங்கிள் ஹார்லிக்ஸ்)", Description: "Nutritious warm milk blended with Horlicks malt powder, single serving.", Price: 15.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 8, Category: "beverages", Name: "Full Horlicks (புல் ஹார்லிக்ஸ்)", Description: "Full hot cup of nutritious malted Horlicks milk.", Price: 20.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 9, Category: "beverages", Name: "Sukku Malli Milk (சுக்குமல்லி பால்)", Description: "Healthy warm milk infused with dry ginger (sukku) and coriander (malli) seeds.", Price: 15.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 10, Category: "tea", Name: "Black Tea (பிளாக் டீ)", Description: "Strong, hot brewed black tea without milk.", Price: 5.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 11, Category: "tea", Name: "Black Coffee (பிளாக் காபி)", Description: "Fresh, hot brewed black coffee without milk.", Price: 5.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 12, Category: "tea", Name: "Lemon Tea (லெமன் டீ)", Description: "Zesty and refreshing brewed hot tea with fresh lemon squeeze.", Price: 10.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 13, Category: "snacks", Name: "Soft Tea Buns (3 Pcs)", Description: "Freshly baked soft buns, perfect to dip in your tea. Three pieces serving.", Price: 10.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 14, Category: "snacks", Name: "Crispy Tea Rusks (3 Pcs)", Description: "Golden baked crispy rusks, perfect for tea dipping. Three pieces serving.", Price: 10.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 15, Category: "snacks", Name: "Salt Biscuits (1 Pc)", Description: "Light and crunchy salt biscuit, single piece.", Price: 2.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 16, Category: "snacks", Name: "Spicy Local Mixture", Description: "Savory local South Indian mixture containing fried lentils, curry leaves, and spices.", Price: 50.00, IsAvailable: true, CreatedAt: time.Now()},
		{ID: 17, Category: "snacks", Name: "Crispy Murukku & Savories", Description: "Traditional crunchy fried savory snacks direct from local bakers.", Price: 50.00, IsAvailable: true, CreatedAt: time.Now()},
	}

	repo.groceryItems = []model.GroceryItem{
		{ID: 1, Name: "Premium Cooking Rice (அரிசி)", Description: "High-grade, clean daily cooking rice bags, selected for taste and texture.", Category: "staples", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 2, Name: "Fine White Sugar (சர்க்கரை)", Description: "Pure, fine white sugar bags for sweets, tea, and daily kitchen use.", Category: "staples", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 3, Name: "Quality Paruppu & Dals (பருப்பு)", Description: "Essential lentils including Toor dal, Urad dal, and Moong dal for healthy cooking.", Category: "staples", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 4, Name: "Wheat Flour Atta (கோதுமை மாவு)", Description: "Fresh, finely ground wheat flour bags for soft rotis and chapatis.", Category: "staples", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 5, Name: "Maggi Instant Noodles (மேகி)", Description: "Quick, delicious, and convenient Maggi noodle packs, a favorite for kids.", Category: "staples", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 6, Name: "Bathing & Laundry Soaps (சோப்பு)", Description: "Leading brands of bathing soaps (Lux, Lifebuoy) and cleaning soaps (Rin) on our shelves.", Category: "daily", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 7, Name: "Daily Fresh Shampoo Sachets (ஷாம்பு)", Description: "Convenient single-use sachets of top shampoo brands (Clinic Plus, Chik) for clean hair care.", Category: "daily", IsFeatured: true, CreatedAt: time.Now()},
		{ID: 8, Name: "Packaged Biscuits (பிஸ்கட்)", Description: "Popular sweet and salty biscuit brands (Parle-G, Marie Gold) perfect for tea pairings.", Category: "daily", IsFeatured: true, CreatedAt: time.Now()},
	}

	repo.reviews = []model.Review{
		{ID: 1, Name: "Karthikeyan", Rating: 5, Comment: "My morning starts at Sasi tea shop. Their hot cup tea and soft tea buns (3 for ₹10) are the perfect combination. I also buy tea rusks and salt biscuits for my home.", CreatedAt: time.Now().Add(-24 * time.Hour)},
		{ID: 2, Name: "Selvaraj", Rating: 5, Comment: "Very convenient super market provisions. We get high quality rice, sugar, and paruppu here. The bathing soaps and daily shampoo sachets are always stocked.", CreatedAt: time.Now().Add(-48 * time.Hour)},
		{ID: 3, Name: "Meenakshi", Rating: 5, Comment: "Best shop in Jolarpet! My kids love their Maggi packets and sweet biscuits, and the spicy mixture and crispy murukkus (₹50) are excellent evening snacks.", CreatedAt: time.Now().Add(-72 * time.Hour)},
		{ID: 4, Name: "Anbarasan", Rating: 4, Comment: "The single coffee and Boost here have an authentic taste. Friendly service and quick shopping for daily wheat flour atta and household essentials.", CreatedAt: time.Now().Add(-96 * time.Hour)},
	}

	return repo
}

func (r *InMemoryRepository) GetMenuItems(ctx context.Context) ([]model.MenuItem, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.menuItems, nil
}

func (r *InMemoryRepository) GetGroceryItems(ctx context.Context) ([]model.GroceryItem, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.groceryItems, nil
}

func (r *InMemoryRepository) SaveContactSubmission(ctx context.Context, s *model.ContactSubmission) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	
	if s.Name == "" || s.Email == "" || s.Message == "" {
		return errors.New("missing required contact submission fields")
	}

	s.ID = r.subIDCounter
	r.subIDCounter++
	s.CreatedAt = time.Now()
	
	r.submissions = append(r.submissions, *s)
	log.Printf("[Contact] Saved message from %s (%s): %q\n", s.Name, s.Email, s.Subject)
	
	return nil
}

func (r *InMemoryRepository) GetReviews(ctx context.Context) ([]model.Review, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.reviews, nil
}

func (r *InMemoryRepository) SaveReview(ctx context.Context, s *model.Review) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if s.Name == "" || s.Comment == "" || s.Rating < 1 || s.Rating > 5 {
		return errors.New("invalid review fields")
	}

	s.ID = r.revIDCounter
	r.revIDCounter++
	s.CreatedAt = time.Now()

	r.reviews = append([]model.Review{*s}, r.reviews...)
	log.Printf("[Review] Saved %d-star review from %s: %q\n", s.Rating, s.Name, s.Comment)

	return nil
}
