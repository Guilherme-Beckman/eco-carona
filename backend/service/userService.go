package service

import (
	"github.com/Guilherme-Beckman/eco-carona.git/model"
	"gorm.io/gorm"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{
		db: db,
	}
}

// primeiro param é usado para usar o objeto dessa instancia
// equivalente ao this
// o segundo é o parametro que tem qeu ser passado
// o terceiro sao os dois tipos de retorno
func (s *UserService) FindById(id uint64) (model.User, error) {
	// primeiro eu inicializo um ponteiro para um novo struct de user
	// depois eu pesquiso no banco de dados ate achar o primeiro e passado
	// o endereço da variavel como destino
	user := new(model.User)
	resp := s.db.First(user, id)
	if resp.Error != nil {
		return model.User{}, resp.Error
	}

	return *user, nil
}

func (s *UserService) GetAllUsers() ([]model.User, error) {
	var users []model.User
	result := s.db.Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}

	return users, nil
}

func (s *UserService) SaveUser(user model.User) (model.User, error) {
	result := s.db.Create(&user)
	if result.Error != nil {
		return model.User{}, result.Error
	}
	return user, nil
}

func (s *UserService) UpdateUser(user model.User, id uint64) (model.User, error) {
	exist, err := s.FindById(id)
	if err != nil {
		return model.User{}, err
	}

	exist.Nome = user.Nome
	exist.Turno = user.Turno
	exist.Descricao = user.Descricao
	exist.Idade = user.Idade

	resp := s.db.Save(&exist)

	if resp.Error != nil {
		return model.User{}, resp.Error
	}

	return exist, nil
}

func (s *UserService) DeleteUser(id uint64) error {
	res := s.db.Delete(&model.User{}, id)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
