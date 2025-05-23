package conf

import (
	"github.com/llmons/Lmusic/internal/base/server"
	"github.com/spf13/viper"
)

type AllConfig struct {
	Debug  bool    `yaml:"debug" json:"debug"`
	Server *Server `yaml:"server" json:"server"`
}

type Server struct {
	HTTP *server.HTTP `yaml:"http" json:"http"`
}

func ReadConfig(configFilePath string) (c *AllConfig, err error) {
	v := viper.New()
	v.SetConfigFile(configFilePath)
	if err = v.ReadInConfig(); err != nil {
		return nil, err
	}
	if err = v.Unmarshal(&c); err != nil {
		return nil, err
	}

	return c, nil
}
