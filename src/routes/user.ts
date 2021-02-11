import express from "express";
const router = express.Router();

router.get("/", function (_, res) {
  res.send("OK|USERS");
});
export default router;
