import { Helmet } from 'react-helmet-async';
import FIRECalculator from '../components/calculators/FIRECalculator';
import Sidebar from '../components/Sidebar';
import FAQ from '../components/FAQ';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import RelatedCalculators from '../components/shared/RelatedCalculators';

const FIREPage = () => {
    const schemaData = {
        "name": "FIRE Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "description": "Calculate your Financial Independence, Retire Early (FIRE) number with inflation adjustments, safe withdrawal rates, and investment growth projections.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": "FIRE Number Calculation, Inflation Adjustment, Investment Projection, Safe Withdrawal Rate Analysis"
    };

    return (
        <>
            <Helmet>
                <title>FIRE Calculator: The Ultimate Financial Independence & Early Retirement Tool (2025)</title>
                <meta name="description" content="Plan your early retirement with our advanced FIRE Calculator. Features: Inflation adjustment, 4% rule analysis, Lean FIRE vs Fat FIRE scenarios, and investment growth tracking. Free & accurate." />
                <meta name="keywords" content="FIRE Calculator, Financial Independence Retire Early, Retirement Calculator, FIRE Number, 4% Rule, Safe Withdrawal Rate, Lean FIRE, Fat FIRE, Early Retirement Planning, Investment Calculator, Inflation Adjusted Retirement" />
                <meta property="og:title" content="FIRE Calculator: Plan Your Financial Freedom" />
                <meta property="og:description" content="Calculate your FIRE number with precision. Includes inflation, taxes, and withdrawal strategies." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://calcfusion.com/fire" />
            </Helmet>

            <SchemaMarkup type="SoftwareApplication" data={schemaData} />

            <div className="animate-fade-in">
                {/* Page Title */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        FIRE & Retirement Calculator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Your roadmap to Financial Independence and Early Retirement. Calculate exactly how much you need to retire on your terms.
                    </p>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Calculator */}
                    <div className="lg:col-span-3">
                        <FIRECalculator />

                        {/* SEO Content: Ultimate Guide */}
                        <div className="mt-16 prose dark:prose-invert max-w-none">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">The Ultimate Guide to FIRE (Financial Independence, Retire Early)</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">What is the FIRE Movement?</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            FIRE stands for <strong>Financial Independence, Retire Early</strong>. It's a lifestyle movement with the goal of gaining financial freedom and retiring early. The model is particularly popular among millennials, gaining traction through online communities via information shared in blogs, podcasts, and online discussion forums.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">How to Calculate Your FIRE Number</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            The standard FIRE number is calculated by multiplying your expected annual expenses by <strong>25</strong>. This is based on the <strong>4% Rule</strong>, which suggests you can withdraw 4% of your portfolio in the first year of retirement and adjust for inflation thereafter without running out of money for at least 30 years.
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Types of FIRE</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">Lean FIRE</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            For those willing to live a minimalist lifestyle. Annual expenses are typically very low (e.g., &lt; 20x average income).
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">Traditional FIRE</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Standard retirement lifestyle with moderate annual expenses, covering all basic needs and some wants.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">Fat FIRE</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            For those who want a luxurious retirement with high annual expenses, allowing for frequent travel and indulgences.
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Factors in FIRE Planning</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                    <li><strong>Savings Rate:</strong> The percentage of your income you save. A higher savings rate is the most important factor in achieving FIRE quickly.</li>
                                    <li><strong>Investment Returns:</strong> The growth of your portfolio over time. Historical stock market returns (adjusted for inflation) are typically around 7%.</li>
                                    <li><strong>Inflation:</strong> The rising cost of living. Our calculator adjusts for inflation to show you the "real" value of your money.</li>
                                    <li><strong>Withdrawal Rate:</strong> The percentage you take out each year. The 4% rule is standard, but 3.5% is safer for longer retirements (40+ years).</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <FAQ />
                </div>

                {/* Related Calculators */}
                <RelatedCalculators currentPath="/fire" />
            </div>
        </>
    );
};

export default FIREPage;
