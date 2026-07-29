import {
  FiPlus,
  FiEdit2,
  FiCopy,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

export default function SubscriptionPlans({
  loading,
  plans = [],
  onCreate,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Subscription Plans
          </h2>

          <p className="text-gray-500">
            Manage subscription offerings.
          </p>

        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Plan
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {plans.map((plan) => (

          <div
            key={plan.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-xl font-bold">
                {plan.name}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  plan.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {plan.status}
              </span>

            </div>

            <div className="mb-5">

              <div className="text-4xl font-bold">
                ₹{plan.price}
              </div>

              <div className="text-gray-500">
                {plan.billingCycle}
              </div>

            </div>

            <div className="space-y-2">

              {plan.features?.map((feature) => (

                <div
                  key={feature}
                  className="flex items-center gap-2"
                >
                  <FiCheckCircle className="text-green-600" />

                  <span>{feature}</span>

                </div>

              ))}

            </div>

            <div className="mt-6 flex flex-wrap gap-2">

              <button
                onClick={() => onEdit?.(plan)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                <FiEdit2 />
                Edit
              </button>

              <button
                onClick={() => onDuplicate?.(plan)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
              >
                <FiCopy />
                Copy
              </button>

              <button
                onClick={() => onDelete?.(plan)}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
              >
                <FiTrash2 />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
