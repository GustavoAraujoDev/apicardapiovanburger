const API_URL = "https://gestaoapipro.onrender.com";
const corsWhiteList = {
    development: [
      "http://localhost:3000"
    ],
    staging: [
      "https://staging.app.com"
    ],
    production: [
      "https://apicardapiovanburger.onrender.com",
      "https://meuapp.com",
      API_URL
    ]
};

module.exports = corsWhiteList;
