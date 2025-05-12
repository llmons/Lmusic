package service

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/llmons/Lmusic/internal/schema/common"
	"github.com/llmons/Lmusic/internal/schema/netease"
)

type NeteaseService struct{}

func NewNeteaseService() *NeteaseService {
	return &NeteaseService{}
}

func (s *NeteaseService) GetSong(id string) (song common.Song, err error) {
	endpoint := "http://music.163.com/api/v3/song/detail/"

	form := url.Values{}
	form.Set("c", `[{"id":25638273,"v":0}]`)

	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		panic(err)
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return
	}

	var result netease.SongResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	song.Name = result.Songs[0].Name
	song.Artist = result.Songs[0].Artists[0].Name

	return
}
