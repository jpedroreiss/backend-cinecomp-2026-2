function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function validateUserRegistration(data) {
  const errors = [];

  if (isBlank(data.name)) errors.push("name e obrigatorio");
  if (!isBlank(data.name) && String(data.name).trim().length < 2) {
    errors.push("name deve ter pelo menos 2 caracteres");
  }
  if (isBlank(data.email)) errors.push("email e obrigatorio");
  if (!isBlank(data.email) && !isValidEmail(data.email)) {
    errors.push("email deve ser valido");
  }
  if (isBlank(data.password)) errors.push("password e obrigatorio");
  if (!isBlank(data.password) && String(data.password).length < 6) {
    errors.push("password deve ter pelo menos 6 caracteres");
  }

  return errors;
}

function validateUserUpdate(data) {
  const errors = [];

  if (Object.prototype.hasOwnProperty.call(data, "password")) {
    errors.push("password nao pode ser atualizado nesta rota");
  }
  if (Object.prototype.hasOwnProperty.call(data, "name")) {
    if (isBlank(data.name)) errors.push("name nao pode ficar vazio");
    if (!isBlank(data.name) && String(data.name).trim().length < 2) {
      errors.push("name deve ter pelo menos 2 caracteres");
    }
  }
  if (Object.prototype.hasOwnProperty.call(data, "email")) {
    if (isBlank(data.email)) errors.push("email nao pode ficar vazio");
    if (!isBlank(data.email) && !isValidEmail(data.email)) {
      errors.push("email deve ser valido");
    }
  }

  return errors;
}

function validateMovie(data, partial = false) {
  const errors = [];
  const requiredFields = ["title", "description", "genre", "director", "releaseYear", "rating"];

  if (!partial) {
    requiredFields.forEach((field) => {
      if (isBlank(data[field])) errors.push(`${field} e obrigatorio`);
    });
  }

  ["title", "description", "genre", "director"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(data, field) && isBlank(data[field])) {
      errors.push(`${field} nao pode ficar vazio`);
    }
  });

  if (Object.prototype.hasOwnProperty.call(data, "releaseYear")) {
    const year = Number(data.releaseYear);
    if (!Number.isInteger(year)) errors.push("releaseYear deve ser um numero");
  }

  if (Object.prototype.hasOwnProperty.call(data, "rating")) {
    const rating = Number(data.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 10) {
      errors.push("rating deve estar entre 0 e 10");
    }
  }

  return errors;
}

function normalizeMoviePayload(data) {
  const payload = { ...data };

  ["title", "description", "genre", "director", "posterUrl"].forEach((field) => {
    if (typeof payload[field] === "string") payload[field] = payload[field].trim();
  });

  if (Object.prototype.hasOwnProperty.call(payload, "releaseYear")) {
    payload.releaseYear = Number(payload.releaseYear);
  }
  if (Object.prototype.hasOwnProperty.call(payload, "rating")) {
    payload.rating = Number(payload.rating);
  }

  return payload;
}

module.exports = {
  isValidEmail,
  validateUserRegistration,
  validateUserUpdate,
  validateMovie,
  normalizeMoviePayload
};
