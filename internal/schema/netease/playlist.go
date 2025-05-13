package netease

type PlaylistResp struct {
	Playlist Playlist `json:"playlist"`
}

type Playlist struct {
	TrackIDs []TrackID `json:"trackIds"`
}

type TrackID struct {
	ID int `json:"id"`
}
