class AuditLogHandler {
  constructor(auditRepository) {
    this.auditRepository = auditRepository;
  }

  async handle(event) {
    await this.auditRepository.save({
      event: event.constructor.name,
      data: {
        userId: event.userId,
        reason: event.reason
      },
      occurredAt: event.occurredAt
    });
  }
}

module.exports = AuditLogHandler;
