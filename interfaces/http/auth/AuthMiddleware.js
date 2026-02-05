function AuthMiddleware(jwtService) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).end();

    try {
      const payload = jwtService.verifyAccessToken(token);

      req.user = {
        id: payload.sub,
        role: payload.role
      };

      next();
    } catch {
      return res.status(401).end();
    }
  };
}

module.exports = AuthMiddleware;
