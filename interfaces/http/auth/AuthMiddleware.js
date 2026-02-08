function AuthMiddleware(jwtService, allowedRoles = []) {
  return (req, res, next) => {
    try {
      // 1️⃣ Verifica se o header Authorization existe
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.warn("[AUTH] Nenhum Authorization header encontrado");
        return res.status(401).json({ error: "Token não enviado" });
      }

      // 2️⃣ Extrai o token do header
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader; // aceita caso alguém envie só o token

      if (!token) {
        console.warn("[AUTH] Token vazio");
        return res.status(401).json({ error: "Token inválido" });
      }

      console.log("[AUTH] Token recebido:", token);

      // 3️⃣ Verifica e decodifica o token
      const payload = jwtService.verifyAccessToken(token);
      console.log("[AUTH] Payload decodificado:", payload);

      // 4️⃣ Salva informações do usuário no request
      req.user = {
        id: payload.sub,
        role: payload.role
      };

      // 5️⃣ Validação de roles (opcional)
      if (allowedRoles.length > 0) {
        const allowed = allowedRoles.map(r => r.toUpperCase());
        const userRole = payload.role.toUpperCase();

        if (!allowed.includes(userRole)) {
          console.warn(`[AUTH] Role "${payload.role}" não autorizada`);
          return res.status(403).json({ error: "Acesso negado" });
        }
      }

      // ✅ Tudo ok, próximo middleware ou controller
      next();

    } catch (err) {
      // 6️⃣ Erros do JWT (expirado, inválido, secret errado)
      console.error("[AUTH] Token inválido:", err.message);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
}

module.exports = AuthMiddleware;
