package interfaces

import (
	"github.com/adiet95/react-gorent/go-server/src/databases/orm/models"
	"github.com/adiet95/react-gorent/go-server/src/libs"
)

type AuthService interface {
	Login(data *models.User) *libs.Response
}
