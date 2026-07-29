import * as designationService from "./designation.service.js";

export async function createDesignation(req, res, next) {
    try {
        const designation = await designationService.createDesignation(req.body);
        return res.status(201).json({
            success: true,
            message: "Designation created successfully.",
            data: designation
        });
    } catch (error) {
        next(error);
    }
}

export async function updateDesignation(req, res, next) {
    try {
        const designation = await designationService.updateDesignation(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Designation updated successfully.",
            data: designation
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteDesignation(req, res, next) {
    try {
        await designationService.deleteDesignation(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Designation deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function getDesignation(req, res, next) {
    try {
        const designation = await designationService.getDesignation(req.params.id);
        return res.status(200).json({
            success: true,
            data: designation
        });
    } catch (error) {
        next(error);
    }
}

export async function getDesignations(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const designations = await designationService.getDesignations(page, limit);
        return res.status(200).json({
            success: true,
            data: designations
        });
    } catch (error) {
        next(error);
    }
}

export async function searchDesignations(req, res, next) {
    try {
        const designations = await designationService.searchDesignations(req.query.q || "");
        return res.status(200).json({
            success: true,
            data: designations
        });
    } catch (error) {
        next(error);
    }
}

export async function getDesignationsByDepartment(req, res, next) {
    try {
        const designations = await designationService.getDesignationsByDepartment(req.params.departmentId);
        return res.status(200).json({
            success: true,
            data: designations
        });
    } catch (error) {
        next(error);
    }
}

export async function statistics(req, res, next) {
    try {
        const stats = await designationService.statistics();
        return res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        next(error);
    }
}
