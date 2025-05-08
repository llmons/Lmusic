package netease

type UrlResp struct {
	Data []Data `json:"data"`
}

type Data struct {
	Url string `json:"url"`
}
