const API_URL = "https://gestaoproapi.onrender.com";
const corsWhiteList = {
    development: [
      "http://localhost:3000"
    ],
    staging: [
      "https://staging.app.com"
    ],
    production: [
      "https://meuapp.com",
      API_URL
    ]
};

module.exports = corsWhiteList;
