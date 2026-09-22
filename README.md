# CineComp API

API REST educacional criada para a trilha de frontend da CompJunior.

A CineComp API foi feita para estudantes consumirem um back-end pronto enquanto praticam React, Vue, Angular ou JavaScript puro. Ela usa SQLite, cria o banco automaticamente e não exige instalação de MySQL, PostgreSQL, MongoDB, Docker, XAMPP ou qualquer servidor externo. O projeto possui autenticação com JWT, CRUD de filmes, favoritos e documentação interativa com Swagger.

## Para quem é este projeto

Este projeto é para a trilha de frontend da CompJunior. Ele ajuda a treinar consumo de API, Axios, autenticação JWT, CRUD, rotas protegidas, filtros, paginação, favoritos, tratamento de erros e estados de loading sem precisar configurar infraestrutura de back-end.

## Tecnologias

| Tecnologia | Uso no projeto |
| ---------- | -------------- |
| Node.js | Ambiente de execução JavaScript |
| Express | Criação das rotas HTTP |
| JavaScript | Linguagem do back-end |
| SQLite | Banco local em arquivo |
| Sequelize | ORM para tabelas e consultas |
| JWT | Autenticação por token |
| bcrypt | Hash seguro de senhas |
| Swagger | Documentação interativa da API |

## Pré-requisitos

Você precisa ter apenas Node.js em versão LTS atual, npm e Git.

Não precisa instalar banco de dados. Não precisa instalar Docker.

## Instalação rápida

```bash
git clone URL_DO_REPOSITORIO

cd cinecomp-api

npm install

npm run dev
```

Pronto.

O SQLite será criado automaticamente na primeira execução.

## URLs

```text
API:
http://localhost:3000

Swagger:
http://localhost:3000/api/docs

Health Check:
http://localhost:3000/api/health
```

## Usuário de teste

```text
Nome:
CineComp API

E-mail:
marcospaulo@compjunior.com.br

Senha:
PaczinBalaTensa000-
```

## Banco de dados

O banco fica em:

```text
database/cinecomp.sqlite
```

Ele é criado automaticamente, fica dentro do projeto e não exige servidor externo.

## Reset

```bash
npm run reset-db
```

Esse comando apaga o banco atual, recria as tabelas e popula novamente os dados iniciais.

## Variáveis de ambiente

Crie um arquivo `.env` baseado no exemplo:

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Conteúdo:

```env
PORT=3000
JWT_SECRET=development-secret-change-me
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Em desenvolvimento, a API funciona mesmo sem `.env`, usando valores padrão. Em produção, altere o `JWT_SECRET`.

## Arquitetura

```text
cinecomp-api/
|-- database/
|   |-- .gitkeep
|
|-- src/
|   |-- config/
|   |   |-- database.js
|   |-- controllers/
|   |-- services/
|   |-- models/
|   |-- routes/
|   |-- middlewares/
|   |-- docs/
|   |-- utils/
|   |-- app.js
|   |-- server.js
|
|-- .env.example
|-- .gitignore
|-- LICENSE
|-- package.json
|-- README.md
```

`config` configura o SQLite. `controllers` recebem as requisições. `services` concentram regras de negócio. `models` definem tabelas. `routes` organizam endpoints. `middlewares` cuidam de JWT, erros e rotas inexistentes. `docs` guarda o Swagger. `utils` guarda seed, reset, validações e erros.

## Autenticação

```text
POST /api/auth/login

retorna JWT

frontend salva token

envia:
Authorization: Bearer TOKEN

backend libera rota protegida
```

## Rotas

| Método | Rota                      | Auth | Descrição         |
| ------ | ------------------------- | ---- | ----------------- |
| GET    | `/api/health`             | Não  | Verifica a API    |
| POST   | `/api/auth/register`      | Não  | Cadastra usuário  |
| POST   | `/api/auth/login`         | Não  | Login             |
| GET    | `/api/users/me`           | Sim  | Retorna perfil    |
| PUT    | `/api/users/me`           | Sim  | Atualiza perfil   |
| GET    | `/api/movies`             | Não  | Lista filmes      |
| GET    | `/api/movies/:id`         | Não  | Busca filme       |
| POST   | `/api/movies`             | Sim  | Cria filme        |
| PUT    | `/api/movies/:id`         | Sim  | Atualiza filme    |
| DELETE | `/api/movies/:id`         | Sim  | Exclui filme      |
| GET    | `/api/favorites`          | Sim  | Lista favoritos   |
| POST   | `/api/favorites/:movieId` | Sim  | Adiciona favorito |
| DELETE | `/api/favorites/:movieId` | Sim  | Remove favorito   |

## Query parameters

`GET /api/movies` aceita:

| Parâmetro | Exemplo | Descrição |
| --------- | ------- | --------- |
| `search` | `inter` | Busca em título, descrição e diretor |
| `genre` | `Acao` | Filtra por gênero |
| `director` | `Nolan` | Filtra por diretor |
| `releaseYear` | `2014` | Filtra por ano |
| `minRating` | `8` | Filtra por nota mínima |
| `page` | `1` | Página atual |
| `limit` | `5` | Itens por página, máximo 100 |
| `sortBy` | `rating` | Aceita `title`, `releaseYear`, `rating`, `createdAt` |
| `order` | `desc` | Aceita `asc` ou `desc` |

## Exemplos CURL

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "marcospaulo@compjunior.com.br",
  "password": "PaczinBalaTensa000-"
}'
```

O token vem em:

```text
response.data.data.token
```

### Listar filmes

```bash
curl http://localhost:3000/api/movies
```

### Buscar filme

```bash
curl http://localhost:3000/api/movies/1
```

### Criar filme

```bash
curl -X POST http://localhost:3000/api/movies \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d '{
  "title": "Interstellar",
  "description": "Uma equipe viaja pelo espaço em busca de um novo lar para a humanidade.",
  "genre": "Ficcao Cientifica",
  "director": "Christopher Nolan",
  "releaseYear": 2014,
  "rating": 8.7,
  "posterUrl": "https://example.com/interstellar.jpg"
}'
```

### Atualizar filme

```bash
curl -X PUT http://localhost:3000/api/movies/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d '{
  "rating": 9.1
}'
```

### Excluir filme

```bash
curl -X DELETE http://localhost:3000/api/movies/1 \
-H "Authorization: Bearer SEU_TOKEN"
```

### Favoritos

```bash
curl -X POST http://localhost:3000/api/favorites/1 \
-H "Authorization: Bearer SEU_TOKEN"
```

```bash
curl http://localhost:3000/api/favorites \
-H "Authorization: Bearer SEU_TOKEN"
```

```bash
curl -X DELETE http://localhost:3000/api/favorites/1 \
-H "Authorization: Bearer SEU_TOKEN"
```

## Consumindo a API com React

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export default api;
```

### Login com Axios

```javascript
const response = await api.post("/auth/login", {
  email,
  password
});

const token = response.data.data.token;

localStorage.setItem("token", token);
```

### Axios interceptor

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

### Listar filmes

```javascript
const response = await api.get("/movies");

console.log(response.data.data);
```

### Tratamento de erros

```javascript
try {
  const response = await api.get("/movies");
} catch (error) {
  console.error(
    error.response?.data?.message || "Erro ao carregar filmes"
  );
}
```

### Loading

```javascript
setLoading(true);

try {
  await api.get("/movies");
} finally {
  setLoading(false);
}
```

## Sugestões de páginas frontend

| Página | Objetivo |
| ------ | -------- |
| `/login` | Entrar com e-mail e senha |
| `/register` | Criar uma conta |
| `/movies` | Listar, buscar, filtrar e paginar filmes |
| `/movies/:id` | Mostrar detalhes de um filme |
| `/favorites` | Mostrar filmes favoritados |
| `/profile` | Ver e editar dados do usuário |
| `/admin/movies` | Criar, editar e excluir filmes |

## Rotas protegidas no frontend

As páginas `/favorites`, `/profile` e `/admin/movies` podem ser protegidas verificando se existe JWT salvo no navegador. Mesmo assim, o back-end também valida o token em todas as rotas protegidas.

## Ideias de funcionalidades

- Cards de filmes
- Busca
- Filtros
- Paginação
- Favoritos
- Login
- Cadastro
- Modal de confirmação
- Formulário de cadastro
- Formulário de edição
- Notificações de sucesso
- Loading
- Tratamento de erro
- Página de detalhes
- Layout responsivo

## Swagger

Abra:

```text
http://localhost:3000/api/docs
```

Tutorial:

1. Abra o Swagger.
2. Execute `POST /api/auth/login`.
3. Copie o token retornado.
4. Clique em `Authorize`.
5. Cole somente o token, sem escrever `Bearer`.
6. Execute as rotas protegidas.

## Erros comuns

### Porta ocupada

Se aparecer `EADDRINUSE`, altere a porta no `.env`:

```env
PORT=3001
```

### Banco corrompido ou dados bagunçados

Execute:

```bash
npm run reset-db
```

### 401 Não autorizado

Verifique se a requisição está enviando:

```text
Authorization: Bearer TOKEN
```

## Licença

MIT

João Pedro L.Reis | Diretor de Projetos 2026/2
