import mongoose from "mongoose";

const depositTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    secretCode: {
      type: Number,
      required: true,
    },
    walletId: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      enum: [300, 500, 1000],
    },
    screenshot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
    TransactionType: {
      type: String,
      default: "Deposit",
    },
  },
  { timestamps: true }
);

const DepositTransaction = new mongoose.model(
  "DepositTransaction",
  depositTransactionSchema
);

export default DepositTransaction;
