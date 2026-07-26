import { beforeEach, describe, expect, it, vi } from "vitest";

import { applyLeave, approveLeave } from "../src/modules/hr/leave/leave.service.js";
import employeeRepository from "../src/modules/hr/employees/employee.repository.js";
import leaveRepository from "../src/modules/hr/leave/leave.repository.js";

vi.mock("../src/modules/hr/employees/employee.repository.js", () => ({
    default: {
        findById: vi.fn()
    }
}));

vi.mock("../src/modules/hr/leave/leave.repository.js", () => ({
    default: {
        create: vi.fn(),
        findById: vi.fn(),
        findByEmployee: vi.fn(),
        findPending: vi.fn(),
        approve: vi.fn(),
        reject: vi.fn(),
        cancel: vi.fn(),
        paginate: vi.fn(),
        statistics: vi.fn(),
        findConflicts: vi.fn()
    }
}));

describe("Leave service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("rejects leave requests with an invalid date range", async () => {
        employeeRepository.findById.mockResolvedValue({ _id: "emp-1" });

        await expect(
            applyLeave({
                employee: "emp-1",
                leaveType: "CASUAL",
                fromDate: new Date("2025-01-10"),
                toDate: new Date("2025-01-05"),
                totalDays: 2,
                reason: "Family event"
            })
        ).rejects.toThrow("Invalid leave dates.");
    });

    it("rejects approving a leave that is missing", async () => {
        leaveRepository.findById.mockResolvedValue(null);

        await expect(approveLeave("leave-1", "emp-1")).rejects.toThrow(
            "Leave request not found."
        );
    });
});
