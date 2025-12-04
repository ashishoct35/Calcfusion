import { useState } from 'react';
import { TrendingUp, Download, Copy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Card from '../shared/Card';
import AdvancedSection from '../shared/AdvancedSection';
import ResultsChart from './ResultsChart';

const FIRECalculator = () => {
    // Simple Mode State
    const [currency, setCurrency] = useState('$');
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(50);
    const [monthlyInvestment, setMonthlyInvestment] = useState(2000);
    const [annualReturn, setAnnualReturn] = useState(8);
    const [withdrawalRate, setWithdrawalRate] = useState(4);
    const [inflationRate, setInflationRate] = useState(3);
    const [yearsInRetirement, setYearsInRetirement] = useState(40);
    const [monthlyBudget, setMonthlyBudget] = useState(3000);

    // Advanced Mode State - empty strings to avoid leading zero display
    const [lumpSum, setLumpSum] = useState('');
    const [contributionGrowth, setContributionGrowth] = useState('');
    const [stepUpSIP, setStepUpSIP] = useState('');
    const [postRetirementReturn, setPostRetirementReturn] = useState(6);
    const [fireMultiplier, setFireMultiplier] = useState(25);
    const [healthcareInflation, setHealthcareInflation] = useState('');

    // One-time events - empty strings to avoid leading zero display
    const [additionalIncomeYear, setAdditionalIncomeYear] = useState('');
    const [additionalIncomeAmount, setAdditionalIncomeAmount] = useState('');
    const [additionalExpenseYear, setAdditionalExpenseYear] = useState('');
    const [additionalExpenseAmount, setAdditionalExpenseAmount] = useState('');

    // UI State
    const [showFormulas, setShowFormulas] = useState(false);
    const [results, setResults] = useState(null);

    const calculateFIRE = () => {
        const years = retirementAge - currentAge;
        const monthlyRate = annualReturn / 100 / 12;
        const effectiveStepUp = (parseFloat(stepUpSIP) || 0) / 100;

        let totalInvested = parseFloat(lumpSum) || 0;
        let corpus = parseFloat(lumpSum) || 0;
        let currentMonthly = monthlyInvestment;

        const yearlyData = [];

        // Accumulation Phase
        for (let year = 0; year < years; year++) {
            for (let month = 0; month < 12; month++) {
                corpus += currentMonthly;
                totalInvested += currentMonthly;
                corpus *= (1 + monthlyRate);
            }

            // Apply one-time additional income
            const incomeYear = parseFloat(additionalIncomeYear) || 0;
            const incomeAmount = parseFloat(additionalIncomeAmount) || 0;
            if (incomeYear > 0 && (currentAge + year + 1) === incomeYear) {
                corpus += incomeAmount;
            }

            // Apply one-time additional expense
            const expenseYear = parseFloat(additionalExpenseYear) || 0;
            const expenseAmount = parseFloat(additionalExpenseAmount) || 0;
            if (expenseYear > 0 && (currentAge + year + 1) === expenseYear) {
                corpus -= expenseAmount;
            }

            // Apply step-up at year end
            currentMonthly *= (1 + effectiveStepUp);

            // Apply contribution growth
            const growth = parseFloat(contributionGrowth) || 0;
            if (growth > 0) {
                currentMonthly *= (1 + growth / 100);
            }

            yearlyData.push({
                year: currentAge + year + 1,
                age: currentAge + year + 1,
                invested: totalInvested,
                corpus: corpus,
                type: 'accumulation'
            });
        }

        const corpusAtRetirement = corpus;

        // IMPORTANT: Adjust monthly budget from today's value to retirement age value
        const inflationMultiplierToRetirement = Math.pow(1 + inflationRate / 100, years);
        const inflationAdjustedMonthlyBudget = monthlyBudget * inflationMultiplierToRetirement;
        const annualExpenses = inflationAdjustedMonthlyBudget * 12;

        const fireNumber = annualExpenses * fireMultiplier;
        const safeWithdrawal = corpusAtRetirement * (withdrawalRate / 100);
        const isFIRE = corpusAtRetirement >= fireNumber;

        // Inflation adjustment for display
        const inflationMultiplier = Math.pow(1 + inflationRate / 100, years);
        const inflationAdjustedCorpus = corpusAtRetirement / inflationMultiplier;

        // Retirement Phase - Sustainability Check
        let retirementCorpus = corpusAtRetirement;
        const postRetMonthlyRate = postRetirementReturn / 100 / 12;
        const healthcareInflationRate = parseFloat(healthcareInflation) || 0;
        const inflationMonthlyRate = (inflationRate + healthcareInflationRate) / 100 / 12;
        let currentWithdrawal = inflationAdjustedMonthlyBudget; // Start with inflation-adjusted budget
        let moneyLastsYears = yearsInRetirement;

        for (let year = 0; year < yearsInRetirement; year++) {
            for (let month = 0; month < 12; month++) {
                retirementCorpus -= currentWithdrawal;
                if (retirementCorpus <= 0) {
                    moneyLastsYears = year + month / 12;
                    retirementCorpus = 0;
                    break;
                }
                retirementCorpus *= (1 + postRetMonthlyRate);
                currentWithdrawal *= (1 + inflationMonthlyRate);
            }

            if (retirementCorpus > 0) {
                yearlyData.push({
                    year: retirementAge + year + 1,
                    age: retirementAge + year + 1,
                    corpus: retirementCorpus,
                    type: 'retirement',
                    withdrawal: currentWithdrawal * 12
                });
            }

            if (retirementCorpus <= 0) break;
        }

        const sustainable = moneyLastsYears >= yearsInRetirement;

        // --- Earliest Retirement Calculation ---
        let earliestRetirementAge = null;
        const targetEndAge = retirementAge + yearsInRetirement;

        // Only calculate if current plan is sustainable or close to it
        if (sustainable || moneyLastsYears > (yearsInRetirement * 0.8)) {
            for (let testAge = currentAge + 1; testAge < retirementAge; testAge++) {
                let testCorpus = parseFloat(lumpSum) || 0;
                let testMonthly = monthlyInvestment;
                let testTotalInvested = parseFloat(lumpSum) || 0;
                const testYearsAccumulation = testAge - currentAge;

                // 1. Accumulate until testAge
                for (let y = 0; y < testYearsAccumulation; y++) {
                    for (let m = 0; m < 12; m++) {
                        testCorpus += testMonthly;
                        testTotalInvested += testMonthly;
                        testCorpus *= (1 + monthlyRate);
                    }

                    // Apply One-time events during accumulation
                    const currentYear = currentAge + y + 1;
                    const incomeYear = parseFloat(additionalIncomeYear) || 0;
                    const incomeAmount = parseFloat(additionalIncomeAmount) || 0;
                    if (incomeYear > 0 && currentYear === incomeYear) testCorpus += incomeAmount;

                    const expenseYear = parseFloat(additionalExpenseYear) || 0;
                    const expenseAmount = parseFloat(additionalExpenseAmount) || 0;
                    if (expenseYear > 0 && currentYear === expenseYear) testCorpus -= expenseAmount;

                    testMonthly *= (1 + effectiveStepUp);
                    const growth = parseFloat(contributionGrowth) || 0;
                    if (growth > 0) testMonthly *= (1 + growth / 100);
                }

                // 2. Simulate Retirement from testAge until targetEndAge
                let testRetirementCorpus = testCorpus;
                const yearsToCover = targetEndAge - testAge;

                // Calculate inflation-adjusted budget at testAge
                const inflationAtTestAge = Math.pow(1 + inflationRate / 100, testYearsAccumulation);
                let testWithdrawal = monthlyBudget * inflationAtTestAge;

                let isFeasible = true;
                for (let y = 0; y < yearsToCover; y++) {
                    for (let m = 0; m < 12; m++) {
                        testRetirementCorpus -= testWithdrawal;
                        if (testRetirementCorpus <= 0) {
                            isFeasible = false;
                            break;
                        }
                        testRetirementCorpus *= (1 + postRetMonthlyRate);
                        testWithdrawal *= (1 + inflationMonthlyRate);
                    }
                    if (!isFeasible) break;
                }

                if (isFeasible) {
                    earliestRetirementAge = testAge;
                    break; // Found the earliest age!
                }
            }
        }

        setResults({
            earliestRetirementAge,
            totalInvested,
            corpusAtRetirement,
            inflationAdjustedCorpus,
            safeWithdrawal,
            safeWithdrawalMonthly: safeWithdrawal / 12,
            fireNumber,
            isFIRE,
            moneyLastsYears: sustainable ? yearsInRetirement : moneyLastsYears,
            sustainable,
            yearlyData,
            inflationAdjustedMonthlyBudget // Store for display
        });
    };

    const reset = () => {
        setCurrency('$');
        setCurrentAge(30);
        setRetirementAge(50);
        setMonthlyInvestment(2000);
        setAnnualReturn(8);
        setWithdrawalRate(4);
        setInflationRate(3);
        setYearsInRetirement(40);
        setMonthlyBudget(3000);
        setLumpSum('');
        setContributionGrowth('');
        setStepUpSIP('');
        setPostRetirementReturn(6);
        setFireMultiplier(25);
        setHealthcareInflation('');
        setAdditionalIncomeYear('');
        setAdditionalIncomeAmount('');
        setAdditionalExpenseYear('');
        setAdditionalExpenseAmount('');
        setResults(null);
    };

    const downloadPDF = () => {
        window.print();
    };

    const copyResults = () => {
        if (!results) return;
        const text = `
FIRE Calculator Results
=======================
Total Invested: ${currency}${Math.round(results.totalInvested).toLocaleString()}
Corpus at Retirement: ${currency}${Math.round(results.corpusAtRetirement).toLocaleString()}
Inflation-Adjusted: ${currency}${Math.round(results.inflationAdjustedCorpus).toLocaleString()}
FIRE Number: ${currency}${Math.round(results.fireNumber).toLocaleString()}
Status: ${results.isFIRE ? 'ABOVE FIRE ✅' : 'BELOW FIRE ⚠️'}
Safe Withdrawal (Annual): ${currency}${Math.round(results.safeWithdrawal).toLocaleString()}
Safe Withdrawal (Monthly): ${currency}${Math.round(results.safeWithdrawalMonthly).toLocaleString()}
Retirement Sustainability: ${results.sustainable ? 'Sustainable ✅' : 'Needs Adjustment ⚠️'}
Money Lasts: ${results.moneyLastsYears.toFixed(1)} years
    `.trim();

        navigator.clipboard.writeText(text);
        alert('Results copied to clipboard!');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card title="FIRE / Retirement Calculator" icon="🔥">
                <div className="mb-4">
                    <Input
                        label="Currency Symbol"
                        type="text"
                        value={currency}
                        onChange={setCurrency}
                        placeholder="e.g., $, NPR, €, ₹"
                        tooltip="Enter your currency symbol (e.g., NPR, $, €, ₹, £)"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Current Age"
                        value={currentAge}
                        onChange={setCurrentAge}
                        min={18}
                        max={80}
                        tooltip="Your current age"
                    />
                    <Input
                        label="Target Retirement Age"
                        value={retirementAge}
                        onChange={setRetirementAge}
                        min={currentAge + 1}
                        max={100}
                        tooltip="Age at which you plan to retire"
                    />
                    <Input
                        label="Monthly Investment"
                        value={monthlyInvestment}
                        onChange={setMonthlyInvestment}
                        min={0}
                        prefix={currency}
                        tooltip="Amount you invest each month towards FIRE"
                    />
                    <Input
                        label="Expected Annual Return"
                        value={annualReturn}
                        onChange={setAnnualReturn}
                        min={0}
                        max={30}
                        step={0.1}
                        suffix="%"
                        tooltip="Expected annual return on investments (historical average: 7-10%)"
                    />
                    <Input
                        label="Withdrawal Rate"
                        value={withdrawalRate}
                        onChange={setWithdrawalRate}
                        min={0}
                        max={10}
                        step={0.1}
                        suffix="%"
                        tooltip="Annual withdrawal rate from portfolio (4% rule is standard)"
                    />
                    <Input
                        label="Expected Inflation"
                        value={inflationRate}
                        onChange={setInflationRate}
                        min={0}
                        max={15}
                        step={0.1}
                        suffix="%"
                        tooltip="Expected average annual inflation rate (historical: 3-4%)"
                    />
                    <Input
                        label="Years in Retirement"
                        value={yearsInRetirement}
                        onChange={setYearsInRetirement}
                        min={1}
                        max={70}
                        tooltip="How long you expect retirement to last"
                    />
                    <Input
                        label="Monthly Retirement Budget (Today's Money)"
                        value={monthlyBudget}
                        onChange={setMonthlyBudget}
                        min={0}
                        prefix={currency}
                        tooltip="Monthly expenses in TODAY'S purchasing power. Will be automatically adjusted for inflation at retirement."
                    />
                </div>

                <AdvancedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Initial Lump Sum"
                            value={lumpSum}
                            onChange={setLumpSum}
                            min={0}
                            prefix={currency}
                            tooltip="One-time initial investment you already have"
                        />
                        <Input
                            label="Annual Contribution Growth"
                            value={contributionGrowth}
                            onChange={setContributionGrowth}
                            min={0}
                            max={50}
                            step={0.5}
                            suffix="%"
                            tooltip="Annual increase in your investment amount (e.g., salary raises)"
                        />
                        <Input
                            label="Step-up SIP"
                            value={stepUpSIP}
                            onChange={setStepUpSIP}
                            min={0}
                            max={50}
                            step={1}
                            suffix="%"
                            tooltip="Yearly percentage increase in monthly investment"
                        />
                        <Input
                            label="Post-Retirement Return"
                            value={postRetirementReturn}
                            onChange={setPostRetirementReturn}
                            min={0}
                            max={30}
                            step={0.1}
                            suffix="%"
                            tooltip="Expected return during retirement (usually lower, 4-6%)"
                        />
                        <Input
                            label="FIRE Multiplier"
                            value={fireMultiplier}
                            onChange={setFireMultiplier}
                            min={15}
                            max={40}
                            step={1}
                            suffix="×"
                            tooltip="Multiply annual expenses by this (25× = 4% rule, 30× = conservative)"
                        />
                        <Input
                            label="Healthcare Inflation Extra"
                            value={healthcareInflation}
                            onChange={setHealthcareInflation}
                            min={0}
                            max={10}
                            step={0.1}
                            suffix="%"
                            tooltip="Additional inflation for healthcare costs in retirement"
                        />

                        {/* One-time events */}
                        <div className="col-span-full">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 mt-2">One-Time Events (Optional)</h4>
                        </div>
                        <Input
                            label="Additional Income - Year"
                            value={additionalIncomeYear}
                            onChange={setAdditionalIncomeYear}
                            min={0}
                            max={retirementAge}
                            tooltip="Year when you expect to receive additional income (e.g., inheritance, bonus). Leave blank to disable."
                        />
                        <Input
                            label="Additional Income - Amount"
                            value={additionalIncomeAmount}
                            onChange={setAdditionalIncomeAmount}
                            min={0}
                            prefix={currency}
                            tooltip="Amount of additional income you'll receive in that year"
                        />
                        <Input
                            label="Additional Expense - Year"
                            value={additionalExpenseYear}
                            onChange={setAdditionalExpenseYear}
                            min={0}
                            max={retirementAge}
                            tooltip="Year when you expect a large expense (e.g., wedding, car, house repair). Leave blank to disable."
                        />
                        <Input
                            label="Additional Expense - Amount"
                            value={additionalExpenseAmount}
                            onChange={setAdditionalExpenseAmount}
                            min={0}
                            prefix={currency}
                            tooltip="Amount of the additional expense in that year"
                        />
                    </div>
                </AdvancedSection>

                <div className="flex flex-wrap gap-3 mt-6">
                    <Button onClick={calculateFIRE}>
                        <TrendingUp className="w-5 h-5 inline mr-2" />
                        Calculate FIRE
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
                    {results.inflationAdjustedMonthlyBudget && (
                        <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                💡 <strong>Budget Adjustment:</strong> Your monthly budget of <strong>{currency}{monthlyBudget.toLocaleString()}</strong> (today's money)
                                will be <strong>{currency}{Math.round(results.inflationAdjustedMonthlyBudget).toLocaleString()}</strong> at retirement
                                after {retirementAge - currentAge} years of {inflationRate}% inflation.
                            </div>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-300 dark:border-blue-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</div>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                                {currency}{Math.round(results.totalInvested).toLocaleString()}
                            </div>
                        </Card>

                        <Card className={`bg-gradient-to-br border-2 ${results.isFIRE ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'}`}>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Corpus at Retirement</div>
                            <div className={`text-3xl font-bold ${results.isFIRE ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                                {currency}{Math.round(results.corpusAtRetirement).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Inflation-adjusted: {currency}{Math.round(results.inflationAdjustedCorpus).toLocaleString()}
                            </div>
                        </Card>

                        <Card className={`bg-gradient-to-br border-2 ${results.isFIRE ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-300 dark:border-red-700'}`}>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">FIRE Status</div>
                            <div className={`text-2xl font-bold ${results.isFIRE ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
                                {results.isFIRE ? '✅ ABOVE FIRE' : '⚠️ BELOW FIRE'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Target: {currency}{Math.round(results.fireNumber).toLocaleString()}
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-300 dark:border-purple-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Safe Withdrawal (Annual)</div>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                                {currency}{Math.round(results.safeWithdrawal).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Monthly: {currency}{Math.round(results.safeWithdrawalMonthly).toLocaleString()}
                            </div>
                        </Card>

                        <Card className={`bg-gradient-to-br border-2 ${results.sustainable ? 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' : 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'}`}>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retirement Sustainability</div>
                            <div className={`text-xl font-bold ${results.sustainable ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                                {results.sustainable ? '✅ Sustainable' : '⚠️ Needs Adjustment'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Money lasts: {results.moneyLastsYears.toFixed(1)} years
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-300 dark:border-indigo-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Years to FIRE</div>
                            <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">
                                {retirementAge - currentAge} years
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Age {currentAge} → {retirementAge}
                            </div>
                        </Card>

                        {/* Earliest Retirement Card */}
                        {results.earliestRetirementAge && results.earliestRetirementAge < retirementAge && (
                            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 border-2 border-teal-300 dark:border-teal-700 animate-pulse-slow">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Earliest Possible Retirement</div>
                                <div className="text-3xl font-bold text-teal-900 dark:text-teal-300">
                                    Age {results.earliestRetirementAge}
                                </div>
                                <div className="text-xs text-teal-700 dark:text-teal-400 mt-2 font-semibold">
                                    🚀 Retire {retirementAge - results.earliestRetirementAge} years earlier!
                                </div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                                    Funds last until age {retirementAge + yearsInRetirement}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Chart */}
                    <Card title="Net Worth Projection" icon="📈">
                        <ResultsChart data={results.yearlyData} fireNumber={results.fireNumber} />
                    </Card>

                    {/* Year-by-Year Table */}
                    <Card title="Year-by-Year Projection" icon="📊">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Year</th>
                                        <th className="px-4 py-2 text-left">Age</th>
                                        <th className="px-4 py-2 text-left">Phase</th>
                                        <th className="px-4 py-2 text-right">Invested</th>
                                        <th className="px-4 py-2 text-right">Corpus</th>
                                        <th className="px-4 py-2 text-right">Withdrawal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.yearlyData.slice(0, 50).map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-4 py-2">{row.year}</td>
                                            <td className="px-4 py-2">{row.age}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${row.type === 'accumulation' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'}`}>
                                                    {row.type === 'accumulation' ? 'Accumulation' : 'Retirement'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-right">{row.invested ? `${currency}${Math.round(row.invested).toLocaleString()}` : '-'}</td>
                                            <td className="px-4 py-2 text-right font-semibold">{currency}{Math.round(row.corpus).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right">{row.withdrawal ? `${currency}${Math.round(row.withdrawal).toLocaleString()}` : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {results.yearlyData.length > 50 && (
                                <p className="text-xs text-gray-500 text-center mt-2">Showing first 50 years...</p>
                            )}
                        </div>
                    </Card>

                    {/* Formulas */}
                    {showFormulas && (
                        <Card title="Calculation Formulas" icon="📐" className="bg-gray-50 dark:bg-gray-800/50">
                            <div className="space-y-3 text-sm font-mono">
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Future Value (Accumulation):</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Where: PV = Present Value, PMT = Monthly Payment, r = Monthly Rate, n = Months</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Inflation Adjustment:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        Retirement Budget = Today's Budget × (1 + inflation)^years
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Your budget is automatically adjusted for inflation from today to retirement age</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">FIRE Number:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        FIRE Number = Annual Expenses (at retirement) × FIRE Multiplier
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Safe Withdrawal Amount:</div>
                                    <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                                        Annual Withdrawal = Corpus × (Withdrawal Rate / 100)
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

export default FIRECalculator;
