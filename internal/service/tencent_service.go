package service

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"net/url"
	"time"

	"github.com/llmons/Lmusic/internal/schema/common"
	"github.com/llmons/Lmusic/internal/schema/tencent"
)

type TencentService struct{}

func NewTencentService() *TencentService {
	return &TencentService{}
}

func (s *TencentService) GetSong(id string) (song common.Song, err error) {
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

func (s *TencentService) GetPlaylist(id string) (playlist common.Playlist, err error) {
	endpoint := "https://c.y.qq.com/v8/fcg-bin/fcg_v8_playlist_cp.fcg"

	// new request
	params := url.Values{}
	params.Set("id", id)
	params.Set("format", "json")
	params.Set("newsong", "1")
	params.Set("platform", "jqspaframe.json")
	req, err := http.NewRequest("GET", fmt.Sprintf("%s?%s", endpoint, params.Encode()), nil)
	if err != nil {
		return
	}

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
	var result tencent.PlaylistResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	playlist = make(common.Playlist, len(result.Data.CDlist[0].Songlist))
	for i, song := range result.Data.CDlist[0].Songlist {
		playlist[i].ID = song.Mid
		playlist[i].Name = song.Name
		playlist[i].Artist = song.Singer[0].Name
		playlist[i].Picture = fmt.Sprintf("https://y.gtimg.cn/music/photo_new/T002R300x300M000%s.jpg", song.Album.Mid)
	}
	return
}

func (s *TencentService) getSongInfo(id string) (name string, artist string, picurl string, err error) {
	endpoint := "https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg"

	// new request
	params := url.Values{}
	params.Set("songmid", id)
	params.Set("platform", "yqq")
	params.Set("format", "json")
	req, err := http.NewRequest("GET", fmt.Sprintf("%s?%s", endpoint, params.Encode()), nil)
	if err != nil {
		return
	}

	fmt.Println(req)

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
	var result tencent.SongResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	name = result.Data[0].Name
	artist = result.Data[0].Singer[0].Name
	picurl = fmt.Sprintf("https://y.gtimg.cn/music/photo_new/T002R300x300M000%s.jpg", result.Data[0].Album.Mid)
	return
}

func (s *TencentService) getSongUrl(id string) (urlString string, err error) {
	endpoint := "https://u.y.qq.com/cgi-bin/musicu.fcg"

	// prepare parameters
	params := url.Values{}
	params.Set("-", "getplaysongkey")
	params.Set("g_tk", "5831")
	params.Set("loginUin", "0")
	params.Set("hostUin", "0")
	params.Set("format", "json")
	params.Set("inCharset", "utf8")
	params.Set("outCharset", "utf8")
	params.Set("platform", "yqq")

	guid := fmt.Sprintf("%d", rand.Intn(10000000))
	payload := tencent.RequestPayload{
		Req0Req: tencent.Req0Req{
			Module: "vkey.GetVkeyServer",
			Method: "CgiGetVkey",
			Param: tencent.VkeyParam{
				Guid:    guid,
				SongMid: []string{id},
				// SongMid:   []string{"003Cr4vm3reYw7"},
				SongType:  []int{0},
				Uin:       "",
				LoginFlag: 1,
				Platform:  "20",
			},
		},
		Comm: tencent.Comm{
			Uin:    "",
			Format: "json",
			Ct:     19,
			Cv:     0,
			AuthSt: "",
		},
	}
	jsonBytes, err := json.Marshal(payload)
	if err != nil {
		return
	}
	params.Set("data", string(jsonBytes))

	// new request
	req, err := http.NewRequest("GET", fmt.Sprintf("%s?%s", endpoint, params.Encode()), nil)
	if err != nil {
		return
	}

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
	var result tencent.UrlResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	urlString = fmt.Sprintf("%s%s", result.Req0Resp.Data.Sip[0], result.Req0Resp.Data.MidUrlInfo[0].Purl)
	return
}

func (s *TencentService) getLyric(id string) (lyric string, err error) {
	endpoint := "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg"

	// new request
	params := url.Values{}
	params.Set("songmid", id)
	milliseconds := time.Now().UnixNano() / int64(time.Millisecond)
	params.Set("pcachetime", fmt.Sprintf("%d", milliseconds))
	params.Set("g_tk", "5381")
	params.Set("loginUin", "0")
	params.Set("hostUin", "0")
	params.Set("inCharset", "utf8")
	params.Set("outCharset", "utf8")
	params.Set("notice", "0")
	params.Set("platform", "yqq")
	params.Set("needNewCode", "0")
	params.Set("format", "json")

	req, err := http.NewRequest("GET", fmt.Sprintf("%s?%s", endpoint, params.Encode()), nil)
	if err != nil {
		return
	}

	req.Header.Set("Referer", "https://y.qq.com")

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
	var result tencent.LyricResp
	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	lyricBytes, err := base64.StdEncoding.DecodeString(result.Lyric)
	if err != nil {
		return
	}
	lyric = string(lyricBytes)
	return
}
