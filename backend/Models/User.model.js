import mongoose from "mongoose";
import DepositTransaction from "./DepositTransaction.model.js";
import CreditTransaction from "./CreditTransaction.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter()); // Get the user being deleted
  if (user) {
    await DepositTransaction.deleteMany({ userId: user._id });
    await CreditTransaction.deleteMany({ userId: user._id });
  }
  next();
});

const User = new mongoose.model("User", userSchema);

export default User;
