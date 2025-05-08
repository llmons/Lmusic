package server

import "github.com/gin-gonic/gin"

func NewHTTPServer(debug bool) *gin.Engine {
	if debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.GET("/healthz", func(ctx *gin.Context) { ctx.String(200, "ok") })

	return r
}
