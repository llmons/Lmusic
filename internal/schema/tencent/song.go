package tencent

type SongResp struct {
	Data []SongData `json:"data"`
}

type SongData struct {
	Album  Album    `json:"album"`
	Mid    string   `json:"mid"`
	Name   string   `json:"name"`
	Singer []Singer `json:"singer"`
}

type Album struct {
	Mid string `json:"mid"`
}

type Singer struct {
	Name string `json:"name"`
}
