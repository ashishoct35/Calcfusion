import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What is the FIRE movement?',
            answer: 'FIRE (Financial Independence, Retire Early) is a lifestyle movement focused on extreme saving and investing to retire decades earlier than traditional retirement planning allows.'
        },
        {
            question: 'How much do I need to retire early?',
            answer: 'A common rule of thumb is to save 25-30 times your annual expenses. For example, if you spend $40,000 per year, you would need $1,000,000 - $1,200,000 invested.'
        },
        {
            question: 'What is the 4% rule?',
            answer: 'The 4% rule suggests you can withdraw 4% of your portfolio in the first year of retirement, adjust for inflation each subsequent year, and your money should last at least 30 years.'
        },
        {
            question: 'Should I account for inflation?',
            answer: 'Yes, absolutely. Inflation erodes purchasing power over time. Historical average inflation is around 3-4% annually. Our calculator adjusts for inflation to give you real-world projections.'
        },
        {
            question: 'What is a good expected return rate?',
            answer: 'Historical stock market returns average 7-10% annually, but a conservative estimate is 6-8% after inflation. Diversified portfolios with bonds might expect 5-7%.'
        },
        {
            question: 'What is Step-up SIP?',
            answer: 'Step-up SIP means increasing your monthly investment by a fixed percentage each year. For example, if you start with $500/month and step up 10% annually, you invest $550/month in year 2, $605 in year 3, and so on.'
        },
        {
            question: 'Can I include multiple income sources?',
            answer: 'Yes! Use the Advanced Mode to add multiple investment streams with different amounts and growth rates. This is useful for tracking salary investments, side hustles, and passive income.'
        },
        {
            question: 'How accurate are these calculations?',
            answer: 'These calculators use standard financial formulas and provide estimates based on your inputs. Actual results will vary based on market performance, inflation, life changes, and other factors. Always consult a financial advisor for personalized advice.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="card">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-500"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 animate-slide-down">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
