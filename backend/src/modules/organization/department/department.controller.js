import * as departmentService from "./department.service.js";

export async function createDepartment(req, res, next) {
    try {
        const department = await departmentService.createDepartment(req.body);
        return res.status(201).json({
            success: true,
            message: "Department created successfully.",
            data: department
        });
    } catch (error) {
        next(error);
    }
}

export async function updateDepartment(req, res, next) {
    try {
        const department = await departmentService.updateDepartment(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Department updated successfully.",
            data: department
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteDepartment(req, res, next) {
    try {
        await departmentService.deleteDepartment(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Department deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function getDepartment(req, res, next) {
    try {
        const department = await departmentService.getDepartment(req.params.id);
        return res.status(200).json({
            success: true,
            data: department
        });
    } catch (error) {
        next(error);
    }
}

export async function getDepartments(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const departments = await departmentService.getDepartments(page, limit);
        return res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        next(error);
    }
}

export async function searchDepartments(req, res, next) {
    try {
        const departments = await departmentService.searchDepartments(req.query.q || "");
        return res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        next(error);
    }
}

export async function getDepartmentsByCompany(req, res, next) {
    try {
        const departments = await departmentService.getDepartmentsByCompany(req.params.companyId);
        return res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        next(error);
    }
}

export async function getDepartmentsByBranch(req, res, next) {
    try {
        const departments = await departmentService.getDepartmentsByBranch(req.params.branchId);
        return res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        next(error);
    }
}

export async function departmentStatistics(req, res, next) {
    try {
        const statistics = await departmentService.departmentStatistics();
        return res.status(200).json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(error);
    }
}
