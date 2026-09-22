require("dotenv").config();

const bcrypt = require("bcrypt");
const { sequelize, User, Movie } = require("../models");

const demoMovies = [
  {
    title: "Interstellar",
    description: "Um grupo de exploradores viaja por um buraco de minhoca em busca de um novo lar para a humanidade.",
    genre: "Ficcao Cientifica",
    director: "Christopher Nolan",
    releaseYear: 2014,
    rating: 8.7,
    posterUrl: "https://placehold.co/300x450?text=Interstellar"
  },
  {
    title: "The Dark Knight",
    description: "Batman enfrenta um criminoso genial que leva Gotham City ao caos.",
    genre: "Acao",
    director: "Christopher Nolan",
    releaseYear: 2008,
    rating: 9.0,
    posterUrl: "https://placehold.co/300x450?text=The+Dark+Knight"
  },
  {
    title: "Spirited Away",
    description: "Uma garota entra em um mundo misterioso de espiritos e precisa encontrar coragem para salvar seus pais.",
    genre: "Animacao",
    director: "Hayao Miyazaki",
    releaseYear: 2001,
    rating: 8.6,
    posterUrl: "https://placehold.co/300x450?text=Spirited+Away"
  },
  {
    title: "Parasite",
    description: "Uma familia em dificuldades se envolve com uma casa rica em um suspense social marcante.",
    genre: "Thriller",
    director: "Bong Joon-ho",
    releaseYear: 2019,
    rating: 8.5,
    posterUrl: "https://placehold.co/300x450?text=Parasite"
  },
  {
    title: "The Matrix",
    description: "Um hacker descobre que a realidade e um mundo simulado controlado por maquinas.",
    genre: "Ficcao Cientifica",
    director: "Lana Wachowski, Lilly Wachowski",
    releaseYear: 1999,
    rating: 8.7,
    posterUrl: "https://placehold.co/300x450?text=The+Matrix"
  },
  {
    title: "Inception",
    description: "Um ladrao habilidoso invade sonhos para roubar segredos e aceita uma ultima missao quase impossivel.",
    genre: "Ficcao Cientifica",
    director: "Christopher Nolan",
    releaseYear: 2010,
    rating: 8.8,
    posterUrl: "https://placehold.co/300x450?text=Inception"
  },
  {
    title: "City of God",
    description: "Dois jovens crescem em uma comunidade violenta do Rio de Janeiro e seguem caminhos muito diferentes.",
    genre: "Crime",
    director: "Fernando Meirelles",
    releaseYear: 2002,
    rating: 8.6,
    posterUrl: "https://placehold.co/300x450?text=City+of+God"
  },
  {
    title: "The Grand Budapest Hotel",
    description: "Um concierge e um jovem mensageiro se envolvem em uma historia de roubo, lealdade e elegancia.",
    genre: "Comedia",
    director: "Wes Anderson",
    releaseYear: 2014,
    rating: 8.1,
    posterUrl: "https://placehold.co/300x450?text=Grand+Budapest"
  },
  {
    title: "Whiplash",
    description: "Um jovem baterista e levado ao limite por um professor de musica intenso e exigente.",
    genre: "Drama",
    director: "Damien Chazelle",
    releaseYear: 2014,
    rating: 8.5,
    posterUrl: "https://placehold.co/300x450?text=Whiplash"
  },
  {
    title: "Arrival",
    description: "Uma linguista trabalha com militares para se comunicar com visitantes misteriosos vindos do espaco.",
    genre: "Ficcao Cientifica",
    director: "Denis Villeneuve",
    releaseYear: 2016,
    rating: 7.9,
    posterUrl: "https://placehold.co/300x450?text=Arrival"
  },
  {
    title: "Mad Max: Fury Road",
    description: "Em um deserto pos-apocaliptico, rebeldes fogem de um tirano em uma luta veloz pela sobrevivencia.",
    genre: "Acao",
    director: "George Miller",
    releaseYear: 2015,
    rating: 8.1,
    posterUrl: "https://placehold.co/300x450?text=Fury+Road"
  },
  {
    title: "La La Land",
    description: "Uma atriz iniciante e um musico de jazz se apaixonam enquanto buscam seus sonhos em Los Angeles.",
    genre: "Musical",
    director: "Damien Chazelle",
    releaseYear: 2016,
    rating: 8.0,
    posterUrl: "https://placehold.co/300x450?text=La+La+Land"
  },
  {
    title: "The Social Network",
    description: "A criacao de uma grande rede social leva a ambicao, conflitos e disputas judiciais.",
    genre: "Biografia",
    director: "David Fincher",
    releaseYear: 2010,
    rating: 7.8,
    posterUrl: "https://placehold.co/300x450?text=Social+Network"
  },
  {
    title: "Get Out",
    description: "Uma visita de fim de semana se torna assustadora quando um jovem descobre segredos perturbadores.",
    genre: "Terror",
    director: "Jordan Peele",
    releaseYear: 2017,
    rating: 7.8,
    posterUrl: "https://placehold.co/300x450?text=Get+Out"
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "Um hobbit inicia uma jornada perigosa para destruir um anel poderoso.",
    genre: "Fantasia",
    director: "Peter Jackson",
    releaseYear: 2001,
    rating: 8.9,
    posterUrl: "https://placehold.co/300x450?text=Fellowship"
  },
  {
    title: "Black Panther",
    description: "Um novo rei retorna para casa para defender sua nacao e definir seu futuro.",
    genre: "Aventura",
    director: "Ryan Coogler",
    releaseYear: 2018,
    rating: 7.3,
    posterUrl: "https://placehold.co/300x450?text=Black+Panther"
  },
  {
    title: "Inside Out",
    description: "As emocoes dentro da mente de uma garota ajudam ela a enfrentar uma mudanca dificil.",
    genre: "Animacao",
    director: "Pete Docter",
    releaseYear: 2015,
    rating: 8.1,
    posterUrl: "https://placehold.co/300x450?text=Inside+Out"
  },
  {
    title: "The Shawshank Redemption",
    description: "Dois homens presos constroem uma amizade e mantem a esperanca ao longo de muitos anos.",
    genre: "Drama",
    director: "Frank Darabont",
    releaseYear: 1994,
    rating: 9.3,
    posterUrl: "https://placehold.co/300x450?text=Shawshank"
  },
  {
    title: "Pulp Fiction",
    description: "Historias de crime conectadas se desenrolam com dialogos marcantes e reviravoltas inesperadas.",
    genre: "Crime",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    rating: 8.9,
    posterUrl: "https://placehold.co/300x450?text=Pulp+Fiction"
  },
  {
    title: "Her",
    description: "Um escritor solitario desenvolve um relacionamento com um sistema operacional avancado.",
    genre: "Romance",
    director: "Spike Jonze",
    releaseYear: 2013,
    rating: 8.0,
    posterUrl: "https://placehold.co/300x450?text=Her"
  }
];

async function seedDemoUser() {
  const email = "marcospaulo@compjunior.com.br";
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    const password = await bcrypt.hash("PaczinBalaTensa000-", 10);
    await User.create({
      name: "CineComp API",
      email,
      password
    });
  }
}

async function seedMovies() {
  for (const movie of demoMovies) {
    const existingMovie = await Movie.findOne({
      where: {
        title: movie.title,
        releaseYear: movie.releaseYear
      }
    });

    if (!existingMovie) {
      await Movie.create(movie);
    }
  }
}

async function seedDatabase() {
  await seedDemoUser();
  await seedMovies();
}

async function runSeedScript() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedDatabase();
    console.log("Banco populado com sucesso.");
  } catch (error) {
    console.error("Falha ao popular o banco:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  runSeedScript();
}

module.exports = {
  seedDatabase,
  demoMovies
};
