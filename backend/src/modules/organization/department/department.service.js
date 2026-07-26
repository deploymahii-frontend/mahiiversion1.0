import departmentRepository from "./department.repository.js";
import { toDepartmentResponse } from "./department.mapper.js";

export async function createDepartment(data) {
    const department = await departmentRepository.create(data);
    return toDepartmentResponse(department);
}

export async function updateDepartment(id, data) {
    const department = await departmentRepository.findById(id);
    if (!department) {
        throw new Error("Department not found.");
    }

    const updated = await departmentRepository.update(id, data);
    return toDepartmentResponse(updated);
}

export async function deactivateDepartment(id) {
    const department = await departmentRepository.update(id, { status: "INACTIVE" });
    if (!department) {
        throw new Error("Department not found.");
    }
    return toDepartmentResponse(department);
}

export async function assignManager(id, managerId) {
    const department = await departmentRepository.findById(id);
    if (!department) {
        throw new Error("Department not found.");
    }
    const updated = await departmentRepository.update(id, { manager: managerId });
    return toDepartmentResponse(updated);
}

export async function getDepartment(id) {
    const department = await departmentRepository.findById(id);
    if (!department) {
        throw new Error("Department not found.");
    }
    return toDepartmentResponse(department);
}

export async function getDepartments(page, limit) {
    return departmentRepository.paginate({}, page, limit);
}

export async function getDepartmentsByCompany(companyId) {
    return departmentRepository.findByCompany(companyId);
}

export async function getDepartmentsByBranch(branchId) {
    return departmentRepository.findByBranch(branchId);
}

export async function searchDepartments(query) {
    return departmentRepository.search(query);
}

export async function deleteDepartment(id) {
    const deleted = await departmentRepository.update(id, { status: "INACTIVE" });
    if (!deleted) {
        throw new Error("Department not found.");
    }
    return { success: true };
}

export async function departmentStatistics() {
    return departmentRepository.statistics();
}
