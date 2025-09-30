package main

import (
	"github.com/Guilherme-Beckman/eco-carona.git/controller"
	"github.com/Guilherme-Beckman/eco-carona.git/infra"
	"github.com/Guilherme-Beckman/eco-carona.git/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := infra.CreateConnection()
	router := gin.Default()
	router.Use(cors.Default())
	userService := service.NewUserService(db)
	userController := controller.NewUserController(userService)
	userController.InitRoutes(router)

	carService := service.NewCarService(db)
	carController := controller.NewCarController(carService)
	carController.InitRoutes(router)

	router.Run(":8080")
}
