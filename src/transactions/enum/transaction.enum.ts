export enum TransactionStatus {
    PENDING = "PENDING",
    SUCCESSFUL = "SUCCESSFUL",
    FAILED = "FAILED",
    REQUIRES_ACTION = "REQUIRES_ACTION",
}

export enum TransactionEvent {
    TRANSACTION_CREATED = "TRANSACTION_CREATED",
    TRANSACTION_UPDATED = "TRANSACTION_UPDATED",
}