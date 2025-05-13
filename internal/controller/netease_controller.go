package controller

import (
	"net/http"

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

func (nc *NeteaseController) GetSong(ctx *gin.Context) {
	id := ctx.Param("id")
	song, err := nc.neteaseService.GetSong(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, song)
}
