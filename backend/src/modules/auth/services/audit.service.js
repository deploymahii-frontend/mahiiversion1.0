import AuditLog from "../models/auditLog.model.js";

export async function writeAuditLog({

    user,

    action,

    module,

    ipAddress,

    deviceId,

    metadata = {}

}) {

    return AuditLog.create({

        user,

        action,

        module,

        ipAddress,

        deviceId,

        metadata

    });

}
