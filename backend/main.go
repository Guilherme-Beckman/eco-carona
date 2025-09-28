package main

import (
	"github.com/Guilherme-Beckman/eco-carona.git/controller"
	"github.com/Guilherme-Beckman/eco-carona.git/infra"
	"github.com/Guilherme-Beckman/eco-carona.git/service"
)

func main() {
	db := infra.CreateConnection()
	userService := service.NewUserService(db)
	userController := controller.NewUserController(userService)
	userController.InitRoutes()
}
