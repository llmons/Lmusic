package netease

type SongResp struct {
	Songs []Song `json:"songs"`
}

type Song struct {
	Name    string   `json:"name"`
	ID      int64    `json:"id"`
	Artists []Artist `json:"ar"`
	Album   Album    `json:"al"`
}

type Artist struct {
	Name string `json:"name"`
}

type Album struct {
	PicUrl string `json:"picUrl"`
}
