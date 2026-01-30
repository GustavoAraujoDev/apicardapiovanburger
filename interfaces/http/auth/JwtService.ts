import jwt from "jsonwebtoken";
import { User }  from "../../../domain/entities/User";
import{ TokenService } from "../../../application/use-cases/services/TokenService";

export class JwtService implements TokenService {
  generateAccessToken(user: User): string {
    return jwt.sign(
      {
        sub: user.id,
        role: user.role,
        type: "USER"
      },
      process.env.JWT_PRIVATE_KEY!,
      {
        algorithm: "RS256",
        expiresIn: "5m",
        issuer: "fintech-auth",
        audience: "fintech-api"
      }
    );
  }

  async generateRefreshToken(user: User): Promise<string> {
    const token = crypto.randomUUID();
    // salva no banco com expiração
    return token;
  }

  verifyAccessToken(token: string) {
    return jwt.verify(
      token,
      process.env.JWT_PUBLIC_KEY!,
      { algorithms: ["RS256"] }
    );
  }
}
