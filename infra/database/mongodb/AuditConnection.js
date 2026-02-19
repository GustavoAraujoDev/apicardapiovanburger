// src/infrastructure/audit-db/auditConnection.js

const mongoose = require("mongoose");

const auditConnection = mongoose.createConnection(
  process.env.AUDIT_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

auditConnection.on("connected", () => {
  console.log("[AUDIT_DB] Connected");
});

auditConnection.on("error", (err) => {
  console.error("[AUDIT_DB_ERROR]", err);
});

module.exports = auditConnection;
