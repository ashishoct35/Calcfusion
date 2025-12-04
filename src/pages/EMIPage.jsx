import { Helmet } from 'react-helmet-async';
import LoanCalculator from '../components/calculators/LoanCalculator';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import RelatedCalculators from '../components/shared/RelatedCalculators';

const EMIPage = () => {
    const schemaData = {
        "name": "EMI & Loan Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "description": "Comprehensive loan calculator for EMI, mortgages, car loans, and interest-only loans. Includes amortization schedules and prepayment analysis.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": "EMI Calculation, Amortization Schedule, Prepayment Analysis, Mortgage Planning, Car Loan Calculator"
    };

    return (
        <>
            <Helmet>
                <title>EMI Calculator: All-in-One Loan, Mortgage & Car Payment Tool (2025)</title>
                <meta name="description" content="Calculate accurate EMIs for home loans, car loans, and personal loans. Features: Amortization schedule, extra payment calculator, interest-only mode, and detailed loan breakdown. Free & easy to use." />
                <meta name="keywords" content="EMI Calculator, Loan Calculator, Mortgage Calculator, Car Loan Calculator, Home Loan EMI, Personal Loan EMI, Amortization Schedule, Loan Prepayment, Interest Calculator, Finance Tools" />
                <meta property="og:title" content="EMI & Loan Calculator: Master Your Debt" />
                <meta property="og:description" content="Calculate monthly payments, total interest, and payoff time with our advanced loan calculator." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://calcfusion.com/emi" />
            </Helmet>

            <SchemaMarkup type="SoftwareApplication" data={schemaData} />

            <div className="animate-fade-in">
                {/* Page Title */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        EMI & Loan Calculator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Calculate monthly payments for home loans, car loans, personal loans & more with amortization schedules
                    </p>
                </section>

                {/* Calculator */}
                <LoanCalculator />

                {/* SEO Content Section */}
                <section className="mt-16 prose dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Complete Guide to Loans & EMIs</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">What is an EMI?</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    <strong>EMI (Equated Monthly Installment)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">How EMI is Calculated</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    The formula for EMI calculation is: <br />
                                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">EMI = [P x R x (1+R)^N]/[(1+R)^N-1]</code>
                                    <br />
                                    Where <strong>P</strong> is Principal, <strong>R</strong> is monthly interest rate, and <strong>N</strong> is tenure in months.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Strategies to Reduce Your Loan Burden</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-300">1. Make Prepayments</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Paying even one extra EMI per year can reduce your loan tenure by several years and save thousands in interest. Use our <strong>Extra Payment</strong> mode to see the impact.
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">2. Shorten the Tenure</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Opt for the shortest tenure you can afford. While EMIs will be higher, the total interest paid will be significantly lower.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
                                <h4 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300">3. Refinance</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    If interest rates drop, consider refinancing your loan to a lower rate. Ensure the processing fees don't outweigh the savings.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Understanding the Amortization Schedule</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Early Years:</strong> A large portion of your EMI goes towards interest.</li>
                            <li><strong>Later Years:</strong> A larger portion goes towards the principal balance.</li>
                            <li><strong>Impact of Extra Payments:</strong> Extra payments go directly towards the principal, bypassing interest and accelerating the loan payoff.</li>
                        </ul>
                    </div>
                </section>

                {/* Related Calculators */}
                <RelatedCalculators currentPath="/emi" />
            </div>
        </>
    );
};

export default EMIPage;
