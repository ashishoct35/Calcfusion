const Sidebar = () => {
    return (
        <aside className="space-y-6">
            {/* FIRE Philosophy Card */}
            <div className="card sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-2">💡</span>
                    What is FIRE?
                </h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        <strong className="text-gray-900 dark:text-gray-100">FIRE</strong> stands for{' '}
                        <span className="font-semibold">Financial Independence, Retire Early</span>.
                    </p>
                    <p>
                        The core principle: Save and invest aggressively to reach a point where your investments
                        generate enough passive income to cover your living expenses.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-3">
                        <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">The 4% Rule</p>
                        <p className="text-xs">
                            You can withdraw 4% of your portfolio annually without running out of money over 30 years.
                        </p>
                    </div>
                    <div className="space-y-2 mt-4">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">FIRE Multipliers:</p>
                        <ul className="text-xs space-y-1 ml-4">
                            <li>• <strong>25×</strong> - Standard (4% withdrawal)</li>
                            <li>• <strong>30×</strong> - Conservative (3.33%)</li>
                            <li>• <strong>20×</strong> - Aggressive (5%)</li>
                        </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs">
                            <strong>Example:</strong> If you spend $40,000/year, you need $1,000,000 (25× multiplier)
                            to reach FIRE.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800">
                <h4 className="font-bold mb-3 text-purple-900 dark:text-purple-300">💼 Quick Tips</h4>
                <ul className="text-xs space-y-2 text-gray-700 dark:text-gray-400">
                    <li>✓ Track your expenses accurately</li>
                    <li>✓ Account for inflation (typically 3-4%)</li>
                    <li>✓ Diversify investments</li>
                    <li>✓ Consider tax implications</li>
                    <li>✓ Review and adjust annually</li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
