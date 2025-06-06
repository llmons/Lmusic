package server

import (
	"github.com/gin-gonic/gin"
	"github.com/llmons/Lmusic/internal/router"
)

func NewHTTPServer(debug bool, apiRouter *router.APIRouter) *gin.Engine {
	if debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.GET("/healthz", func(ctx *gin.Context) { ctx.String(200, "ok") })

	rootGroup := r.Group("")
	apiRouter.RegisterRouter(rootGroup)

	return r
}
