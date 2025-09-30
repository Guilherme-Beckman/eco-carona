# 🌱 Eco-Carona

**Eco-Carona** é uma aplicação full-stack para promover caronas sustentáveis, conectando motoristas e passageiros de forma simples e segura.

O projeto é dividido em três partes principais:

* **Backend**: API em **Go (Golang)** com GORM e arquitetura organizada em camadas.
* **Frontend**: Interface web em **Next.js 15** com TypeScript e TailwindCSS.
* **Infraestrutura**: Orquestração via **Docker Compose**, incluindo Postgres, backend e frontend.

---

## 📂 Estrutura do Projeto

```
eco-carona/
│── backend/              # API em Go
│   ├── controller/       
│   ├── infra/            
│   ├── model/            
│   ├── service/          
│   ├── main.go           
│   ├── go.mod            
│   └── go.sum
│
│── frontend/             # Interface web em Next.js
│   ├── app/              
│   ├── components/       
│   ├── core/             
│   ├── lib/              
│   ├── public/           
│   ├── types.ts          
│   ├── next.config.ts    
│   └── package.json
│
│── docker-compose.yml    
│── README.md             
```

---

## 🚀 Tecnologias Utilizadas

**Backend**

* Go 1.25+
* GORM (ORM para banco de dados relacional)
* Arquitetura em camadas (Controller → Service → Model → Infra)

**Frontend**

* Next.js 15
* React + TypeScript
* TailwindCSS

**Infra**

* Docker & Docker Compose
* PostgreSQL 16

---

## ⚙️ Como Rodar o Projeto

### 🔹 Opção 1 — Usando Docker Compose (recomendado)

1. Clone o projeto:

```bash
git clone https://github.com/Guilherme-Beckman/eco-carona.git
cd eco-carona
```

2. Buildar e subir os serviços:

```bash
docker compose up --build
```

3. Endpoints acessíveis:

* Backend: `http://localhost:8080`
* Frontend: `http://localhost:3000`

> Obs: o backend usa `go run main.go` dentro do container, conectando automaticamente ao Postgres via `DB_HOST=db`.

4. Parar os serviços:

```bash
docker compose down
```

---

### 🔹 Opção 2 — Rodando sem Docker

**Backend**

```bash
cd backend
go mod download
go run main.go
```

API disponível em: `http://localhost:8080`

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

App disponível em: `http://localhost:3000`

> Lembre-se de ajustar a variável `NEXT_PUBLIC_API_BASE` no frontend para apontar para `http://localhost:8080`.

---

## 🛠️ Funcionalidades (planejadas)

* Cadastro e gerenciamento de usuários
* Criação de caronas
* Associação de passageiros às caronas
* Autenticação JWT
* Integração backend ↔ frontend

---

## 📌 Próximos Passos

* Adicionar retry de conexão no backend para Postgres (evitar crash loop)
* Criar páginas de login/cadastro no frontend
* Configurar testes automatizados (Go + Jest/React Testing Library)
* Deploy em produção (Railway, Vercel, etc.)

---

## 📜 Licença

MIT License

---
