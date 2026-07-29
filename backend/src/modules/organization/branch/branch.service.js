import branchRepository from "./branch.repository.js";
import { toBranchResponse } from "./branch.mapper.js";

export async function createBranch(data) {
    const branch = await branchRepository.create(data);
    return toBranchResponse(branch);
}

export async function updateBranch(id, data) {
    const branch = await branchRepository.findById(id);
    if (!branch) {
        throw new Error("Branch not found.");
    }

    const updated = await branchRepository.update(id, data);
    return toBranchResponse(updated);
}

export async function deactivateBranch(id) {
    const branch = await branchRepository.update(id, { status: "INACTIVE" });
    if (!branch) {
        throw new Error("Branch not found.");
    }
    return toBranchResponse(branch);
}

export async function assignManager(id, managerId) {
    const branch = await branchRepository.findById(id);
    if (!branch) {
        throw new Error("Branch not found.");
    }
    const updated = await branchRepository.update(id, { manager: managerId });
    return toBranchResponse(updated);
}

export async function getBranch(id) {
    const branch = await branchRepository.findById(id);
    if (!branch) {
        throw new Error("Branch not found.");
    }
    return toBranchResponse(branch);
}

export async function getBranches(page, limit) {
    return branchRepository.paginate({}, page, limit);
}

export async function getBranchesByCompany(companyId) {
    return branchRepository.findByCompany(companyId);
}

export async function searchBranches(query) {
    return branchRepository.search(query);
}

export async function deleteBranch(id) {
    const deleted = await branchRepository.delete(id);
    if (!deleted) {
        throw new Error("Branch not found.");
    }
    return { success: true };
}

export async function getBranchStatistics() {
    return branchRepository.paginate();
}
