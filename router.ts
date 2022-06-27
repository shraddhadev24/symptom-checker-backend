import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { diagnos } from "./controllers/diagnos";
import { symptoms } from "./controllers/symptoms";
import { migration } from "./migration";

swaggerDocument.host = process.env.HOST || "";
const router = express.Router();

router.post("/diagnos", diagnos);
router.get("/symptoms", symptoms);
router.get("/migration", migration);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
