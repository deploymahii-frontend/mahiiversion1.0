import designationRepository from "./designation.repository.js";
import { toDesignationResponse } from "./designation.mapper.js";

export async function createDesignation(data) {
    const designation = await designationRepository.create(data);
    return toDesignationResponse(designation);
}

export async function updateDesignation(id, data) {
    const designation = await designationRepository.findById(id);
    if (!designation) {
        throw new Error("Designation not found.");
    }

    const updated = await designationRepository.update(id, data);
    return toDesignationResponse(updated);
}

export async function deleteDesignation(id) {
    const deleted = await designationRepository.findById(id);
    if (!deleted) {
        throw new Error("Designation not found.");
    }

    await designationRepository.update(id, { status: "INACTIVE" });
    return { success: true };
}

export async function getDesignation(id) {
    const designation = await designationRepository.findById(id);
    if (!designation) {
        throw new Error("Designation not found.");
    }
    return toDesignationResponse(designation);
}

export async function getDesignations(page, limit) {
    return designationRepository.paginate({}, page, limit);
}

export async function searchDesignations(query) {
    return designationRepository.search(query);
}

export async function getDesignationsByDepartment(departmentId) {
    return designationRepository.findByDepartment(departmentId);
}

export async function statistics() {
    return designationRepository.statistics();
}
