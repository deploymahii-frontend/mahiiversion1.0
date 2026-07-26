import {
  FiPlus,
  FiEdit2,
  FiCopy,
  FiTrash2,
  FiTag,
} from "react-icons/fi";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-700",
  EXPIRED: "bg-red-100 text-red-700",
};

export default function CouponManager({
  loading,
  coupons = [],
  onCreate,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <FiTag size={24} />
          <div>
            <h2 className="text-2xl font-bold">
              Coupon Manager
            </h2>
            <p className="text-gray-500">
              Manage promotional coupons and discounts
            </p>
          </div>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Coupon
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Usage</th>
              <th>Expiry</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.map((coupon) => (

              <tr
                key={coupon.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-semibold">
                  {coupon.code}
                </td>

                <td>{coupon.discountType}</td>

                <td>
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </td>

                <td>
                  {coupon.usedCount} / {coupon.usageLimit}
                </td>

                <td>{coupon.expiryDate}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[coupon.status]
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onEdit?.(coupon)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onDuplicate?.(coupon)
                      }
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Duplicate"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() =>
                        onDelete?.(coupon)
                      }
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
