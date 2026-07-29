import Audit from "./audit.model.js";

export async function createAudit(data) {
    return Audit.create(data);
}
