import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Net Worth Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Welcome back, {user?.displayName}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Add Transaction</span>
                    </button>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-3 h-3" />
                            +2.5%
                        </span>
                    </div>
                    <p className="text-blue-100 text-sm font-medium mb-1">Total Net Worth</p>
                    <h3 className="text-3xl font-bold">$0.00</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Assets</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$0.00</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <ArrowDownRight className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Liabilities</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$0.00</h3>
                </div>
            </div>

            {/* Placeholder for Chart/List */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        No financial data yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Start tracking your assets and liabilities to see your net worth growth over time.
                    </p>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                        Add Your First Asset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
