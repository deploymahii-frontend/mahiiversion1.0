import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/auth.service";
import { saveToken } from "../../utils/token";
import { useAuth } from "../../context/AuthContext";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
    const navigate = useNavigate();
    const { setUser, setAuthenticated, loading, setLoading } = useAuth();

    async function handleSignup(values) {
        try {
            setLoading(true);
            const response = await signup(values);
            const data = response.data || response;
            if (data.accessToken) {
                saveToken(data.accessToken);
            }
            if (data.user) {
                setUser(data.user);
                setAuthenticated(true);
            }
            toast.success("Welcome to Mahii!");
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Signup Failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Create Account
                </h1>
                <p className="mb-6 text-gray-500">
                    Join Mahii to get started
                </p>
                <SignupForm onSubmit={handleSignup} loading={loading} />
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
