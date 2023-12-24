package services_test

import (
	"backend/go/models"
	"backend/go/repositories"
	services "backend/go/services/user/userSignUp"
	"context"
	"log"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

type MockUserRepository struct {
	mock.Mock
}

// CreateUserSession implements repositories.IUserRepository.
func (*MockUserRepository) CreateUserSession(ctx context.Context, userId uuid.UUID, ipAddress string) error {
	panic("unimplemented")
}

func (m *MockUserRepository) CreateUser(ctx context.Context, user *models.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *MockUserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	args := m.Called(ctx, email)
	return args.Get(0).(*models.User), args.Error(1)
}

func TestUserSignUpService_SignUp(t *testing.T) {
	log.Println("Initiating userSignUpService unit test context and mock objects...")
	ctx := context.Background()
	expectedUUID := uuid.New()

	t.Run("New User Signup", func(t *testing.T) {
		mockRepo := new(MockUserRepository)
		service := services.NewUserSignUpService(mockRepo)
		mockUser := &models.User{
			Email:    "newuser@example.com",
			Password: "securepassword!",
		}

		mockRepo.On("FindByEmail", ctx, mockUser.Email).Return(mockUser, nil)
		mockRepo.On("CreateUser", ctx, mock.AnythingOfType("*models.User")).Return(nil)

		err := service.SignUp(ctx, mockUser)

		mockRepo.AssertExpectations(t)
		require.NoError(t, err)
	})

	t.Run("Duplicate Email", func(t *testing.T) {
		mockRepo := new(MockUserRepository)
		service := services.NewUserSignUpService(mockRepo)
		existingUser := &models.User{
			Email:    "existing@example.com",
			Password: "password",
			Status:   "VERIFIED_ACTIVE",
		}

		// Set expectations
		mockRepo.On("FindByEmail", ctx, existingUser.Email).Return(existingUser, nil)

		// Test
		err := service.SignUp(ctx, existingUser)

		// Assert
		mockRepo.AssertExpectations(t)
		require.Error(t, err)
		require.Equal(t, repositories.ErrEmailInUse, err)
	})

	t.Run("Re-Register Deleted Account", func(t *testing.T) {
		mockRepo := new(MockUserRepository)
		service := services.NewUserSignUpService(mockRepo)
		deletedUser := &models.User{
			Email:  "deleted@example.com",
			UserID: expectedUUID,
			Status: "DELETED",
		}

		newUser := &models.User{
			Email:    "deleted@example.com",
			Password: "newsecurepassword!",
		}

		mockRepo.On("FindByEmail", ctx, deletedUser.Email).Return(deletedUser, nil)
		mockRepo.On("CreateUser", ctx, newUser).Return(nil)

		err := service.SignUp(ctx, newUser)

		mockRepo.AssertExpectations(t)
		require.NoError(t, err)
		require.Equal(t, expectedUUID, *newUser.PreviousUserID)
	})

	t.Run("Password Too Short", func(t *testing.T) {
		mockRepo := new(MockUserRepository)
		service := services.NewUserSignUpService(mockRepo)
		newUser := &models.User{
			Email:    "newuser@example.com",
			Password: "badpass",
			Status:   "VERIFIED_ACTIVE",
		}

		err := service.SignUp(ctx, newUser)

		mockRepo.AssertExpectations(t)
		require.Error(t, err)
		require.Equal(t, repositories.ErrPasswordTooShort, err)
	})
}
