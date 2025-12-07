import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    if (user) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Sign in to track your net worth and expenses.
                    </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Unlock your personal dashboard
                    </p>
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        Secure authentication powered by Google
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
