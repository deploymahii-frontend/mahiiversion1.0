const steps = ["PLACED", "ACCEPTED", "PREPARING", "READY", "COMPLETED"];

export default function OrderTimeline({ status }) {
  const active = steps.indexOf(status);

  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">Order Progress</h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`w-5 h-5 rounded-full ${
                index <= active ? "bg-green-500" : "bg-gray-300"
              }`}
            />

            <span className={`font-medium ${index <= active ? "text-black" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
