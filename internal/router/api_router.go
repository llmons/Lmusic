package router

import (
	"github.com/gin-gonic/gin"
	"github.com/llmons/Lmusic/internal/controller"
)

type APIRouter struct {
	NeteaseController *controller.NeteaseController
}

func NewAPIRouter(neteaseController *controller.NeteaseController) *APIRouter {
	return &APIRouter{
		NeteaseController: neteaseController,
	}
}

func (a *APIRouter) RegisterRouter(r *gin.RouterGroup) {
	r.GET("/netease/song/:id", a.NeteaseController.GetSong)
}
