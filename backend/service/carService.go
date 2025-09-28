package service

import (
	"github.com/Guilherme-Beckman/eco-carona.git/model"
	"gorm.io/gorm"
)

type CarService struct {
	db *gorm.DB
}

func NewCarService(db *gorm.DB) *CarService {
	return &CarService{
		db: db,
	}
}

// primeiro param é usado para usar o objeto dessa instancia
// equivalente ao this
// o segundo é o parametro que tem qeu ser passado
// o terceiro sao os dois tipos de retorno
func (s *CarService) FindById(id uint64) (model.Car, error) {
	// primeiro eu inicializo um ponteiro para um novo struct de car
	// depois eu pesquiso no banco de dados ate achar o primeiro e passado
	// o endereço da variavel como destino
	car := new(model.Car)
	resp := s.db.First(car, id)
	if resp.Error != nil {
		return model.Car{}, resp.Error
	}

	return *car, nil
}

func (s *CarService) SaveCar(car model.Car) (model.Car, error) {
	result := s.db.Create(&car)
	if result.Error != nil {
		return model.Car{}, result.Error
	}
	return car, nil
}

func (s *CarService) UpdateCar(car model.Car, id uint64) (model.Car, error) {
	exist, err := s.FindById(id)
	if err != nil {
		return model.Car{}, err
	}

	exist.Marca = car.Marca
	exist.Ano = car.Ano
	exist.ConsumoKmL = car.ConsumoKmL
	exist.Lugares = car.Lugares
	exist.Modelo = car.Modelo
	exist.Cor = car.Cor

	resp := s.db.Save(&exist)

	if resp.Error != nil {
		return model.Car{}, resp.Error
	}

	return exist, nil
}

func (s *CarService) DeleteCar(id uint64) error {
	res := s.db.Delete(&model.Car{}, id)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
