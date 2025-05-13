package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/llmons/Lmusic/internal/service"
)

type TencentController struct {
	tencentService *service.TencentService
}

func NewTencentController(tencentService *service.TencentService) *TencentController {
	return &TencentController{
		tencentService: tencentService,
	}
}

func (tc *TencentController) GetSong(ctx *gin.Context) {
	id := ctx.Param("id")
	song, err := tc.tencentService.GetSong(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, song)
}

func (tc *TencentController) GetPlaylist(ctx *gin.Context) {
	id := ctx.Param("id")
	playlist, err := tc.tencentService.GetPlaylist(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, playlist)
}
