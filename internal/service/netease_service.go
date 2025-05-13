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
	idArr := []string{id}
	names, artists, picUrls, err := s.getSongInfo(idArr)
	if err != nil {
		return
	}

	song.Name, song.Artist, song.Picture = names[0], artists[0], picUrls[0]

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

func (s *NeteaseService) GetPlaylist(id string) (playlist common.Playlist, err error) {
	endpoint := "http://music.163.com/api/v6/playlist/detail"

	// new request with body
	form := url.Values{}
	form.Set("s", "0")
	form.Set("id", id)
	form.Set("n", "1000")
	form.Set("t", "0")
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
	var result netease.PlaylistResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	idArr := make([]string, len(result.Playlist.TrackIDs))
	playlist = make(common.Playlist, len(result.Playlist.TrackIDs))
	for i, song := range result.Playlist.TrackIDs {
		idArr[i] = fmt.Sprintf("%d", song.ID)
		playlist[i].ID = fmt.Sprintf("%d", song.ID)
	}

	names, artists, picUrls, err := s.getSongInfo(idArr)
	if err != nil {
		return
	}

	for i := range result.Playlist.TrackIDs {
		playlist[i].Name = names[i]
		playlist[i].Artist = artists[i]
		playlist[i].Picture = picUrls[i]
	}

	return
}

func (s *NeteaseService) getSongInfo(idArr []string) (names []string, artists []string, picUrls []string, err error) {
	endpoint := "http://music.163.com/api/v3/song/detail/"

	// new request with body
	var songList strings.Builder
	songList.WriteString("[")
	for i, id := range idArr {
		songList.WriteString(fmt.Sprintf("{id:%s,v:0}", id))
		if i < len(idArr)-1 {
			songList.WriteString(",")
		}
	}
	songList.WriteString("]")

	form := url.Values{}
	form.Set("c", songList.String())
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

	for _, song := range result.Songs {
		names = append(names, song.Name)
		artists = append(artists, song.Artists[0].Name)
		picUrls = append(picUrls, song.Album.PicUrl)
	}
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
