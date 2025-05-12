package common

type Song struct {
	Name    string `json:"name"`
	Artist  string `json:"artist"`
	Url     string `json:"url"`
	Picture string `json:"pic"`
	Lyric   string `json:"lrc"`
}
