import { Link } from 'react-router-dom';
import Card from './Card';

const RelatedCalculators = ({ currentPath }) => {
    const calculators = [
        {
            path: '/fire',
            title: 'FIRE Calculator',
            icon: '🔥',
            description: 'Plan your early retirement'
        },
        {
            path: '/emi',
            title: 'EMI Calculator',
            icon: '🏦',
            description: 'Calculate loan payments'
        },
        {
            path: '/bmi',
            title: 'BMI Calculator',
            icon: '⚖️',
            description: 'Track body composition'
        }
    ];

    const related = calculators.filter(calc => calc.path !== currentPath);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Explore More Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((calc) => (
                    <Link key={calc.path} to={calc.path} className="block group">
                        <Card className="h-full transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{calc.icon}</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {calc.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {calc.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedCalculators;
