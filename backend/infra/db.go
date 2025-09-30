package infra

import (
	"log"

	"github.com/Guilherme-Beckman/eco-carona.git/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// funções publicas sao definidas pela letra maiscula no inicio
func CreateConnection() *gorm.DB {
	//:= define automaticamente a tipagem
	dns := "host=db user=eco-carona password=eco123 dbname=eco-db port=5432 sslmode=disable TimeZone=America/Campo_Grande"
	// essa declaração dupla possibilita lidar com os erros
	// visto que gorm.Open pode retornar *gorm.DB ou um erros
	db, err := gorm.Open(postgres.Open(dns),
		//&gorm.Config {} -> da o endereço de memoria de gormConfig
		&gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao se conectar com o banco de dados", err)
	}
	err = db.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal("falha ao migrar database do usuario", err)
	}
	err = db.AutoMigrate(&model.Car{})
	if err != nil {
		log.Fatal("falha ao migrar database do carro")
	}
	return db
}
