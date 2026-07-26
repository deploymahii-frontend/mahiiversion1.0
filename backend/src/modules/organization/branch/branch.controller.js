import * as branchService from "./branch.service.js";

export async function createBranch(req, res, next) {
    try {
        const branch = await branchService.createBranch(req.body);
        return res.status(201).json({
            success: true,
            message: "Branch created successfully.",
            data: branch
        });
    } catch (error) {
        next(error);
    }
}

export async function getBranch(req, res, next) {
    try {
        const branch = await branchService.getBranch(req.params.id);
        return res.status(200).json({
            success: true,
            data: branch
        });
    } catch (error) {
        next(error);
    }
}

export async function getBranches(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const branches = await branchService.getBranches(page, limit);
        return res.status(200).json({
            success: true,
            data: branches
        });
    } catch (error) {
        next(error);
    }
}

export async function updateBranch(req, res, next) {
    try {
        const branch = await branchService.updateBranch(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Branch updated successfully.",
            data: branch
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteBranch(req, res, next) {
    try {
        await branchService.deleteBranch(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Branch deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function getBranchesByCompany(req, res, next) {
    try {
        const branches = await branchService.getBranchesByCompany(req.params.companyId);
        return res.status(200).json({
            success: true,
            data: branches
        });
    } catch (error) {
        next(error);
    }
}

export async function searchBranches(req, res, next) {
    try {
        const branches = await branchService.searchBranches(req.query.q || "");
        return res.status(200).json({
            success: true,
            data: branches
        });
    } catch (error) {
        next(error);
    }
}

export async function getBranchStatistics(req, res, next) {
    try {
        const statistics = await branchService.getBranchStatistics();
        return res.status(200).json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(error);
    }
}
