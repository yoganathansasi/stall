package service

import (
	"context"
	"errors"
	"net/mail"
	"strings"

	"backend/internal/model"
	"backend/internal/repository"
)

type Service struct {
	repo repository.Repository
}

func NewService(repo repository.Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetMenuItems(ctx context.Context) ([]model.MenuItem, error) {
	return s.repo.GetMenuItems(ctx)
}

func (s *Service) GetGroceryItems(ctx context.Context) ([]model.GroceryItem, error) {
	return s.repo.GetGroceryItems(ctx)
}

func (s *Service) SubmitContact(ctx context.Context, sub *model.ContactSubmission) error {
	sub.Name = strings.TrimSpace(sub.Name)
	sub.Email = strings.TrimSpace(sub.Email)
	sub.Subject = strings.TrimSpace(sub.Subject)
	sub.Message = strings.TrimSpace(sub.Message)

	if sub.Name == "" {
		return errors.New("name is required")
	}
	if sub.Email == "" {
		return errors.New("email is required")
	}
	if _, err := mail.ParseAddress(sub.Email); err != nil {
		return errors.New("invalid email address format")
	}
	if sub.Subject == "" {
		sub.Subject = "No Subject"
	}
	if sub.Message == "" {
		return errors.New("message body is required")
	}
	if len(sub.Message) < 10 {
		return errors.New("message must be at least 10 characters long")
	}

	return s.repo.SaveContactSubmission(ctx, sub)
}

func (s *Service) GetReviews(ctx context.Context) ([]model.Review, error) {
	return s.repo.GetReviews(ctx)
}

func (s *Service) SubmitReview(ctx context.Context, rev *model.Review) error {
	rev.Name = strings.TrimSpace(rev.Name)
	rev.Comment = strings.TrimSpace(rev.Comment)

	if rev.Name == "" {
		return errors.New("name is required")
	}
	if rev.Comment == "" {
		return errors.New("comment text is required")
	}
	if len(rev.Comment) < 5 {
		return errors.New("comment must be at least 5 characters long")
	}
	if rev.Rating < 1 || rev.Rating > 5 {
		return errors.New("rating must be an integer between 1 and 5")
	}

	return s.repo.SaveReview(ctx, rev)
}

func (s *Service) GetShopInfo() model.ShopInfo {
	return model.ShopInfo{
		Name:    "Sasi Tea Stall",
		Address: "Mariyamman Kovil Street, Jolarpet, Edayampatti, Tirupattur District",
		Phone:   "+91 97892 90902",
		Email:   "info@sasimaligaikadai.com",
		OpeningHours: map[string]string{
			"Monday - Saturday": "5:00 AM - 12:00 PM, 3:00 PM - 7:00 PM",
			"Sunday":            "5:00 AM - 10:00 AM, 3:00 PM - 6:00 PM",
		},
		GoogleMaps: "https://share.google/B6y1o3Ym4uiAWQ5XB",
	}
}
