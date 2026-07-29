export default function PasswordStrength({ password = "" }) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500"
    ];

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="h-1.5 w-full rounded bg-gray-200 overflow-hidden">
                <div
                    className={`h-1.5 transition-all duration-300 ${colors[score - 1] || "bg-gray-200"}`}
                    style={{
                        width: `${score * 25}%`
                    }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Password Strength: {["Weak", "Fair", "Good", "Strong"][score - 1] || "Very Weak"}
            </p>
        </div>
    );
}
