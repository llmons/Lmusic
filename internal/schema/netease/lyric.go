package netease

type LyricResp struct {
	Lyric Lyric `json:"lrc"`
}

type Lyric struct {
	Lyric string `json:"lyric"`
}
