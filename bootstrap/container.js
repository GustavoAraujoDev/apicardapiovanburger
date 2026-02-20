// src/bootstrap/container.js

const EventDispatcher = require("../infra/audit/EventDispatcher");
const AuditLogHandler = require("../infra/audit/handlers/AuditLogHandler");
const AuditRepositoryMongo = require("../infra/repositories/AuditRepositoryMongo");

const eventDispatcher = new EventDispatcher();
const auditRepository = new AuditRepositoryMongo();

// 🔥 Registrar handlers
eventDispatcher.register(
  "ProductDeletedEvent",
  new AuditLogHandler(auditRepository)
);

eventDispatcher.register(
  "ProductCreateEvent",
  new AuditLogHandler(auditRepository)
);

module.exports = {
  eventDispatcher,
  auditRepository
};
