package tencent

type PlaylistResp struct {
	Data PlaylistData `json:"data"`
}

type PlaylistData struct {
	CDlist []CD `json:"cdlist"`
}

type CD struct {
	Songlist []SongData `json:"songlist"`
}
