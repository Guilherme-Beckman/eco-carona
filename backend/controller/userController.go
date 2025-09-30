package controller

import (
	"net/http"
	"strconv"

	"github.com/Guilherme-Beckman/eco-carona.git/model"
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

func (c *UserController) InitRoutes(router *gin.Engine) {
	api := router.Group("/api/user")
	api.GET("/:id", c.findById)
	api.GET("/all", c.getAllUsers)
	api.POST("/", c.saveUser)
	api.PUT("/:id", c.updateUser)
	api.DELETE("/:id", c.deleteUserById)
}

func (c *UserController) findById(ctx *gin.Context) {
	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Erro no id"})
		return
	}

	user, err := c.service.FindById(id)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Usuario nao encontrado"})
		return

	}

	ctx.JSON(http.StatusOK, user)
}

func (c *UserController) getAllUsers(ctx *gin.Context) {
	users, err := c.service.GetAllUsers()
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Erro ao pegar os usuarios"})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (c *UserController) saveUser(ctx *gin.Context) {
	userP := new(model.User)

	if err := ctx.ShouldBindJSON(&userP); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Estrutura Json do usuario ta errada"},
		)
		return
	}
	user, err := c.service.SaveUser(*userP)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Erro ao salvar usuario"},
		)
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"user": user})
}

func (c *UserController) updateUser(ctx *gin.Context) {
	userP := new(model.User)

	if err := ctx.ShouldBindJSON(&userP); err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": "Erro na Estrutura do JSON"})
		return
	}

	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": "Erro ao converter ID"})
		return
	}

	user, err := c.service.UpdateUser(*userP, id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": "Erro ao editar usuario"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"user": user})
}

func (c *UserController) deleteUserById(ctx *gin.Context) {
	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Erro ao fazer parse de id"})
		return
	}

	err = c.service.DeleteUser(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Erro ao deletar usuario"})
		return
	}
	ctx.JSON(http.StatusNoContent, nil)
}
