import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/shared/Card';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const Homepage = () => {
    const schemaData = {
        "name": "CalcFusion",
        "url": "https://calcfusion.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://calcfusion.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const calculators = [
        {
            id: 'fire',
            title: 'FIRE & Retirement Calculator',
            icon: '🔥',
            description: 'Calculate your Financial Independence and Retirement Early (FIRE) number. Plan your retirement with precision using advanced features like inflation adjustment, one-time events, and sustainability analysis.',
            link: '/fire',
            features: ['FIRE Number Calculation', 'Retirement Planning', 'Inflation Adjustment', 'Sustainability Analysis']
        },
        {
            id: 'emi',
            title: 'EMI & Loan Calculator',
            icon: '🏦',
            description: 'All-in-one loan calculator supporting EMI calculation, mortgage planning, car loans, interest-only loans, prepayment analysis, and complete amortization schedules.',
            link: '/emi',
            features: ['EMI Calculation', 'Mortgage Planning', 'Car Loan Calculator', 'Amortization Schedule']
        },
        {
            id: 'bmi',
            title: 'BMI & Body Fat Calculator',
            icon: '⚖️',
            description: 'Advanced body composition analysis. Calculate BMI, Body Fat % (Navy Method), BMR, and TDEE. Get personalized advice for fat loss, muscle gain, or maintenance.',
            link: '/bmi',
            features: ['BMI & Body Fat %', 'Calorie Needs (TDEE)', 'Personalized Advice', 'Simple & Advanced Modes']
        }
    ];

    return (
        <>
            <Helmet>
                <title>CalcFusion - Free Financial Calculators for FIRE, EMI, Loans & Retirement</title>
                <meta name="description" content="Your one-stop destination for free financial calculators. Plan your early retirement with our FIRE calculator, or manage your debt with our advanced EMI and loan calculators. Accurate, free, and easy to use." />
                <meta name="keywords" content="financial calculator, FIRE calculator, EMI calculator, loan calculator, retirement calculator, mortgage calculator, financial planning tools, wealth building, debt management" />
                <meta property="og:title" content="CalcFusion: Master Your Financial Future" />
                <meta property="og:description" content="Free professional-grade financial calculators for retirement and debt planning." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://calcfusion.com" />
            </Helmet>

            <SchemaMarkup type="WebSite" data={schemaData} />

            <div className="space-y-12 animate-fade-in">
                {/* Hero Section */}
                <section className="text-center py-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        CalcFusion
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
                        Your Complete Financial Calculator Suite
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
                        Professional-grade financial calculators for retirement planning, loans, and wealth building.
                        Free, accurate, and easy to use.
                    </p>
                </section>

                {/* Calculator Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {calculators.map((calc) => (
                        <Link key={calc.id} to={calc.link} className="block group">
                            <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-5xl">{calc.icon}</div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {calc.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {calc.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {calc.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <span className="text-green-500 mr-2">✓</span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Call to Action */}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                                        Open Calculator
                                        <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </section>

                {/* Financial Roadmap Section (SEO Content) */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                        Your Roadmap to Financial Freedom
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-4">
                            <div className="text-4xl mb-4 bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">1</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Plan Your Retirement</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Use our <Link to="/fire" className="text-blue-600 hover:underline">FIRE Calculator</Link> to determine exactly how much you need to save to retire early. We account for inflation, investment growth, and safe withdrawal rates.
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl mb-4 bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400">2</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Manage Your Debt</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Before investing heavily, optimize your debt. Use our <Link to="/emi" className="text-blue-600 hover:underline">EMI Calculator</Link> to plan mortgage payments and see how extra payments can save you thousands in interest.
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl mb-4 bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">3</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Build Wealth</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Consistency is key. Track your savings rate and investment returns. Our tools help you visualize the power of compound interest and stay on track for your financial goals.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                        Why Choose CalcFusion?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Accurate</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Precise calculations using industry-standard formulas and best practices
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🌙</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Dark Mode</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Easy on the eyes with beautiful light and dark themes
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Mobile Ready</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Works perfectly on desktop, tablet, and mobile devices
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center py-12">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Ready to Plan Your Financial Future?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Choose a calculator above and start making informed financial decisions today
                    </p>
                </section>
            </div>
        </>
    );
};

export default Homepage;
