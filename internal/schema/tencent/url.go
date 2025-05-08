package tencent

type UrlResp struct {
	Req_0 Req_0 `json:"req_0"`
}

type Req_0 struct {
	Data UrlData `json:"data"`
}

type UrlData struct {
	Sip        []string     `json:"sip"`
	MidUrlInfo []MidUrlInfo `json:"midurlinfo"`
}

type MidUrlInfo struct {
	Purl string `json:"purl"`
}
