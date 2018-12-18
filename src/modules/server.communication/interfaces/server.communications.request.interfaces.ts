export interface IGameStateSubscriptionRequest {
    userId: string;
    tableId: string;
    // gameId: mongoose.Schema.Types.ObjectId; I think that we don't need this property
}
