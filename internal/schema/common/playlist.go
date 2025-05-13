package common

type Playlist []SimpleSong

type SimpleSong struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Artist  string `json:"artist"`
	Picture string `json:"picurl"`
}
