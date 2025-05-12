package service

import (
	"encoding/json"
	"fmt"
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
	song.Name, song.Artist, song.Picture, err = s.getSongInfo(id)
	if err != nil {
		return
	}

	song.Url, err = s.getSongUrl(id)
	if err != nil {
		return
	}

	song.Lyric, err = s.getLyric(id)
	if err != nil {
		return
	}

	return
}

func (s *NeteaseService) getSongInfo(id string) (name string, artist string, picurl string, err error) {
	endpoint := "http://music.163.com/api/v3/song/detail/"

	// new request with body
	form := url.Values{}
	form.Set("c", fmt.Sprintf(`[{"id":%s,"v":0}]`, id))
	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		return
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	// handle response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return
	}
	var result netease.SongResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	name = result.Songs[0].Name
	artist = result.Songs[0].Artists[0].Name
	picurl = result.Songs[0].Album.PicUrl
	return
}

func (s *NeteaseService) getSongUrl(id string) (urlString string, err error) {
	endpoint := "http://music.163.com/api/song/enhance/player/url"

	// new request with body
	form := url.Values{}
	form.Set("ids", fmt.Sprintf(`[%s]`, id))
	form.Set("br", "320000")
	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		return
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	// handle response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return
	}
	var result netease.UrlResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	urlString = result.Data[0].Url
	return
}

func (s *NeteaseService) getLyric(id string) (lyric string, err error) {
	endpoint := "http://music.163.com/api/song/lyric"

	// new request with body
	form := url.Values{}
	form.Set("id", id)
	form.Set("os", "linux")
	form.Set("tv", "-1")
	form.Set("kv", "-1")
	form.Set("lv", "-1")
	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		return
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	// handle response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return
	}
	var result netease.LyricResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	lyric = result.Lyric.Lyric
	return
}
