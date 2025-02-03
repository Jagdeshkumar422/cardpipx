import CreditTransaction from "../Models/CreditTransaction.model.js";
import DepositTransaction from "../Models/DepositTransaction.model.js";
import DepositeTransaction from "../Models/DepositTransaction.model.js";
import User from "../Models/User.model.js";
import { errorHandler } from "../utils/Error.js";

export const deposit = async (req, res, next) => {
  try {
    let { tokenId, secretCode, walletId, amount, screenshot } = req.body;

    // Validate required fields
    if (
      !tokenId ||
      tokenId === "" ||
      secretCode === undefined ||
      secretCode === "" ||
      walletId === undefined ||
      walletId === "" ||
      !amount ||
      amount === "" ||
      !screenshot ||
      screenshot === ""
    ) {
      return next(errorHandler(400, "All fields are required."));
    }

    // Validate tokenId length
    if (tokenId.length < 12) {
      return next(
        errorHandler(
          400,
          "Token Id should be equal or greater than 12 characters."
        )
      );
    }

    // Convert secretCode, walletId, and amount to numbers
    secretCode = Number(secretCode);
    amount = Number(amount);

    // Validate that secretCode is a 4-digit number
    if (isNaN(secretCode) || secretCode < 1000 || secretCode > 9999) {
      return next(errorHandler(400, "Secret code must be exactly 4 digits."));
    }

    // Validate that walletId is a 10-digit number
    if (!/^\d{10}$/.test(walletId)) {
      return next(errorHandler(400, "Wallet ID must be exactly 10 digits."));
    }

    // Validate allowed amounts
    const allowedAmounts = [300, 500, 1000];
    if (!allowedAmounts.includes(amount)) {
      return next(
        errorHandler(
          400,
          "Amount must be one of the following values: 300, 500, or 1000."
        )
      );
    }

    // Create a new Transaction document, including secretCode and walletId as numbers
    const depositTransaction = new DepositeTransaction({
      userId: req.params.id,
      tokenId,
      secretCode,
      walletId,
      amount,
      screenshot,
      // status defaults to "pending" as per the model
    });

    // Save the transaction to the database
    await depositTransaction.save();

    // Respond with a success message and the transaction data
    res.status(201).json({
      success: true,
      message: "Request Sent.",
      depositTransaction,
    });
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const credit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      accountName,
      agentService,
      networkProvider,
      accountNumber,
      withdrawalAmount,
    } = req.body;

    // Validate required fields
    if (
      !accountName ||
      accountName.trim() === "" ||
      !agentService ||
      agentService.trim() === "" ||
      !networkProvider ||
      networkProvider.trim() === "" ||
      !accountNumber ||
      accountNumber.trim() === "" ||
      !withdrawalAmount ||
      withdrawalAmount.trim() === ""
    ) {
      return next(errorHandler(400, "All fields are required."));
    }

    // Validate agentService value
    const validAgentServices = ["KOWRI OVA", "EXPRESS OVA"];
    if (!validAgentServices.includes(agentService)) {
      return next(
        errorHandler(
          400,
          "Invalid agent service. Allowed values: 'KOWRI OVA', 'EXPRESS OVA'."
        )
      );
    }

    // Validate networkProvider value
    const validNetworkProviders = ["MTN", "Telecel", "AirtelTigo"];
    if (!validNetworkProviders.includes(networkProvider)) {
      return next(
        errorHandler(
          400,
          "Invalid network provider. Allowed values: 'MTN', 'Telecel', 'AirtelTigo'."
        )
      );
    }

    // Ensure accountNumber is a 10-digit string
    if (!/^\d{10}$/.test(accountNumber)) {
      return next(
        errorHandler(400, "Account number must be exactly 10 digits.")
      );
    }

    // Validate withdrawal amount
    if (withdrawalAmount < 3000) {
      return next(
        errorHandler(400, "Withdrawal amount must be at least 3000.")
      );
    }

    const user = await User.findById(id);
    if (user.totalBalance < withdrawalAmount) {
      return next(
        errorHandler(
          404,
          "The withdrawal amount exceeds your available balance."
        )
      );
    }

    // Create a new credit transaction
    const creditTransaction = new CreditTransaction({
      userId: req.params.id,
      accountName,
      agentService,
      networkProvider,
      accountNumber,
      withdrawalAmount,
      status: "pending", // Default status
      TransactionType: "Credit", // Default type
    });

    // Save the transaction to the database
    await creditTransaction.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Credit transaction request submitted successfully.",
      transaction: creditTransaction,
    });
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const getTransactions = async (req, res, next) => {
  const { id } = req.params;
  try {
    const depositTransactions = await DepositeTransaction.find({
      userId: id,
    });
    const creditTransactions = await CreditTransaction.find({ userId: id });

    const allTransactions = [...depositTransactions, ...creditTransactions];

    // Sort transactions by createdAt in ascending order (oldest first)
    allTransactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json(allTransactions);
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const depositTransactions = async (req, res, next) => {
  try {
    const deposit = await DepositTransaction.find({})
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(deposit);
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const creditTransactions = async (req, res, next) => {
  try {
    const credit = await CreditTransaction.find({})
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(credit);
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const rejectedTransactions = async (req, res, next) => {
  try {
    const deposit = await DepositTransaction.find({
      status: "rejected",
    }).populate("userId");
    const credit = await CreditTransaction.find({
      status: "rejected",
    }).populate("userId");
    const rejectedTransactions = [...deposit, ...credit].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort newest first
    );
    res.status(200).json(rejectedTransactions);
  } catch (error) {
    next(error);
  }
};

//!---------------------------------------------------------------------

export const pendingTransactions = async (req, res, next) => {
  try {
    const deposit = await DepositTransaction.find({
      status: "pending",
    }).populate("userId");
    const credit = await CreditTransaction.find({
      status: "pending",
    }).populate("userId");
    const pendingTransactions = [...deposit, ...credit].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort newest first
    );
    res.status(200).json(pendingTransactions);
  } catch (error) {
    next(error);
  }
};
