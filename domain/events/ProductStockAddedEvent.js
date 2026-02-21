class ProductStockAddedEvent {
  constructor({
    entity,
    entityId,
    userId,
    userEmail,
    quantityAdded,
    previousStock,
    newStock,
    status,
    context,
    errorMessage = null
  }) {
    this.entity = entity;              // "Product"
    this.entityId = entityId;          // id do produto
    this.userId = userId;
    this.userEmail = userEmail;

    this.quantityAdded = quantityAdded;
    this.previousStock = previousStock;
    this.newStock = newStock;

    this.status = status;              // SUCCESS | BLOCKED | ERROR
    this.context = context;            // { ip, userAgent }
    this.errorMessage = errorMessage;

    this.occurredAt = new Date();
  }
}

module.exports = ProductStockAddedEvent;
