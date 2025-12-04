import { Helmet } from 'react-helmet-async';
import BMICalculator from '../components/calculators/BMICalculator';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const BMIPage = () => {
    const schemaData = {
        "name": "Advanced BMI & Body Fat Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "description": "Calculate your BMI, Body Fat %, BMR, and daily calorie needs with our advanced dual-mode calculator. Get personalized fitness advice based on your goals.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": "BMI Calculation, Body Fat % (Navy Method), BMR Calculation, TDEE Calculation, Personalized Fitness Advice"
    };

    return (
        <>
            <Helmet>
                <title>Advanced BMI & Body Fat Calculator | CalcFusion</title>
                <meta name="description" content="Calculate your Body Mass Index (BMI), Body Fat %, and daily calorie requirements. Features personalized advice for weight loss, muscle gain, and maintenance. Free & accurate." />
                <meta name="keywords" content="BMI calculator, body fat calculator, BMR calculator, calorie calculator, TDEE calculator, weight loss calculator, muscle gain calculator, US Navy Method, body composition" />
                <meta property="og:title" content="Advanced BMI & Body Fat Calculator: Know Your Numbers" />
                <meta property="og:description" content="Get a complete analysis of your body composition and calorie needs with our professional-grade calculator." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://calcfusion.com/bmi" />
            </Helmet>

            <SchemaMarkup type="SoftwareApplication" data={schemaData} />

            <div className="animate-fade-in">
                {/* Page Title */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        BMI & Body Fat Calculator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Analyze your body composition and get a personalized roadmap for your fitness journey
                    </p>
                </section>

                {/* Calculator */}
                <BMICalculator />

                {/* SEO Content Section */}
                <section className="mt-16 prose dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Ultimate Guide to Body Composition</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Why BMI Isn't Enough</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    <strong>BMI (Body Mass Index)</strong> is a simple calculation based on height and weight. While useful for the general population, it fails to distinguish between muscle and fat. An athlete with high muscle mass might be classified as "Overweight" by BMI, despite having low body fat.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">The Power of Body Fat %</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    <strong>Body Fat Percentage</strong> is a superior health metric. It tells you exactly how much of your weight is fat tissue versus lean mass (muscle, bones, water). Our calculator uses the <strong>US Navy Method</strong>, which is widely respected for its accuracy using simple tape measurements.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Understanding Your Calorie Needs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-2 text-orange-800 dark:text-orange-300">BMR (Basal Metabolic Rate)</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    The calories your body burns at complete rest just to keep you alive (breathing, heartbeat, etc.).
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
                                <h4 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300">TDEE (Total Daily Energy Expenditure)</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Your BMR plus the calories burned through daily activity and exercise. This is your "Maintenance" level.
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">Caloric Deficit/Surplus</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    To lose fat, eat below your TDEE (Deficit). To gain muscle, eat slightly above your TDEE (Surplus).
                                </p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">How to Measure for Accuracy</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Neck:</strong> Measure just below the Adam's apple (men) or at the mid-neck (women).</li>
                            <li><strong>Waist:</strong> Measure at the navel (belly button) for men, and at the narrowest point for women.</li>
                            <li><strong>Hips (Women only):</strong> Measure at the widest part of the buttocks.</li>
                            <li><strong>Tip:</strong> Use a flexible tape measure and keep it snug but not tight against the skin.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
};

export default BMIPage;
