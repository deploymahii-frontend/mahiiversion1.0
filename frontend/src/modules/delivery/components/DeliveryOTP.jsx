export default function DeliveryOTP({ assignment, onVerify }) {
    return (
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Verify Delivery</h2>
            <input
                className="mb-4 w-full rounded border p-3"
                placeholder="Enter Customer OTP"
            />
            <button className="w-full rounded-full bg-blue-600 px-4 py-2 text-white">
                Verify & Complete
            </button>
        </div>
    );
}
