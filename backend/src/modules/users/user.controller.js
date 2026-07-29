import * as userService from "./user.service.js";

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

export async function createUser(req, res, next) {
    try {

        const user = await userService.createUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Get User
|--------------------------------------------------------------------------
*/

export async function getUser(req, res, next) {
    try {

        const user = await userService.getUser(req.params.id);

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

export async function getUsers(req, res, next) {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const users = await userService.getUsers(page, limit);

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Search Users
|--------------------------------------------------------------------------
*/

export async function searchUsers(req, res, next) {
    try {

        const users = await userService.searchUsers(req.query.q || "");

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

export async function updateUser(req, res, next) {
    try {

        const user = await userService.updateUser(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: user
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

export async function deleteUser(req, res, next) {
    try {

        await userService.deleteUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Activate User
|--------------------------------------------------------------------------
*/

export async function activateUser(req, res, next) {
    try {

        const user = await userService.activateUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User activated successfully.",
            data: user
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Suspend User
|--------------------------------------------------------------------------
*/

export async function suspendUser(req, res, next) {
    try {

        const user = await userService.suspendUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User suspended successfully.",
            data: user
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export async function updateProfile(req, res, next) {
    try {

        const profile = await userService.updateProfile(
            req.user.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: profile
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function getDashboardStatistics(req, res, next) {
    try {

        const statistics =
            await userService.getDashboardStatistics();

        return res.status(200).json({
            success: true,
            data: statistics
        });

    } catch (error) {
        next(error);
    }
}
