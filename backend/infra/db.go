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
	dns := "host=localhost user=eco-carona password=eco123 dbname=eco-db port:5432 sslmode=desable TimeZone=America/Campo_Grande"
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao se conectar com o banco de dados", err)
	}
	err = db.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal("falha ao migrar database ", err)
	}
	return db
}
