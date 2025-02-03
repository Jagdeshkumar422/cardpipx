import express from "express";
import {
  deposit,
  credit,
  getTransactions,
  depositTransactions,
  creditTransactions,
  rejectedTransactions,
  pendingTransactions,
} from "../Controller/Transaction.controller.js";
const router = express.Router();

//deposit Route
router.post("/deposit/:id", deposit);
router.post("/credit/:id", credit);
router.get("/getTransactions/:id", getTransactions);
router.get("/depositTransactions", depositTransactions);
router.get("/creditTransactions", creditTransactions);
router.get("/rejectedTransactions", rejectedTransactions);
router.get("/pendingTransactions", pendingTransactions);

export default router;
