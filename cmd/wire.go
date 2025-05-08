//go:build wireinject
// +build wireinject

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"github.com/llmons/Lmusic/internal/base/conf"
	"github.com/llmons/Lmusic/internal/base/server"
)

func initApplication(debug bool, serverConf *conf.Server) (*gin.Engine, error) {
	panic(wire.Build(
		server.ProviderSetServer,
	))
}
