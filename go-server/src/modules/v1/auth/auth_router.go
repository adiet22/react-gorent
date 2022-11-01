package auth

import (
	"github.com/adiet95/react-gorent/go-server/src/modules/v1/users"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func New(rt *mux.Router, db *gorm.DB) {
	route := rt.PathPrefix("/api/v1/auth").Subrouter()

	repo := users.NewRepo(db)
	svc := NewService(repo)
	ctrl := NewCtrl(svc)

	route.HandleFunc("", ctrl.Login).Methods("POST")
}
