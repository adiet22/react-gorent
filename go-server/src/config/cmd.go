package config

import (
	"github.com/adiet95/react-gorent/go-server/src/databases/orm"
	"github.com/spf13/cobra"
)

var initCommand = cobra.Command{
	Short: "simple backend for vehicle rental app with golang",
}

func init() {
	initCommand.AddCommand(ServeCmd)
	initCommand.AddCommand(orm.MigrateCmd)
	initCommand.AddCommand(orm.SeedCmd)
}

func Run(args []string) error {
	initCommand.SetArgs(args)

	return initCommand.Execute()
}
