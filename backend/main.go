package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/timbasel/timebox/utils"
	v1 "github.com/timbasel/timebox/v1"

	_ "github.com/timbasel/timebox/migrations"
)

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: "./data",
	})

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		group := e.Router.Group("/v1")
		group.Use(utils.LogErrors)
		v1.Bind(app, group)
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
