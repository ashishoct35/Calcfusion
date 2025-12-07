import { useState, useEffect } from 'react';
import { TrendingUp, RotateCcw } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { calculateFIREScenario } from '../../utils/fireLogic';

const ComparisonInputGroup = ({ label, id, scenarioA, scenarioB, handleChange, suffix, prefix, tooltip, min, max, step }) => {
    return (
        <div className="grid grid-cols-12 gap-2 items-center mb-4">
            <div className="col-span-12 md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" title={tooltip}>
                    {label}
                </label>
            </div>
            <div className="col-span-6 md:col-span-4">
                <Input
                    value={scenarioA[id]}
                    onChange={(val) => handleChange('A', id, val)}
                    min={min} max={max} step={step}
                    suffix={suffix} prefix={prefix}
                    className="w-full text-blue-600 font-semibold"
                />
            </div>
            <div className="col-span-6 md:col-span-4">
                <Input
                    value={scenarioB[id]}
                    onChange={(val) => handleChange('B', id, val)}
                    min={min} max={max} step={step}
                    suffix={suffix} prefix={prefix}
                    className="w-full text-purple-600 font-semibold"
                />
            </div>
        </div>
    );
};

const FIRECompareCalculator = () => {
    const initialState = {
        currentAge: 30,
        retirementAge: 50,
        monthlyInvestment: 2000,
        annualReturn: 8,
        withdrawalRate: 4,
        inflationRate: 3,
        yearsInRetirement: 40,
        monthlyBudget: 3000,
        lumpSum: 0,
        stepUpSIP: 0,
        contributionGrowth: 0,
        postRetirementReturn: 6,
        fireMultiplier: 25,
        healthcareInflation: 0,
        additionalIncomeYear: 0,
        additionalIncomeAmount: 0,
        additionalExpenseYear: 0,
        additionalExpenseAmount: 0
    };

    const [currency, setCurrency] = useState('$');
    const [scenarioA, setScenarioA] = useState({ ...initialState });
    const [scenarioB, setScenarioB] = useState({ ...initialState, monthlyInvestment: 5000, currentAge: 25 }); // Slightly different default
    const [resultA, setResultA] = useState(null);
    const [resultB, setResultB] = useState(null);

    const handleChange = (scenario, field, value) => {
        if (scenario === 'A') {
            setScenarioA(prev => ({ ...prev, [field]: value }));
        } else {
            setScenarioB(prev => ({ ...prev, [field]: value }));
        }
    };

    const calculateBoth = () => {
        setResultA(calculateFIREScenario(scenarioA));
        setResultB(calculateFIREScenario(scenarioB));
    };

    // Auto-calculate on mount
    useEffect(() => {
        calculateBoth();
    }, []);

    const formatMoney = (val) => `${currency}${Math.round(val).toLocaleString()}`;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Legend */}
            <div className="grid grid-cols-12 gap-4 text-center sticky top-[72px] z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="col-span-12 md:col-span-4 text-left md:text-right font-bold text-gray-500 flex items-center justify-start md:justify-end">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">PARAMETERS</span>
                </div>
                <div className="col-span-6 md:col-span-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-xl font-bold border border-blue-200 dark:border-blue-700">
                        SCENARIO A
                    </div>
                </div>
                <div className="col-span-6 md:col-span-4">
                    <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-xl font-bold border border-purple-200 dark:border-purple-700">
                        SCENARIO B
                    </div>
                </div>
            </div>

            <Card>
                <div className="space-y-1">
                    {/* Currency Input - Global for comparison */}
                    <div className="grid grid-cols-12 gap-2 items-center mb-4">
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" title="Currency Symbol">
                                Currency Symbol
                            </label>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <Input
                                type="text"
                                value={currency}
                                onChange={setCurrency}
                                placeholder="e.g., $, NPR, €, ₹"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <ComparisonInputGroup label="Current Age" id="currentAge" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} min={18} max={90} />
                    <ComparisonInputGroup label="Retirement Age" id="retirementAge" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} min={18} max={90} />
                    <ComparisonInputGroup label="Monthly Investment" id="monthlyInvestment" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} prefix={currency} />
                    <ComparisonInputGroup label="Lump Sum" id="lumpSum" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} prefix={currency} />
                    <ComparisonInputGroup label="Annual Return (%)" id="annualReturn" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} suffix="%" step={0.1} />
                    <ComparisonInputGroup label="Step-up SIP (%)" id="stepUpSIP" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} suffix="%" />
                    <ComparisonInputGroup label="Monthly Budget (Today)" id="monthlyBudget" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} prefix={currency} />

                    <div className="my-6 border-t border-gray-100 dark:border-gray-800"></div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Advanced Parameters</h4>

                    <ComparisonInputGroup label="Inflation Rate" id="inflationRate" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} suffix="%" step={0.1} />
                    <ComparisonInputGroup label="Withdrawal Rate" id="withdrawalRate" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} suffix="%" step={0.1} />
                    <ComparisonInputGroup label="Post-Retirement Return" id="postRetirementReturn" scenarioA={scenarioA} scenarioB={scenarioB} handleChange={handleChange} suffix="%" step={0.1} />
                </div>

                <div className="flex justify-center mt-8 gap-4">
                    <Button onClick={calculateBoth} className="w-full md:w-auto px-12 py-3 text-lg shadow-xl shadow-blue-500/20">
                        <TrendingUp className="w-5 h-5 inline mr-2" />
                        Compare Scenarios
                    </Button>
                </div>
            </Card>

            {/* Comparison Results */}
            {resultA && resultB && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Comparison Verdict
                    </h3>

                    {/* Winner Highlight */}
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-2xl border border-green-200 dark:border-green-800">
                        <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">Which plan builds more wealth?</p>
                        <div className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-300">
                            {resultA.corpusAtRetirement > resultB.corpusAtRetirement
                                ? "Scenario A wins by " + formatMoney(resultA.corpusAtRetirement - resultB.corpusAtRetirement)
                                : "Scenario B wins by " + formatMoney(resultB.corpusAtRetirement - resultA.corpusAtRetirement)
                            }
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800 text-sm uppercase text-gray-500 dark:text-gray-400">
                                        <th className="py-4 px-6 text-left">Metric</th>
                                        <th className="py-4 px-6 text-right bg-blue-50/50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300">Scenario A</th>
                                        <th className="py-4 px-6 text-right bg-purple-50/50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300">Scenario B</th>
                                        <th className="py-4 px-6 text-right">Difference</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                                    <tr>
                                        <td className="py-4 px-6 font-medium">Total Invested</td>
                                        <td className="py-4 px-6 text-right font-mono text-blue-600">{formatMoney(resultA.totalInvested)}</td>
                                        <td className="py-4 px-6 text-right font-mono text-purple-600">{formatMoney(resultB.totalInvested)}</td>
                                        <td className="py-4 px-6 text-right font-mono text-gray-500">{formatMoney(Math.abs(resultA.totalInvested - resultB.totalInvested))}</td>
                                    </tr>
                                    <tr className="bg-gray-50/30 dark:bg-gray-800/30">
                                        <td className="py-4 px-6 font-bold">Final Corpus</td>
                                        <td className="py-4 px-6 text-right font-bold text-xl text-blue-700">{formatMoney(resultA.corpusAtRetirement)}</td>
                                        <td className="py-4 px-6 text-right font-bold text-xl text-purple-700">{formatMoney(resultB.corpusAtRetirement)}</td>
                                        <td className={`py-4 px-6 text-right font-bold ${Math.abs(resultA.corpusAtRetirement - resultB.corpusAtRetirement) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                                            {formatMoney(Math.abs(resultA.corpusAtRetirement - resultB.corpusAtRetirement))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium">Inflation Adjusted</td>
                                        <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-400">{formatMoney(resultA.inflationAdjustedCorpus)}</td>
                                        <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-400">{formatMoney(resultB.inflationAdjustedCorpus)}</td>
                                        <td className="py-4 px-6 text-right text-gray-500">-</td>
                                    </tr>
                                    <tr className="bg-gray-50/30 dark:bg-gray-800/30">
                                        <td className="py-4 px-6 font-medium">Monthly Passive Income</td>
                                        <td className="py-4 px-6 text-right text-blue-600">{formatMoney(resultA.safeWithdrawalMonthly)}</td>
                                        <td className="py-4 px-6 text-right text-purple-600">{formatMoney(resultB.safeWithdrawalMonthly)}</td>
                                        <td className="py-4 px-6 text-right text-green-600 font-medium">
                                            {formatMoney(Math.abs(resultA.safeWithdrawalMonthly - resultB.safeWithdrawalMonthly))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium">Sustainability (Money Lasts)</td>
                                        <td className={`py-4 px-6 text-right font-bold ${resultA.sustainable ? 'text-green-600' : 'text-red-600'}`}>
                                            {resultA.sustainable ? 'Full Retirement ✅' : `${resultA.moneyLastsYears.toFixed(1)} years ⚠️`}
                                        </td>
                                        <td className={`py-4 px-6 text-right font-bold ${resultB.sustainable ? 'text-green-600' : 'text-red-600'}`}>
                                            {resultB.sustainable ? 'Full Retirement ✅' : `${resultB.moneyLastsYears.toFixed(1)} years ⚠️`}
                                        </td>
                                        <td className="py-4 px-6 text-right text-gray-500">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detailed Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Scenario A Cards */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                                Scenario A Details
                            </h3>

                            {/* FIRE Status A */}
                            <Card className={`bg-gradient-to-br border-2 ${resultA.isFIRE ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-300 dark:border-red-700'}`}>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">FIRE Status</div>
                                <div className={`text-2xl font-bold ${resultA.isFIRE ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
                                    {resultA.isFIRE ? '✅ ABOVE FIRE' : '⚠️ BELOW FIRE'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Target: {formatMoney(resultA.fireNumber)}
                                </div>
                            </Card>

                            {/* Sustainability A */}
                            <Card className={`bg-gradient-to-br border-2 ${resultA.sustainable ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'}`}>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retirement Sustainability</div>
                                <div className={`text-xl font-bold ${resultA.sustainable ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                                    {resultA.sustainable ? '✅ Sustainable' : '⚠️ Needs Adjustment'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Money lasts: {resultA.moneyLastsYears.toFixed(1)} years
                                </div>
                            </Card>

                            {/* Withdrawal A */}
                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-300 dark:border-purple-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Safe Withdrawal (Annual)</div>
                                <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                                    {formatMoney(resultA.safeWithdrawal)}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Monthly: {formatMoney(resultA.safeWithdrawalMonthly)}
                                </div>
                            </Card>

                            {/* Years A */}
                            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-300 dark:border-indigo-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Years to FIRE</div>
                                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">
                                    {scenarioA.retirementAge - scenarioA.currentAge} years
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Age {scenarioA.currentAge} → {scenarioA.retirementAge}
                                </div>
                            </Card>
                        </div>

                        {/* Scenario B Cards */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center text-purple-700 dark:text-purple-400 mb-4 bg-purple-50 dark:bg-purple-900/20 py-2 rounded-lg border border-purple-200 dark:border-purple-800">
                                Scenario B Details
                            </h3>

                            {/* FIRE Status B */}
                            <Card className={`bg-gradient-to-br border-2 ${resultB.isFIRE ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-300 dark:border-red-700'}`}>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">FIRE Status</div>
                                <div className={`text-2xl font-bold ${resultB.isFIRE ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
                                    {resultB.isFIRE ? '✅ ABOVE FIRE' : '⚠️ BELOW FIRE'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Target: {formatMoney(resultB.fireNumber)}
                                </div>
                            </Card>

                            {/* Sustainability B */}
                            <Card className={`bg-gradient-to-br border-2 ${resultB.sustainable ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'}`}>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retirement Sustainability</div>
                                <div className={`text-xl font-bold ${resultB.sustainable ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                                    {resultB.sustainable ? '✅ Sustainable' : '⚠️ Needs Adjustment'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Money lasts: {resultB.moneyLastsYears.toFixed(1)} years
                                </div>
                            </Card>

                            {/* Withdrawal B */}
                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-300 dark:border-purple-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Safe Withdrawal (Annual)</div>
                                <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                                    {formatMoney(resultB.safeWithdrawal)}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Monthly: {formatMoney(resultB.safeWithdrawalMonthly)}
                                </div>
                            </Card>

                            {/* Years B */}
                            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-300 dark:border-indigo-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Years to FIRE</div>
                                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">
                                    {scenarioB.retirementAge - scenarioB.currentAge} years
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Age {scenarioB.currentAge} → {scenarioB.retirementAge}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FIRECompareCalculator;
