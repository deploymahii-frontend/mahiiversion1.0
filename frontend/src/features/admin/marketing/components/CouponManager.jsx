import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiCopy,
  FiToggleLeft,
  FiToggleRight,
  FiTag,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-700",
  EXPIRED: "bg-red-100 text-red-700",
};

export default function CouponManager({
  loading,
  coupons = [],
  onCreateCoupon,
  onEditCoupon,
  onDuplicateCoupon,
  onToggleCoupon,
}) {
  const [search, setSearch] = useState("");

  const filteredCoupons = useMemo(() => {
    if (!search.trim()) return coupons;

    return coupons.filter((coupon) =>
      [
        coupon.code,
        coupon.type,
        coupon.sponsor,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [coupons, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Coupon Manager
          </h2>
          <p className="text-gray-500">
            Create and manage promotional coupons.
          </p>
        </div>

        <button
          onClick={onCreateCoupon}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Coupon
        </button>

      </div>

      <div className="mb-6 relative max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search coupons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Coupon</th>
              <th className="text-left">Discount</th>
              <th className="text-left">Sponsor</th>
              <th className="text-left">Validity</th>
              <th className="text-left">Usage</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredCoupons.map((coupon) => (

              <tr
                key={coupon.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  <div className="font-semibold">
                    {coupon.code}
                  </div>

                  <div className="text-sm text-gray-500">
                    {coupon.type}
                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiTag />

                    {coupon.discount}

                  </div>

                </td>

                <td>{coupon.sponsor}</td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiCalendar />

                    {coupon.validUntil}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiBarChart2 />

                    {coupon.used}/{coupon.limit}

                  </div>

                </td>

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
                      onClick={() => onEditCoupon?.(coupon)}
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => onDuplicateCoupon?.(coupon)}
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Duplicate"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() => onToggleCoupon?.(coupon)}
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="Toggle Status"
                    >
                      {coupon.status === "ACTIVE" ? (
                        <FiToggleRight />
                      ) : (
                        <FiToggleLeft />
                      )}
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
