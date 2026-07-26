import * as companyService from "./company.service.js";

export async function createCompany(req, res, next) {
    try {
        const company = await companyService.createCompany(req.body);
        return res.status(201).json({
            success: true,
            message: "Company created successfully.",
            data: company
        });
    } catch (error) {
        next(error);
    }
}

export async function getCompany(req, res, next) {
    try {
        const company = await companyService.getCompany(req.params.id);
        return res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        next(error);
    }
}

export async function getCompanies(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const companies = await companyService.getCompanies(page, limit);
        return res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCompany(req, res, next) {
    try {
        const company = await companyService.updateCompany(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Company updated successfully.",
            data: company
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteCompany(req, res, next) {
    try {
        await companyService.deleteCompany(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Company deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function searchCompanies(req, res, next) {
    try {
        const companies = await companyService.searchCompanies(req.query.q || "");
        return res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        next(error);
    }
}

export async function getCompanyStatistics(req, res, next) {
    try {
        const statistics = await companyService.getCompanyStatistics();
        return res.status(200).json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(error);
    }
}
