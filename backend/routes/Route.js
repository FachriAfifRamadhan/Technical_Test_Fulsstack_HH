import express from "express";
import {getUsers, doInsert, doUpdate, doDelete, doSearchUser} from "../controllers/Controller.js";



const router = express.Router();

router.get("/test", getUsers);
router.post("/test/post", doInsert);
router.patch("/test/patch/:id", doUpdate);
router.delete("/test/delete/:id", doDelete);
router.post("/test/search", doSearchUser);


export default router;