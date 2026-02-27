import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { validate } from "../middlewares/schemaValidator.js";
import { productSchema } from "../zodSchemas/product.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import {
  createProduct,
  getProducts,
  deleteProduct,
  viewProduct,
  updateProduct,
} from "../controllers/sellerController.js";
import { checkStatus } from "../middlewares/statusMiddleware.js";
import { upload } from "../middlewares/upload.js";
const router = Router();
router.use(checkToken);
router.use(allowRoles("seller"));
router.use(checkStatus);
router.get("/products", getProducts);
router.post(
  "/products",
  upload.array("images", 5),
  // validate(productSchema),
  createProduct,
);
router.get("/product/:productId", viewProduct);
router.delete(
  "/products/:productId",
  deleteProduct,
);
router.put("/product/:productId",updateProduct)
export default router;
