import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/auth.service";
import { saveToken } from "../../utils/token";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUser, setAuthenticated, loading, setLoading } = useAuth();

    function redirectUser(user) {
        const role = user?.role?.name || user?.role;
        switch (role) {
            case "ADMIN":
                navigate("/");
                break;
            case "SHOP_OWNER":
                navigate("/shop");
                break;
            case "DELIVERY_PARTNER":
                navigate("/delivery");
                break;
            default:
                navigate("/");
        }
    }

    async function handleLogin(values) {
        try {
            setLoading(true);
            const response = await login(values);
            const data = response.data || response;
            saveToken(data.accessToken);
            setUser(data.user);
            setAuthenticated(true);
            toast.success("Login Successful");
            redirectUser(data.user);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Welcome to Mahii
                </h1>
                <p className="mb-8 text-gray-500">
                    Login to continue
                </p>
                <LoginForm onSubmit={handleLogin} loading={loading} />
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-yellow-600 font-semibold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
