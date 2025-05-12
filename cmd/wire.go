//go:build wireinject
// +build wireinject

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"github.com/llmons/Lmusic/internal/base/conf"
	"github.com/llmons/Lmusic/internal/base/server"
	"github.com/llmons/Lmusic/internal/controller"
	"github.com/llmons/Lmusic/internal/router"
	"github.com/llmons/Lmusic/internal/service"
)

func initApplication(debug bool, serverConf *conf.Server) (*gin.Engine, error) {
	panic(wire.Build(
		server.ProviderSetServer,
		service.ProviderSetService,
		router.ProviderSetRouter,
		controller.ProviderSetController,
	))
}
