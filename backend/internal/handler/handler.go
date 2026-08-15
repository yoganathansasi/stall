package handler

import (
	"encoding/json"
	"net/http"

	"backend/internal/model"
	"backend/internal/service"
)

type Handler struct {
	svc         *service.Service
	allowedCORS string
}

func NewHandler(svc *service.Service, allowedCORS string) *Handler {
	return &Handler{
		svc:         svc,
		allowedCORS: allowedCORS,
	}
}

// Enable CORS middleware
func (h *Handler) enableCORS(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", h.allowedCORS)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}

func (h *Handler) GetMenu(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodGet {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	items, err := h.svc.GetMenuItems(r.Context())
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to retrieve menu items: "+err.Error())
		return
	}

	h.respondWithJSON(w, http.StatusOK, items)
}

func (h *Handler) GetGroceries(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodGet {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	items, err := h.svc.GetGroceryItems(r.Context())
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to retrieve grocery items: "+err.Error())
		return
	}

	h.respondWithJSON(w, http.StatusOK, items)
}

func (h *Handler) GetInfo(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodGet {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	info := h.svc.GetShopInfo()
	h.respondWithJSON(w, http.StatusOK, info)
}

func (h *Handler) SubmitContact(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodPost {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	var sub model.ContactSubmission
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if err := h.svc.SubmitContact(r.Context(), &sub); err != nil {
		h.respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	h.respondWithJSON(w, http.StatusCreated, map[string]interface{}{
		"success": true,
		"message": "Thank you! Your message has been received.",
		"data":    sub,
	})
}

func (h *Handler) GetReviews(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodGet {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	reviews, err := h.svc.GetReviews(r.Context())
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to retrieve customer reviews: "+err.Error())
		return
	}

	h.respondWithJSON(w, http.StatusOK, reviews)
}

func (h *Handler) SubmitReview(w http.ResponseWriter, r *http.Request) {
	if h.enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodPost {
		h.respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	var rev model.Review
	if err := json.NewDecoder(r.Body).Decode(&rev); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if err := h.svc.SubmitReview(r.Context(), &rev); err != nil {
		h.respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	h.respondWithJSON(w, http.StatusCreated, map[string]interface{}{
		"success": true,
		"message": "Thank you for your review!",
		"data":    rev,
	})
}

func (h *Handler) respondWithError(w http.ResponseWriter, code int, message string) {
	h.respondWithJSON(w, code, map[string]string{"error": message})
}

func (h *Handler) respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error":"failed to marshal response"}`))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
