export default function TwoFactorCard({

    enabled,

    onToggle,

}) {

    return (

        <div className="bg-white rounded-xl p-6 flex justify-between items-center">

            <div>

                <h2 className="font-bold text-lg">

                    Two-Factor Authentication

                </h2>

                <p className="text-gray-500">

                    Secure your account with OTP verification.

                </p>

            </div>

            <button
                onClick={onToggle}
                className={`px-5 py-2 rounded ${
                    enabled
                        ? "bg-green-600 text-white"
                        : "bg-gray-300"
                }`}
            >

                {enabled ? "Enabled" : "Enable"}

            </button>

        </div>

    );

}
