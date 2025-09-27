package model

type Turno string

const (
	Manha Turno = "manha"
	Tarde Turno = "tarde"
	Noite Turno = "noite"
)

type User struct {
	ID        uint64 `gorm:"primary_key,autoIncrement"`
	Nome      string `gorm:"size:255;not null"`
	Idade     int
	CPF       string `gorm:"size:14;unique;not null"`
	Turno     Turno  `gorm:"type:enum('manha','tarde','noite');not null"`
	Descricao string `gorm:"size:255"`
}
