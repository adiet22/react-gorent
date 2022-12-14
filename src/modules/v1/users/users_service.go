package users

import (
	"github.com/adiet95/react-gorent/go-server/src/databases/orm/models"
	"github.com/adiet95/react-gorent/go-server/src/interfaces"
	"github.com/adiet95/react-gorent/go-server/src/libs"
)

type user_service struct {
	repo interfaces.UserRepo
}

func NewService(repo interfaces.UserRepo) *user_service {
	return &user_service{repo}
}

func (s *user_service) GetAllUsers() *libs.Response {
	data, err := s.repo.GetAllUsers()
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}
	return libs.GetResponse(data, 200, false)
}

func (s *user_service) FindByUsername(username string) *libs.Response {
	data, err := s.repo.FindByUsername(username)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}
	return libs.GetResponse(data, 200, false)
}

func (s *user_service) AddUser(data *models.User) *libs.Response {
	if checkUsername := s.repo.CheckUsername(data.Username); checkUsername {
		return libs.GetResponse("username is already registered", 400, true)
	}
	if checkEmail := s.repo.CheckEmail(data.Email); checkEmail {
		return libs.GetResponse("email is already registered", 400, true)
	}

	hashPassword, err := libs.HashPassword(data.Password)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}

	data.Password = hashPassword
	result, err := s.repo.AddUser(data)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}

	return libs.GetResponse(result, 200, false)
}

func (s *user_service) UpdateUser(data *models.User, username string) *libs.Response {
	if checkUsername := s.repo.CheckUsername(username); !checkUsername {
		return libs.GetResponse("username not found", 404, true)
	}
	hashPassword, err := libs.HashPassword(data.Password)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}

	data.Password = hashPassword
	result, err := s.repo.UpdateUser(data, username)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}
	return libs.GetResponse(result, 200, false)
}

func (s *user_service) DeleteUser(data *models.User, username string) *libs.Response {
	if checkUsername := s.repo.CheckUsername(username); !checkUsername {
		return libs.GetResponse("username not found", 404, true)
	}
	data, err := s.repo.DeleteUser(data, username)
	if err != nil {
		return libs.GetResponse(err.Error(), 400, true)
	}
	return libs.GetResponse(data, 200, false)
}
