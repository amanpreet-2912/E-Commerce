import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import {
  getPendingRequests,
  approveRequest,
  getUsers,
  rejectRequest,
  getAllProducts,
  getAdminInfo,
  deleteProduct,
  getSingleProduct,
} from "../controllers/adminController.js";
const router = Router();
router.use(checkToken);
router.use(allowRoles("admin"));
router.get("/pending", getPendingRequests);
router.patch("/approve/:userId", approveRequest);
router.patch("/reject/:userId", rejectRequest);
router.get("/users", getUsers);
router.get("/products", getAllProducts);
router.get("/adminInfo", getAdminInfo);
router.delete("/products/:productId", deleteProduct);
router.get("/products/:productId", getSingleProduct);
export default router;
