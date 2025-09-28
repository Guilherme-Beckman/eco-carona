package model

type Car struct {
	ID         uint64  `gorm:"primary_key, autoIncrement"`
	Marca      string  `gorm:"size:255;not null"`
	Modelo     string  `gorm:"size:255;not null"`
	Ano        uint64  `gorm:"not null"`
	Cor        string  `gorm:"size:255; not null"`
	Lugares    uint64  `gorm:"size:100;not null"`
	ConsumoKmL float64 `gorm:"not null"`
}
