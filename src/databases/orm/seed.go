package orm

import (
	"log"

	"github.com/adiet95/react-gorent/go-server/src/databases/orm/models"
	"github.com/adiet95/react-gorent/go-server/src/libs"
	"github.com/spf13/cobra"
)

var SeedCmd = &cobra.Command{
	Use:   "seed",
	Short: "start seeding",
	RunE:  seeder,
}

func seeder(cmd *cobra.Command, args []string) error {
	db, err := New()
	if err != nil {
		return err
	}
	admin, _ := libs.HashPassword("admin12345678")
	user, _ := libs.HashPassword("user12345678")

	var datas = []models.User{
		{Email: "admin", Password: admin, Role: "admin", Username: "admin"},
		{Email: "user", Password: user, Role: "user", Username: "user"},
	}

	if res := db.Create(&datas); res.Error != nil {
		return res.Error
	}
	log.Println("Seeding successful")
	return nil
}
