// src/bootstrap/container.js

const EventDispatcher = require("../infra/audit/EventDispatcher");
const AuditLogHandler = require("../infra/audit/handler/AuditLogHandler");
const AuditRepositoryMongo = require("../infra/repository/AuditRepositoryMongo");

const eventDispatcher = new EventDispatcher();
const auditRepository = new AuditRepositoryMongo();

// 🔥 Registrar handlers
eventDispatcher.register(
  "ProductDeletedEvent",
  new AuditLogHandler(auditRepository)
);

module.exports = {
  eventDispatcher,
  auditRepository
};
