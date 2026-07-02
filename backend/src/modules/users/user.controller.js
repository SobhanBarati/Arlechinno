import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import {
    getMyProfileService,
    updateProfileService,
    searchUsersService,
    getUserPresenceService
} from "./user.service.js";

export const getMyProfile = asyncHandler(
    async (req , res) => {
        const user = await getMyProfileService( req.user.userId );

        res.json({
            success: true,
            data: user,
        });
    }
);

export const updateProfile = asyncHandler(
    async(req , res) => {
        const user = await updateProfileService(req.user.userId , req.body);

        res.json({
            success: true,
            data: user,
        });
    }
);

export const searchUsers = asyncHandler(
    async(req , res) => {
        const users = await searchUsersService(req.query.q);

        res.json({
            success: true,
            data: users,
        });
    }
);

export const getUserPresence = asyncHandler(
    async(req , res , next) => {
        try {
            const presence = await getUserPresenceService(
                req.params.userId
            );
    
            res.status(200).json({
                success: true,
                data: presence,
            });

        } catch (error) {
            next(error);
        }
    }
)