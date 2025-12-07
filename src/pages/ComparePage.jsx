import { Helmet } from 'react-helmet-async';
import FIRECompareCalculator from '../components/calculators/FIRECompareCalculator';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const ComparePage = () => {
    const schemaData = {
        "name": "FIRE Comparison Calculator",
        "description": "Compare two financial independence scenarios side-by-side. Analyze the impact of starting earlier, investing more, or changing returns.",
        "applicationCategory": "FinanceApplication"
    };

    return (
        <>
            <Helmet>
                <title>Compare FIRE Scenarios - Side by Side Analysis | Financify</title>
                <meta name="description" content="Compare two investment scenarios side-by-side. See how Step-up SIP, different interest rates, or starting age affects your wealth." />
            </Helmet>

            <SchemaMarkup type="SoftwareApplication" data={schemaData} />

            <div className="animate-fade-in max-w-6xl mx-auto">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        FIRE Scenario Comparison
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Pit two financial strategies against each other. Start early vs. earn more? Step-up SIP vs. Lump sum?
                    </p>
                </section>

                <div className="mb-12">
                    <FIRECompareCalculator />
                </div>
            </div>
        </>
    );
};

export default ComparePage;
