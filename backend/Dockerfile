
FROM golang:1.25

WORKDIR /app

# Copia os arquivos de dependência e baixa módulos
COPY go.mod go.sum ./
RUN go mod download

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 8080

# Roda em modo dev
CMD ["go", "run", "main.go"]
