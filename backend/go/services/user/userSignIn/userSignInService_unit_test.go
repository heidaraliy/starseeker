package services_test

import (
	"backend/go/models"
	services "backend/go/services/user/userSignIn"
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"
)

type MockUserRepository struct {
	mock.Mock
}

type MockSessionRepository struct {
	mock.Mock
}

func (m *MockUserRepository) CreateUser(ctx context.Context, user *models.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *MockUserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	args := m.Called(ctx, email)
	return args.Get(0).(*models.User), args.Error(1)
}

func (m *MockSessionRepository) CreateUserSession(ctx context.Context, session *models.Session) error {
	args := m.Called(ctx, session)
	return args.Error(0)
}

func TestUserSignInService_SignIn(t *testing.T) {
	ctx := context.Background()
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("correctpassword"), bcrypt.DefaultCost)

	t.Run("Successful SignIn", func(t *testing.T) {
		mockUserRepo := new(MockUserRepository)
		mockSessionRepo := new(MockSessionRepository)
		service := services.NewUserSignInService(mockUserRepo, mockSessionRepo)
		mockUser := &models.User{
			UserID:         uuid.New(),
			Email:          "valid@example.com",
			HashedPassword: string(hashedPassword),
		}
		mockSession := &models.Session{
			SessionID: uuid.New(),
			UserID:    mockUser.UserID,
			CreatedAt: time.Now(),
			ExpiresAt: time.Now().Add(24 * time.Hour),
		}

		mockUserRepo.On("FindByEmail", ctx, mockUser.Email).Return(mockUser, nil)
		mockSessionRepo.On("CreateUserSession", ctx, mock.AnythingOfType("*models.Session")).Return(nil)

		err := service.SignIn(ctx, mockUser.Email, "correctpassword", "0.0.0.0")
		service.SessionRepo.CreateUserSession(ctx, mockSession)

		mockUserRepo.AssertExpectations(t)
		require.NoError(t, err)
	})

	t.Run("SignIn With Incorrect Password", func(t *testing.T) {
		mockUserRepo := new(MockUserRepository)
		mockSessionRepo := new(MockSessionRepository)
		service := services.NewUserSignInService(mockUserRepo, mockSessionRepo)
		mockUser := &models.User{
			Email:          "valid@example.com",
			HashedPassword: string(hashedPassword),
		}

		mockUserRepo.On("FindByEmail", ctx, mockUser.Email).Return(mockUser, nil)

		err := service.SignIn(ctx, mockUser.Email, "wrongpassword", "0.0.0.0")

		mockUserRepo.AssertExpectations(t)
		require.Error(t, err)
	})

	t.Run("SignIn With Non-existent Email", func(t *testing.T) {
		mockUserRepo := new(MockUserRepository)
		mockSessionRepo := new(MockSessionRepository)
		service := services.NewUserSignInService(mockUserRepo, mockSessionRepo)
		mockUser := &models.User{
			Email: "nonexistent@example.com",
		}

		mockUserRepo.On("FindByEmail", ctx, mockUser.Email).Return(mockUser, nil)

		err := service.SignIn(ctx, mockUser.Email, "nonpass", "0.0.0.0")

		mockUserRepo.AssertExpectations(t)
		require.Error(t, err)
	})
}
