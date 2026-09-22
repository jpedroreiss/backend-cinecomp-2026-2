const swaggerJsdoc = require("swagger-jsdoc");

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineComp API",
      version: "1.0.0",
      description: "API educacional para a trilha de frontend da CompJunior."
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Servidor local"
      }
    ],
    tags: [
      { name: "Status" },
      { name: "Autenticacao" },
      { name: "Usuarios" },
      { name: "Filmes" },
      { name: "Favoritos" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Algo deu errado" }
          }
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Erro de validacao" },
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["title e obrigatorio", "rating deve estar entre 0 e 10"]
            }
          }
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "CineComp API" },
            email: { type: "string", example: "marcospaulo@compjunior.com.br" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        Movie: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Interstellar" },
            description: {
              type: "string",
              example: "Um grupo de exploradores viaja pelo espaco em busca de um novo lar para a humanidade."
            },
            genre: { type: "string", example: "Ficcao Cientifica" },
            director: { type: "string", example: "Christopher Nolan" },
            releaseYear: { type: "integer", example: 2014 },
            rating: { type: "number", example: 8.7 },
            posterUrl: { type: "string", example: "https://placehold.co/300x450?text=Interstellar" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        MovieInput: {
          type: "object",
          required: ["title", "description", "genre", "director", "releaseYear", "rating"],
          properties: {
            title: { type: "string", example: "Interstellar" },
            description: {
              type: "string",
              example: "Uma equipe viaja pelo espaco em busca de um novo lar para a humanidade."
            },
            genre: { type: "string", example: "Ficcao Cientifica" },
            director: { type: "string", example: "Christopher Nolan" },
            releaseYear: { type: "integer", example: 2014 },
            rating: { type: "number", example: 8.7 },
            posterUrl: { type: "string", example: "https://example.com/interstellar.jpg" }
          }
        }
      }
    },
    paths: {
      "/api/health": {
        get: {
          tags: ["Status"],
          summary: "Verificar status da API",
          responses: {
            200: {
              description: "API esta rodando",
              content: {
                "application/json": {
                  example: {
                    success: true,
                    status: "ok",
                    message: "CineComp API esta rodando"
                  }
                }
              }
            }
          }
        }
      },
      "/api/auth/register": {
        post: {
          tags: ["Autenticacao"],
          summary: "Cadastrar usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  name: "Joao Silva",
                  email: "joao@email.com",
                  password: "senha123"
                }
              }
            }
          },
          responses: {
            201: {
              description: "Usuario criado",
              content: {
                "application/json": {
                  example: {
                    success: true,
                    message: "Usuario criado com sucesso",
                    data: { id: 1, name: "Joao Silva", email: "joao@email.com" }
                  }
                }
              }
            },
            400: { description: "Erro de validacao" },
            409: { description: "E-mail ja esta em uso" }
          }
        }
      },
      "/api/auth/login": {
        post: {
          tags: ["Autenticacao"],
          summary: "Login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  email: "marcospaulo@compjunior.com.br",
                  password: "PaczinBalaTensa000-"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login realizado com sucesso",
              content: {
                "application/json": {
                  example: {
                    success: true,
                    message: "Login realizado com sucesso",
                    data: {
                      user: { id: 1, name: "CineComp API", email: "marcospaulo@compjunior.com.br" },
                      token: "JWT_TOKEN"
                    }
                  }
                }
              }
            },
            401: { description: "E-mail ou senha invalidos" }
          }
        }
      },
      "/api/users/me": {
        get: {
          tags: ["Usuarios"],
          summary: "Buscar usuario autenticado",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Perfil do usuario",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            401: { description: "Nao autorizado" }
          }
        },
        put: {
          tags: ["Usuarios"],
          summary: "Atualizar usuario autenticado",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  name: "Novo Nome",
                  email: "novo@email.com"
                }
              }
            }
          },
          responses: {
            200: { description: "Usuario atualizado" },
            400: { description: "Erro de validacao" },
            401: { description: "Nao autorizado" },
            409: { description: "E-mail ja esta em uso" }
          }
        }
      },
      "/api/movies": {
        get: {
          tags: ["Filmes"],
          summary: "Listar filmes",
          parameters: [
            { name: "search", in: "query", schema: { type: "string" }, example: "inter" },
            { name: "genre", in: "query", schema: { type: "string" }, example: "Ficcao Cientifica" },
            { name: "director", in: "query", schema: { type: "string" }, example: "Christopher Nolan" },
            { name: "releaseYear", in: "query", schema: { type: "integer" }, example: 2014 },
            { name: "minRating", in: "query", schema: { type: "number" }, example: 8 },
            { name: "page", in: "query", schema: { type: "integer", default: 1 }, example: 1 },
            { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 }, example: 10 },
            { name: "sortBy", in: "query", schema: { type: "string", enum: ["title", "releaseYear", "rating", "createdAt"] }, example: "rating" },
            { name: "order", in: "query", schema: { type: "string", enum: ["asc", "desc"], default: "asc" }, example: "desc" }
          ],
          responses: {
            200: {
              description: "Lista de filmes",
              content: {
                "application/json": {
                  example: {
                    success: true,
                    data: [
                      {
                        id: 1,
                        title: "Interstellar",
                        genre: "Ficcao Cientifica",
                        director: "Christopher Nolan",
                        releaseYear: 2014,
                        rating: 8.7,
                        posterUrl: "https://placehold.co/300x450?text=Interstellar"
                      }
                    ],
                    pagination: { page: 1, limit: 10, total: 20, totalPages: 2 }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Filmes"],
          summary: "Criar filme",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MovieInput" }
              }
            }
          },
          responses: {
            201: { description: "Filme criado" },
            400: { description: "Erro de validacao" },
            401: { description: "Nao autorizado" }
          }
        }
      },
      "/api/movies/{id}": {
        get: {
          tags: ["Filmes"],
          summary: "Buscar filme por id",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 }
          ],
          responses: {
            200: {
              description: "Detalhes do filme",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Movie" }
                }
              }
            },
            404: { description: "Filme nao encontrado" }
          }
        },
        put: {
          tags: ["Filmes"],
          summary: "Atualizar filme",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: { rating: 9.1 }
              }
            }
          },
          responses: {
            200: { description: "Filme atualizado" },
            400: { description: "Erro de validacao" },
            401: { description: "Nao autorizado" },
            404: { description: "Filme nao encontrado" }
          }
        },
        delete: {
          tags: ["Filmes"],
          summary: "Excluir filme",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 }
          ],
          responses: {
            200: { description: "Filme excluido" },
            401: { description: "Nao autorizado" },
            404: { description: "Filme nao encontrado" }
          }
        }
      },
      "/api/favorites": {
        get: {
          tags: ["Favoritos"],
          summary: "Listar favoritos do usuario autenticado",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Filmes favoritos",
              content: {
                "application/json": {
                  example: {
                    success: true,
                    data: [
                      {
                        id: 1,
                        title: "Interstellar",
                        description: "Um grupo de exploradores viaja pelo espaco em busca de um novo lar para a humanidade.",
                        genre: "Ficcao Cientifica",
                        director: "Christopher Nolan",
                        releaseYear: 2014,
                        rating: 8.7,
                        posterUrl: "https://placehold.co/300x450?text=Interstellar"
                      }
                    ]
                  }
                }
              }
            },
            401: { description: "Nao autorizado" }
          }
        }
      },
      "/api/favorites/{movieId}": {
        post: {
          tags: ["Favoritos"],
          summary: "Adicionar filme aos favoritos",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "movieId", in: "path", required: true, schema: { type: "integer" }, example: 1 }
          ],
          responses: {
            201: { description: "Favorito criado" },
            401: { description: "Nao autorizado" },
            404: { description: "Filme nao encontrado" },
            409: { description: "Filme ja foi adicionado aos favoritos" }
          }
        },
        delete: {
          tags: ["Favoritos"],
          summary: "Remover filme dos favoritos",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "movieId", in: "path", required: true, schema: { type: "integer" }, example: 1 }
          ],
          responses: {
            200: { description: "Favorito removido" },
            401: { description: "Nao autorizado" },
            404: { description: "Filme nao esta nos favoritos" }
          }
        }
      }
    }
  },
  apis: []
};

module.exports = swaggerJsdoc(options);
