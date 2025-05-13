package tencent

type VkeyParam struct {
	Guid      string   `json:"guid"`
	SongMid   []string `json:"songmid"`
	SongType  []int    `json:"songtype"`
	Uin       string   `json:"uin"`
	LoginFlag int      `json:"loginflag"`
	Platform  string   `json:"platform"`
}

type Req0Req struct {
	Module string    `json:"module"`
	Method string    `json:"method"`
	Param  VkeyParam `json:"param"`
}

type Comm struct {
	Uin    string `json:"uin"`
	Format string `json:"format"`
	Ct     int    `json:"ct"`
	Cv     int    `json:"cv"`
	AuthSt string `json:"authst"`
}

type RequestPayload struct {
	Req0Req Req0Req `json:"req_0"`
	Comm    Comm    `json:"comm"`
}
