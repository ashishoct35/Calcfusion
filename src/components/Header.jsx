import { Link } from 'react-router-dom';
import { Moon, Sun, Home, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/50 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="text-3xl group-hover:scale-110 transition-transform">
                            🧮
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Financify
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Financial Calculator Suite
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            <Home className="w-5 h-5" />
                            All Calculators
                        </Link>
                        <Link
                            to="/fire"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            FIRE
                        </Link>
                        <Link
                            to="/emi"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            EMI
                        </Link>
                        <Link
                            to="/bmi"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            BMI
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Auth Section */}
                        {/* Auth Section - Only show on Financify subdomain */}
                        {window.location.hostname.includes('financify') && (
                            user ? (
                                <div className="flex items-center gap-3 mr-2">
                                    <div className="hidden sm:flex flex-col items-end">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {user.displayName}
                                        </span>
                                    </div>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName}
                                            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors mr-2"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                            )
                        )}


                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5 text-gray-700" />
                            ) : (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Links */}
                <div className="md:hidden mt-4 flex flex-wrap gap-3 justify-center">
                    <Link
                        to="/fire"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                    >
                        FIRE
                    </Link>
                    <Link
                        to="/emi"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                    >
                        EMI
                    </Link>
                    <Link
                        to="/bmi"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                    >
                        BMI
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
