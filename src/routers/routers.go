package routers

import (
	"errors"

	"github.com/adiet95/react-gorent/go-server/src/databases/orm"
	"github.com/adiet95/react-gorent/go-server/src/modules/v1/auth"
	"github.com/adiet95/react-gorent/go-server/src/modules/v1/histories"
	"github.com/adiet95/react-gorent/go-server/src/modules/v1/users"
	"github.com/adiet95/react-gorent/go-server/src/modules/v1/vehicles"
	"github.com/gorilla/mux"
)

func New() (*mux.Router, error) {
	mainRoute := mux.NewRouter()

	db, err := orm.New()
	if err != nil {
		return nil, errors.New("failed to init database")
	}

	auth.New(mainRoute, db)
	users.New(mainRoute, db)
	vehicles.New(mainRoute, db)
	histories.New(mainRoute, db)

	return mainRoute, nil
}
