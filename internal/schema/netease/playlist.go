package netease

type PlaylistResp struct{}

type Playlist struct {
	TrackIDs []TrackID `json:"trackIds"`
}

type TrackID struct {
	ID int `json:"id"`
}
