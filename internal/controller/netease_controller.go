package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/llmons/Lmusic/internal/service"
)

type NeteaseController struct {
	neteaseService *service.NeteaseService
}

func NewNeteaseController(neteaseService *service.NeteaseService) *NeteaseController {
	return &NeteaseController{
		neteaseService: neteaseService,
	}
}

func (n *NeteaseController) GetSong(ctx *gin.Context) {
	id := ctx.Param("id")
	song, err := n.neteaseService.GetSong(id)
	if err != nil {
		return
	}
	ctx.JSON(200, song)
}
