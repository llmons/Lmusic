package tencent

type SongResp struct{
	Data SongData `json:"data"`
}

type SongData struct {
	Album  Album    `json:"album"`
	Name   string   `json:"name"`
	Singer []Singer `json:"singer"`
	Mid    string   `json:"mid"`
}

type Album struct {
	Mid  string `json:"mid"`
	Name string `json:"name"`
}

type Singer struct {
	Name string `json:"name"`
}
