// src/bootstrap/container.js

const EventDispatcher = require("../infra/audit/EventDispatcher");
const AuditLogHandler = require("../infra/audit/handlers/AuditLogHandler");
const AuditRepositoryMongo = require("../infra/repositories/AuditRepositoryMongo");

const eventDispatcher = new EventDispatcher();
const auditRepository = new AuditRepositoryMongo();

const auditHandler = new AuditLogHandler(auditRepository);

// 🔥 Product Events
eventDispatcher.register(
  "ProductDeletedEvent",
  auditHandler
);

eventDispatcher.register(
  "ProductSoldEvent",
  auditHandler
);

eventDispatcher.register(
  "ProductStockAddedEvent",
  auditHandler
);

eventDispatcher.register(
  "ProductCreatedEvent",
  auditHandler
);

// 🔥 User Events
eventDispatcher.register(
  "UserBlocked",
  auditHandler
);

eventDispatcher.register(
  "UserLoggedIn",
  auditHandler
);

module.exports = {
  eventDispatcher,
  auditRepository
};
