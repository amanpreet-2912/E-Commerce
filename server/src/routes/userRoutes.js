import express from "express"
import { Router } from "express"
import { allowRoles } from "../middlewares/roleMiddleware.js"
import { checkToken } from "../middlewares/checkToken.js"
import { getAllProducts } from "../controllers/userController.js"
const router=Router()
// router.use(checkToken)
// router.use(allowRoles("user"));
router.get("/products",getAllProducts)
export default router;