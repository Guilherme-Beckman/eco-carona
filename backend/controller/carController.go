package controller

import (
	"net/http"
	"strconv"

	"github.com/Guilherme-Beckman/eco-carona.git/model"
	"github.com/Guilherme-Beckman/eco-carona.git/service"
	"github.com/gin-gonic/gin"
)

type CarController struct {
	service *service.CarService
}

func NewCarController(service *service.CarService) *CarController {
	return &CarController{
		service: service,
	}
}

func (c *CarController) InitRoutes(router *gin.Engine) {
	api := router.Group("/api/car")
	api.GET("/:id", c.findById)
	api.GET("/all", c.getAllCars)
	api.POST("/", c.saveCar)
	api.PUT("/:id", c.updateCar)
	api.DELETE("/:id", c.deleteCarById)
}

func (c *CarController) findById(ctx *gin.Context) {
	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Erro no id"})
		return
	}

	car, err := c.service.FindById(id)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Carro nao encontrado"})
		return

	}

	ctx.JSON(http.StatusOK, car)
}

func (c *CarController) saveCar(ctx *gin.Context) {
	carP := new(model.Car)

	if err := ctx.ShouldBindJSON(&carP); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Estrutura Json do Carro ta errada"},
		)
		return
	}
	car, err := c.service.SaveCar(*carP)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Erro ao salvar Carro"},
		)
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"car": car})
}

func (c *CarController) updateCar(ctx *gin.Context) {
	carP := new(model.Car)

	if err := ctx.ShouldBindJSON(&carP); err != nil {
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

	car, err := c.service.UpdateCar(*carP, id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": "Erro ao editar caro"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"car": car})
}

func (c *CarController) getAllCars(ctx *gin.Context) {
	cars, err := c.service.GetAllCars()
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{"error": "Erro ao pegar os carros"})
		return
	}
	ctx.JSON(http.StatusOK, cars)
}

func (c *CarController) deleteCarById(ctx *gin.Context) {
	idString := ctx.Param("id")

	id, err := strconv.ParseUint(idString, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Erro ao fazer parse de id"})
		return
	}

	err = c.service.DeleteCar(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Erro ao deletar Carro"})
		return
	}
	ctx.JSON(http.StatusNoContent, nil)
}
