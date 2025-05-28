// import express from "express";
// import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();
// router.get("/test", (req, res) => {
//   res.json({ message: "✅ Auth routes working" });
// });

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);
// // Example in Express

// {/*router.put("/api/auth/update-profile", protectRoute, updateProfile);*/}
// {/*router.put("/api/auth/update-profile", verifyTokenMiddleware, updateProfile);*/}

// router.get("/check", protectRoute, checkAuth);

import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "✅ Auth routes working" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

