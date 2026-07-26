import * as auditRepository from "./audit.repository.js";

export async function logAudit(entry) {
    return auditRepository.createAudit(entry);
}
