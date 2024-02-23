import Router from "express";
import CanvasController from "../canvas-controller.js";
const router = new Router();
const canavsConroller = CanvasController;

router.post("/createRoom", canavsConroller.createNewRoom);
router.get("/getIds", canavsConroller.showRooms);
router.post("/image", canavsConroller.saveState);
router.post("/initImage", canavsConroller.shareState);

export default router;