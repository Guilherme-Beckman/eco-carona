package controller

import (
	"net/http"
	"strconv"

	"github.com/Guilherme-Beckman/eco-carona.git/service"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	service *service.UserService
}

func NewUserController(service *service.UserService) *UserController {
	return &UserController{
		service: service,
	}
}

func (c *UserController) InitRoutes() {
	app := gin.Default()
	api := app.Group("/api/user")
	api.GET("/:id", c.findById)
	app.Run(":3000")
}

func (c *UserController) findById(ctx *gin.Context) {
	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": err})
		return
	}

	user, err := c.service.FindById(id)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": err})
		return

	}

	ctx.JSON(http.StatusOK, user)
}
