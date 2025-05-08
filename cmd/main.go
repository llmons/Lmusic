package main

import (
	"fmt"

	"github.com/llmons/Lmusic/internal/base/conf"
)

func main() {
	c, err := conf.ReadConfig("./configs/config.yaml")
	if err != nil {
		panic(err)
	}

	app, err := initApplication(c.Debug, c.Server)
	if err != nil {
		panic(err)
	}

	fmt.Println("Starting server at", c.Server.HTTP.Addr)
	if err := app.Run(c.Server.HTTP.Addr); err != nil {
		panic(err)
	}
}
