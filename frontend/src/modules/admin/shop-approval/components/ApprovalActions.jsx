import React from "react";
import * as service from "../services/shopApproval.service";
import toast from "react-hot-toast";

export default function ApprovalActions({ shop }) {

    const handleApprove = async () => {
        try {
            await service.approveShop(shop._id, "Approved via admin");
            toast.success("Shop approved");
        } catch (e) {
            toast.error("Failed to approve");
        }
    };

    const handleReject = async () => {
        try {
            await service.rejectShop(shop._id, "Invalid documents");
            toast.success("Shop rejected");
        } catch (e) {
            toast.error("Failed to reject");
        }
    };

    const handleView = () => {
        // TODO: open modal with documents viewer
        toast("Open documents (not implemented)");
    };

    return (
        <div className="flex gap-2">
            <button onClick={handleView} className="px-3 py-1 bg-gray-100 rounded">View</button>
            <button onClick={handleApprove} className="px-3 py-1 bg-green-500 text-white rounded">Approve</button>
            <button onClick={handleReject} className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
        </div>
    );

}
