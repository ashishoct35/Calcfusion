import { useState } from 'react';
import { Target, Download, Copy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Card from '../shared/Card';
import SavingsChart from './SavingsChart';

const SavingsGoalCalculator = () => {
    const [savingsTarget, setSavingsTarget] = useState(50000);
    const [timeAvailableYears, setTimeAvailableYears] = useState(5);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [returnRate, setReturnRate] = useState(7);
    const [showFormulas, setShowFormulas] = useState(false);
    const [results, setResults] = useState(null);

    const calculateSavings = () => {
        const monthlyRate = returnRate / 100 / 12;
        const months = timeAvailableYears * 12;

        // Calculate future value with current contribution
        let futureValue = 0;
        for (let month = 1; month <= months; month++) {
            futureValue += monthlyContribution;
            futureValue *= (1 + monthlyRate);
        }

        // Calculate time needed with current savings rate
        let timeNeededMonths = 0;
        let tempValue = 0;
        while (tempValue < savingsTarget && timeNeededMonths < 1200) { // Max 100 years
            tempValue += monthlyContribution;
            tempValue *= (1 + monthlyRate);
            timeNeededMonths++;
        }

        // Calculate required monthly savings
        // Using FV of annuity formula: FV = PMT × [((1 + r)^n - 1) / r]
        const requiredMonthly = monthlyRate !== 0
            ? savingsTarget / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate))
            : savingsTarget / months;

        // Generate projection data
        const projectionData = [];
        let invested = 0;
        let balance = 0;

        for (let month = 1; month <= Math.min(months, 600); month++) {
            invested += monthlyContribution;
            balance += monthlyContribution;
            balance *= (1 + monthlyRate);

            if (month % 12 === 0 || month === 1) {
                projectionData.push({
                    month,
                    year: month / 12,
                    invested,
                    balance,
                    interest: balance - invested
                });
            }
        }

        const totalInvested = monthlyContribution * months;
        const totalInterest = futureValue - totalInvested;
        const willReachGoal = futureValue >= savingsTarget;

        setResults({
            futureValue,
            totalInvested,
            totalInterest,
            timeNeededYears: timeNeededMonths / 12,
            requiredMonthly,
            willReachGoal,
            projectionData
        });
    };

    const reset = () => {
        setSavingsTarget(50000);
        setTimeAvailableYears(5);
        setMonthlyContribution(500);
        setReturnRate(7);
        setResults(null);
    };

    const downloadPDF = () => {
        window.print();
    };

    const copyResults = () => {
        if (!results) return;
        const text = `
Savings Goal Calculator Results
================================
Savings Target: $${savingsTarget.toLocaleString()}
-------------------------
Future Value (with current plan): $${results.futureValue.toLocaleString()}
Total Invested: $${results.totalInvested.toLocaleString()}
Total Interest Earned: $${results.totalInterest.toLocaleString()}
-------------------------
Time Needed (current rate): ${results.timeNeededYears.toFixed(1)} years
Required Monthly Savings: $${results.requiredMonthly.toLocaleString()}
Goal Status: ${results.willReachGoal ? 'ON TRACK ✅' : 'NEED MORE ⚠️'}
    `.trim();

        navigator.clipboard.writeText(text);
        alert('Results copied to clipboard!');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card title="Savings Goal Calculator" icon="🎯">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Savings Target"
                        value={savingsTarget}
                        onChange={setSavingsTarget}
                        min={0}
                        prefix="$"
                        tooltip="Your financial goal amount (e.g., emergency fund, down payment, vacation)"
                    />
                    <Input
                        label="Time Available"
                        value={timeAvailableYears}
                        onChange={setTimeAvailableYears}
                        min={0.25}
                        max={50}
                        step={0.25}
                        suffix="years"
                        tooltip="How many years you have to reach your goal"
                    />
                    <Input
                        label="Monthly Contribution"
                        value={monthlyContribution}
                        onChange={setMonthlyContribution}
                        min={0}
                        prefix="$"
                        tooltip="Amount you can save each month"
                    />
                    <Input
                        label="Expected Return Rate"
                        value={returnRate}
                        onChange={setReturnRate}
                        min={0}
                        max={30}
                        step={0.1}
                        suffix="%"
                        tooltip="Annual return on your savings (0% for cash, 3-4% for high-yield savings, 6-8% for investments)"
                    />
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    <Button onClick={calculateSavings}>
                        <Target className="w-5 h-5 inline mr-2" />
                        Calculate Goal
                    </Button>
                    <Button variant="secondary" onClick={reset}>
                        <RotateCcw className="w-5 h-5 inline mr-2" />
                        Reset
                    </Button>
                    {results && (
                        <>
                            <Button variant="secondary" onClick={downloadPDF} className="no-print">
                                <Download className="w-5 h-5 inline mr-2" />
                                Download PDF
                            </Button>
                            <Button variant="secondary" onClick={copyResults} className="no-print">
                                <Copy className="w-5 h-5 inline mr-2" />
                                Copy Results
                            </Button>
                            <Button variant="secondary" onClick={() => setShowFormulas(!showFormulas)} className="no-print">
                                {showFormulas ? <EyeOff className="w-5 h-5 inline mr-2" /> : <Eye className="w-5 h-5 inline mr-2" />}
                                {showFormulas ? 'Hide' : 'Show'} Formulas
                            </Button>
                        </>
                    )}
                </div>
            </Card>

            {/* Results */}
            {results && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-300 dark:border-blue-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Savings Target</div>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                                ${savingsTarget.toLocaleString()}
                            </div>
                        </Card>

                        <Card className={`bg-gradient-to-br border-2 ${results.willReachGoal ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'}`}>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Future Value</div>
                            <div className={`text-3xl font-bold ${results.willReachGoal ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                                ${results.futureValue.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {results.willReachGoal ? '✅ ON TRACK' : '⚠️ NEED MORE'}
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-300 dark:border-purple-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest Earned</div>
                            <div className="text-3xl font-bold text-purple-900 dark:text-purple-300">
                                ${results.totalInterest.toLocaleString()}
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-300 dark:border-indigo-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Needed (Current Rate)</div>
                            <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">
                                {results.timeNeededYears.toFixed(1)} years
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {Math.ceil(results.timeNeededYears * 12)} months
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 border-2 border-pink-300 dark:border-pink-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Required Monthly Savings</div>
                            <div className="text-2xl font-bold text-pink-900 dark:text-pink-300">
                                ${results.requiredMonthly.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                to reach goal in {timeAvailableYears} years
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 border-2 border-teal-300 dark:border-teal-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</div>
                            <div className="text-3xl font-bold text-teal-900 dark:text-teal-300">
                                ${results.totalInvested.toLocaleString()}
                            </div>
                        </Card>
                    </div>

                    {/* Chart */}
                    <Card title="Savings Growth Projection" icon="📈">
                        <SavingsChart data={results.projectionData} target={savingsTarget} />
                    </Card>

                    {/* Projection Table */}
                    <Card title="Year-by-Year Projection" icon="📊">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Year</th>
                                        <th className="px-4 py-2 text-right">Total Invested</th>
                                        <th className="px-4 py-2 text-right">Account Balance</th>
                                        <th className="px-4 py-2 text-right">Interest Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.projectionData.filter(row => row.month % 12 === 0).map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-4 py-2">{row.year.toFixed(0)}</td>
                                            <td className="px-4 py-2 text-right">${row.invested.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right font-semibold">${row.balance.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right text-green-600 dark:text-green-400">${row.interest.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Insights */}
                    <Card title="💡 Insights" className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-300 dark:border-yellow-700">
                        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                            {results.willReachGoal ? (
                                <>
                                    <p className="flex items-start">
                                        <span className="mr-2">✅</span>
                                        <span>Great! You're on track to reach your ${savingsTarget.toLocaleString()} goal in {timeAvailableYears} years with ${monthlyContribution}/month.</span>
                                    </p>
                                    <p className="flex items-start">
                                        <span className="mr-2">💰</span>
                                        <span>You'll earn ${results.totalInterest.toLocaleString()} in interest, which is {((results.totalInterest / results.totalInvested) * 100).toFixed(1)}% of your total investment.</span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="flex items-start">
                                        <span className="mr-2">⚠️</span>
                                        <span>At your current savings rate, you'll have ${results.futureValue.toLocaleString()} in {timeAvailableYears} years, which is ${(savingsTarget - results.futureValue).toLocaleString()} short of your goal.</span>
                                    </p>
                                    <p className="flex items-start">
                                        <span className="mr-2">💡</span>
                                        <span>To reach your goal, consider:</span>
                                    </p>
                                    <ul className="ml-8 space-y-1 text-xs">
                                        <li>• Increase monthly savings to ${results.requiredMonthly.toLocaleString()}</li>
                                        <li>• Extend your timeline to {results.timeNeededYears.toFixed(1)} years</li>
                                        <li>• Look for investments with higher returns (carefully!)</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </Card>

                    {/* Formulas */}
                    {showFormulas && (
                        <Card title="Calculation Formulas" icon="📐" className="bg-gray-50 dark:bg-gray-800/50">
                            <div className="space-y-3 text-sm font-mono">
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Future Value of Annuity:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        FV = PMT × [((1 + r)^n - 1) / r]
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Where: PMT = Monthly Payment, r = Monthly Rate, n = Number of Months</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Required Monthly Savings:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        PMT = FV / [((1 + r)^n - 1) / r]
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Total Interest Earned:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        Interest = Future Value - Total Invested
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default SavingsGoalCalculator;
