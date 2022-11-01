package auth

import (
	"encoding/json"
	"net/http"

	"github.com/adiet95/react-gorent/go-server/src/databases/orm/models"
	"github.com/adiet95/react-gorent/go-server/src/interfaces"
	"github.com/adiet95/react-gorent/go-server/src/libs"
)

type auth_ctrl struct {
	svc interfaces.AuthService
}

func NewCtrl(s interfaces.AuthService) *auth_ctrl {
	return &auth_ctrl{svc: s}
}

func (c *auth_ctrl) Login(w http.ResponseWriter, r *http.Request) {
	var data models.User
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		libs.GetResponse(err.Error(), 401, true)
		return
	}
	c.svc.Login(&data).Send(w)
}
