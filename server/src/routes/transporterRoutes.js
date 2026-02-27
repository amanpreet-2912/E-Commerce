import {Router} from "express"
import { checkToken } from "../middlewares/checkToken.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { getOrders, updateStatus } from "../controllers/transporterController.js";

const router=Router();

router.use(checkToken)
router.use(allowRoles("transporter"))
router.get("/orders",getOrders)
router.patch("/status",updateStatus)

export default router;