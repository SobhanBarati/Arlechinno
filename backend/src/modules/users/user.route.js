import express from "express";

import {
    getMyProfile,
    updateProfile,
    searchUsers,
    getUserPresence
} from "./user.controller.js";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/me",
    authMiddleware,
    getMyProfile
);

router.patch(
    "/me",
    authMiddleware,
    updateProfile,
);

router.get(
    "/search",
    authMiddleware,
    searchUsers,
);

router.get(
    "/:userId/presence",
    authMiddleware,
    getUserPresence
);

export default router;