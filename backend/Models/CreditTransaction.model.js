import mongoose from "mongoose";

const CreditTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    agentService: {
      type: String,
      enum: ["KOWRI OVA", "EXPRESS OVA"],
      required: true,
    },
    networkProvider: {
      type: String,
      enum: ["MTN", "Telecel", "AirtelTigo"],
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    withdrawalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
    TransactionType: {
      type: String,
      default: "Credit",
    },
  },
  { timestamps: true }
);

const CreditTransaction = new mongoose.model(
  "CreditTransaction",
  CreditTransactionSchema
);

export default CreditTransaction;
