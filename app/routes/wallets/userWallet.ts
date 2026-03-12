import { Router } from "express";
import { createUserWallet } from "../../controllers/Wallet/userWallet";
import { authenticate } from "../../middlewares/middleware";
import { creditWallet } from "../../controllers/Wallet/transaction";


const router = Router();

router.post("/", authenticate, createUserWallet);
router.post("/:userId/credit", authenticate, creditWallet);

export default router;