import { Link } from 'react-router-dom';
import { Moon, Sun, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

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
                                CalcFusion
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
                            FIRE Calculator
                        </Link>
                        <Link
                            to="/emi"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            EMI Calculator
                        </Link>
                        <Link
                            to="/bmi"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            BMI Calculator
                        </Link>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link
                            to="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <Home className="w-6 h-6" />
                        </Link>
                    </div>

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

                {/* Mobile Menu Links */}
                <div className="md:hidden mt-4 flex flex-wrap gap-3">
                    <Link
                        to="/fire"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        FIRE Calculator
                    </Link>
                    <Link
                        to="/emi"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        EMI Calculator
                    </Link>
                    <Link
                        to="/bmi"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        BMI Calculator
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
