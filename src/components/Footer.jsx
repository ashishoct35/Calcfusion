const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16 py-8 no-print">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p className="text-sm mb-2">
                    Built with ❤️ for the FIRE community
                </p>
                <p className="text-xs mb-4">
                    Disclaimer: These calculators provide estimates only. Consult a financial advisor for personalized advice.
                </p>

                {/* Shrestha Consolidated Branding */}
                <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Powered by
                    </p>
                    <a
                        href="https://shresthaconsolidated.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-bold text-lg"
                    >
                        <span className="text-2xl">🏢</span>
                        Shrestha Consolidated
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Premium Web Development & Financial Tools
                    </p>
                </div>

                <p className="text-xs mt-4 text-gray-500 dark:text-gray-500">
                    © 2025 CalcfusionX. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
