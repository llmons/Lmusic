package router

import (
	"github.com/gin-gonic/gin"
	"github.com/llmons/Lmusic/internal/controller"
)

type APIRouter struct {
	neteaseController *controller.NeteaseController
	tencentController *controller.TencentController
}

func NewAPIRouter(neteaseController *controller.NeteaseController, tencentController *controller.TencentController) *APIRouter {
	return &APIRouter{
		neteaseController: neteaseController,
		tencentController: tencentController,
	}
}

func (a *APIRouter) RegisterRouter(r *gin.RouterGroup) {
	r.GET("/netease/song/:id", a.neteaseController.GetSong)
	r.GET("/netease/playlist/:id", a.neteaseController.GetPlaylist)

	r.GET("/tencent/song/:id", a.tencentController.GetSong)
}
