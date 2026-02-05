const jwt = require("jsonwebtoken");
const User = require("../../../domain/entities/user");
const TokenService = require("../../../application/use-cases/services/TokenService");
const { urlencoded } = require("body-parser");

class JwtService extends TokenService {
  generateAccessToken(user) {
    return jwt.sign(
      {
        sub: user.id,
        role: user.role,
        type: "USER"
      },
      process.env.JWT_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "5m",
        issuer: "fintech-auth",
        audience: "fintech-api"
      }
    );
  }

  async generateRefreshToken(user){
    const token = crypto.randomUUID();
    // salva no banco com expiração
    return token;
  }

  verifyAccessToken(token) {
    return jwt.verify(
      token,
      process.env.JWT_PUBLIC_KEY,
      { algorithms: ["RS256"] }
    );
  }
}

module.exports = JwtService;