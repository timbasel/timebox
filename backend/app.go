package backend

import (
	"context"

	"github.com/timbasel/go-log/pkg/log"
)

const Title = "Timebox"

type App struct {
	ctx   context.Context
	state *State
}

func NewApp() *App {
	app := &App{
		state: LoadState(),
	}
	return app
}

func (app *App) OnStartup(ctx context.Context) {
	app.ctx = ctx
}

func (app *App) OnDomReady(ctx context.Context) {
	SetWindowState(app.ctx, app.state.Window)
}

func (app *App) OnBeforeClose(ctx context.Context) bool {
	app.state.Window = GetWindowState(app.ctx)
	err := app.state.Save()
	if err != nil {
		log.Error(err.Error())
	}
	return false
}

func (app *App) OnShutdown(ctx context.Context) {}

func (app *App) OnResize() {
	app.state.Window = GetWindowState(app.ctx)
	err := app.state.Save()
	if err != nil {
		log.Error(err.Error())
	}
}
