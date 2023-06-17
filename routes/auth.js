import express from "express"
import { register, login } from "../controllers/auth.js"
const router = express.Router()

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/signup.html"));
  // res.send(__dirname);
});
router.post("/register",register)

router.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/signin.html"));
  // res.send(__dirname);
});
router.post("/login", login)

export default router