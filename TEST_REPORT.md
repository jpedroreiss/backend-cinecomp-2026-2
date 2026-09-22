# Relatorio de Testes - CineComp API

Este relatorio registra a bateria de testes executada localmente contra a CineComp API.

## Ambiente

| Item | Valor |
| ---- | ----- |
| Data de execucao | 2026-09-21 23:16:41 |
| Base URL | `http://localhost:3000/api` |
| Banco validado | `database/cinecomp.sqlite` |
| Usuario demo | `marcospaulo@compjunior.com.br` |
| Total de testes | 30 |
| Testes aprovados | 30 |
| Testes com falha | 0 |

## Resumo

| Verificacao | Resultado |
| ----------- | --------- |
| Servidor iniciou com `npm run dev` | Aprovado |
| Banco SQLite `cinecomp.sqlite` foi criado | Aprovado |
| Seed criou 20 filmes | Aprovado |
| Login demo retornou JWT | Aprovado |
| Rotas protegidas bloquearam acesso sem token | Aprovado |
| CRUD de filmes funcionou | Aprovado |
| Favoritos funcionaram | Aprovado |
| Favorito duplicado retornou `409` | Aprovado |
| Swagger carregou em `/api/docs` | Aprovado |

## Resultados por rota

| # | Teste | Metodo | Rota | Esperado | Recebido | Resultado |
| - | ----- | ------ | ---- | -------- | -------- | --------- |
| 1 | Health check | GET | `/api/health` | 200 | 200 | Aprovado |
| 2 | Cadastrar usuario | POST | `/api/auth/register` | 201 | 201 | Aprovado |
| 3 | Cadastrar usuario duplicado | POST | `/api/auth/register` | 409 | 409 | Aprovado |
| 4 | Login invalido | POST | `/api/auth/login` | 401 | 401 | Aprovado |
| 5 | Login demo | POST | `/api/auth/login` | 200 | 200 | Aprovado |
| 6 | Perfil sem token | GET | `/api/users/me` | 401 | 401 | Aprovado |
| 7 | Buscar perfil autenticado | GET | `/api/users/me` | 200 | 200 | Aprovado |
| 8 | Atualizar perfil autenticado | PUT | `/api/users/me` | 200 | 200 | Aprovado |
| 9 | Listar filmes | GET | `/api/movies` | 200 | 200 | Aprovado |
| 10 | Listar filmes paginado | GET | `/api/movies?page=1&limit=5` | 200 | 200 | Aprovado |
| 11 | Buscar filmes por termo | GET | `/api/movies?search=inter` | 200 | 200 | Aprovado |
| 12 | Filtrar filmes por genero | GET | `/api/movies?genre=Ficcao%20Cientifica` | 200 | 200 | Aprovado |
| 13 | Filtrar filmes por nota minima | GET | `/api/movies?minRating=8&sortBy=rating&order=desc` | 200 | 200 | Aprovado |
| 14 | Buscar filme por ID | GET | `/api/movies/1` | 200 | 200 | Aprovado |
| 15 | Buscar filme inexistente | GET | `/api/movies/999999` | 404 | 404 | Aprovado |
| 16 | Criar filme sem token | POST | `/api/movies` | 401 | 401 | Aprovado |
| 17 | Criar filme invalido | POST | `/api/movies` | 400 | 400 | Aprovado |
| 18 | Criar filme autenticado | POST | `/api/movies` | 201 | 201 | Aprovado |
| 19 | Buscar filme criado | GET | `/api/movies/21` | 200 | 200 | Aprovado |
| 20 | Atualizar filme criado | PUT | `/api/movies/21` | 200 | 200 | Aprovado |
| 21 | Listar favoritos sem token | GET | `/api/favorites` | 401 | 401 | Aprovado |
| 22 | Adicionar favorito | POST | `/api/favorites/21` | 201 | 201 | Aprovado |
| 23 | Adicionar favorito duplicado | POST | `/api/favorites/21` | 409 | 409 | Aprovado |
| 24 | Listar favoritos autenticado | GET | `/api/favorites` | 200 | 200 | Aprovado |
| 25 | Remover favorito | DELETE | `/api/favorites/21` | 200 | 200 | Aprovado |
| 26 | Remover favorito inexistente | DELETE | `/api/favorites/21` | 404 | 404 | Aprovado |
| 27 | Excluir filme criado | DELETE | `/api/movies/21` | 200 | 200 | Aprovado |
| 28 | Excluir filme inexistente | DELETE | `/api/movies/21` | 404 | 404 | Aprovado |
| 29 | Rota inexistente | GET | `/api/rota-inexistente` | 404 | 404 | Aprovado |
| 30 | Swagger UI | GET | `/api/docs` | 200 | 200 | Aprovado |

## Exemplos de respostas validadas

### Health check

```json
{
  "success": true,
  "status": "ok",
  "message": "CineComp API esta rodando"
}
```

### Login demo

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "CineComp API",
      "email": "marcospaulo@compjunior.com.br"
    },
    "token": "JWT_GERADO_PELA_API"
  }
}
```

### Rota protegida sem token

```json
{
  "success": false,
  "message": "Nao autorizado"
}
```

### Filme inexistente

```json
{
  "success": false,
  "message": "Filme nao encontrado"
}
```

### Favorito duplicado

```json
{
  "success": false,
  "message": "Filme ja foi adicionado aos favoritos"
}
```

## Observacoes

- O token real do login nao foi registrado neste relatorio.
- O banco foi resetado depois da bateria para voltar ao estado inicial.
- O teste de criacao de filme usou um registro temporario chamado `Filme Teste CompJunior`.
- O teste de cadastro de usuario usou um e-mail temporario gerado durante a execucao.
