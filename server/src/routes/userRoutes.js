import { Router } from "express";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { checkToken } from "../middlewares/checkToken.js";
import {
  addAddress,
  addToCart,
  buyNow,
  createOrder,
  getAddresses,
  getAllProducts,
  getCart,
  getOrders,
  getSingleProduct,
  removeFromCart,
  setDefaultAddress,
  updateCartQuantity,
} from "../controllers/userController.js";
import { getAllCategories } from "../controllers/adminController.js";
const router = Router();
router.use(checkToken);
router.use(allowRoles("user"));
router.get("/cart", getCart);
router.post("/cart", addToCart);
router.get("/products", getAllProducts);
router.put("/cart/:productId", updateCartQuantity);
router.delete("/cart/:productId", removeFromCart);
router.get("/categories", getAllCategories);
router.get("/product/:productId", getSingleProduct);
router.post("/cart/checkout", createOrder);
router.get("/orders", getOrders);
router.post("/address", addAddress);
router.get("/addresses", getAddresses);
router.put("/cart/address", setDefaultAddress);
router.post("/order", buyNow);
export default router;
