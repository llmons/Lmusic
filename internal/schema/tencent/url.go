package tencent

type UrlResp struct {
	Req0Resp Req0Resp `json:"req_0"`
}

type Req0Resp struct {
	Data UrlData `json:"data"`
}

type UrlData struct {
	Sip        []string     `json:"sip"`
	MidUrlInfo []MidUrlInfo `json:"midurlinfo"`
}

type MidUrlInfo struct {
	Purl string `json:"purl"`
}
