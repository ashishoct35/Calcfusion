import { useState } from 'react';
import { Calculator, Download, Copy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Card from '../shared/Card';
import AdvancedSection from '../shared/AdvancedSection';

const LoanCalculator = () => {
    // Mode selection
    const [mode, setMode] = useState('emi');

    // Currency
    const [currency, setCurrency] = useState('$');

    // Common inputs
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(8);
    const [tenureYears, setTenureYears] = useState(15);
    const [tenureMonths, setTenureMonths] = useState(0);

    // EMI specific
    const [processingFee, setProcessingFee] = useState('');

    // Mortgage specific
    const [homePrice, setHomePrice] = useState(300000);
    const [downPayment, setDownPayment] = useState(20);
    const [propertyTax, setPropertyTax] = useState('');
    const [insurance, setInsurance] = useState('');

    // Car loan specific
    const [carPrice, setCarPrice] = useState(25000);
    const [carDownPayment, setCarDownPayment] = useState(5000);

    // Extra payment specific
    const [extraPayment, setExtraPayment] = useState('');

    // UI State
    const [results, setResults] = useState(null);
    const [showFormulas, setShowFormulas] = useState(false);

    const modes = [
        { value: 'emi', label: 'EMI Calculator' },
        { value: 'loan', label: 'Loan Calculator' },
        { value: 'mortgage', label: 'Mortgage (Home Loan)' },
        { value: 'car', label: 'Car Loan' },
        { value: 'interest-only', label: 'Interest-Only Loan' },
        { value: 'extra-payment', label: 'Extra Payment / Prepayment' },
        { value: 'amortization', label: 'Amortization Schedule' }
    ];

    const calculateEMI = (principal, rate, months) => {
        const monthlyRate = rate / 100 / 12;
        if (monthlyRate === 0) return principal / months;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        return emi;
    };

    const generateAmortization = (principal, rate, months, emi, extra = 0) => {
        const monthlyRate = rate / 100 / 12;
        let balance = principal;
        const schedule = [];

        for (let month = 1; month <= months; month++) {
            if (balance <= 0) break;

            const interest = balance * monthlyRate;
            let principalPart = emi - interest + extra;

            if (balance < principalPart) {
                principalPart = balance;
            }

            balance -= principalPart;

            schedule.push({
                month,
                emi: emi + extra,
                principal: principalPart,
                interest,
                balance: Math.max(0, balance)
            });
        }

        return schedule;
    };

    const calculate = () => {
        const months = tenureYears * 12 + tenureMonths;

        switch (mode) {
            case 'emi': {
                const emi = calculateEMI(loanAmount, interestRate, months);
                const totalPayment = emi * months;
                const totalInterest = totalPayment - loanAmount;
                const totalWithFee = totalPayment + (parseFloat(processingFee) || 0);
                const schedule = generateAmortization(loanAmount, interestRate, months, emi);

                setResults({
                    emi,
                    totalInterest,
                    totalPayment: totalWithFee,
                    principal: loanAmount,
                    schedule,
                    mode: 'emi'
                });
                break;
            }

            case 'loan': {
                const extra = parseFloat(extraPayment) || 0;
                const emi = calculateEMI(loanAmount, interestRate, months);
                const scheduleWithoutExtra = generateAmortization(loanAmount, interestRate, months, emi);
                const scheduleWithExtra = generateAmortization(loanAmount, interestRate, months, emi, extra);

                const totalWithoutExtra = scheduleWithoutExtra.reduce((sum, row) => sum + row.interest, 0);
                const totalWithExtra = scheduleWithExtra.reduce((sum, row) => sum + row.interest, 0);
                const savedInterest = totalWithoutExtra - totalWithExtra;
                const monthsSaved = scheduleWithoutExtra.length - scheduleWithExtra.length;

                setResults({
                    emi,
                    totalInterest: totalWithExtra,
                    totalPayment: loanAmount + totalWithExtra,
                    savedInterest,
                    monthsSaved,
                    schedule: scheduleWithExtra,
                    mode: 'loan'
                });
                break;
            }

            case 'mortgage': {
                const calculatedDownPayment = homePrice * (downPayment / 100);
                const calculatedLoanAmount = homePrice - calculatedDownPayment;
                const emi = calculateEMI(calculatedLoanAmount, interestRate, months);
                const totalPayment = emi * months;
                const totalInterest = totalPayment - calculatedLoanAmount;

                const monthlyPropertyTax = (parseFloat(propertyTax) || 0) / 12;
                const monthlyInsurance = (parseFloat(insurance) || 0) / 12;
                const totalMonthlyPayment = emi + monthlyPropertyTax + monthlyInsurance;

                const schedule = generateAmortization(calculatedLoanAmount, interestRate, months, emi);

                setResults({
                    emi,
                    totalMonthlyPayment,
                    totalInterest,
                    totalPayment: totalPayment + calculatedDownPayment,
                    downPaymentAmount: calculatedDownPayment,
                    loanAmount: calculatedLoanAmount,
                    schedule,
                    mode: 'mortgage'
                });
                break;
            }

            case 'car': {
                const calculatedLoanAmount = carPrice - carDownPayment;
                const fee = parseFloat(processingFee) || 0;
                const emi = calculateEMI(calculatedLoanAmount, interestRate, months);
                const totalPayment = emi * months;
                const totalInterest = totalPayment - calculatedLoanAmount;
                const totalCost = totalPayment + carDownPayment + fee;

                const schedule = generateAmortization(calculatedLoanAmount, interestRate, months, emi);

                setResults({
                    emi,
                    totalInterest,
                    totalPayment: totalCost,
                    loanAmount: calculatedLoanAmount,
                    downPayment: carDownPayment,
                    schedule,
                    mode: 'car'
                });
                break;
            }

            case 'interest-only': {
                const monthlyInterest = (loanAmount * interestRate / 100) / 12;
                const yearlyInterest = loanAmount * interestRate / 100;
                const totalInterestOverTenure = yearlyInterest * tenureYears;

                setResults({
                    monthlyInterest,
                    yearlyInterest,
                    totalInterest: totalInterestOverTenure,
                    principal: loanAmount,
                    mode: 'interest-only'
                });
                break;
            }

            case 'extra-payment': {
                const extra = parseFloat(extraPayment) || 0;
                const emi = calculateEMI(loanAmount, interestRate, months);
                const scheduleWithoutExtra = generateAmortization(loanAmount, interestRate, months, emi);
                const scheduleWithExtra = generateAmortization(loanAmount, interestRate, months, emi, extra);

                const totalWithoutExtra = scheduleWithoutExtra.reduce((sum, row) => sum + row.interest, 0);
                const totalWithExtra = scheduleWithExtra.reduce((sum, row) => sum + row.interest, 0);
                const savedInterest = totalWithoutExtra - totalWithExtra;
                const monthsSaved = scheduleWithoutExtra.length - scheduleWithExtra.length;

                setResults({
                    emi,
                    extraPayment: extra,
                    newEMI: emi + extra,
                    savedInterest,
                    monthsSaved,
                    newTenure: scheduleWithExtra.length,
                    schedule: scheduleWithExtra,
                    mode: 'extra-payment'
                });
                break;
            }

            case 'amortization': {
                const emi = calculateEMI(loanAmount, interestRate, months);
                const schedule = generateAmortization(loanAmount, interestRate, months, emi);

                setResults({
                    emi,
                    schedule,
                    mode: 'amortization'
                });
                break;
            }
        }
    };

    const reset = () => {
        setCurrency('$');
        setLoanAmount(100000);
        setInterestRate(8);
        setTenureYears(15);
        setTenureMonths(0);
        setProcessingFee('');
        setHomePrice(300000);
        setDownPayment(20);
        setPropertyTax('');
        setInsurance('');
        setCarPrice(25000);
        setCarDownPayment(5000);
        setExtraPayment('');
        setResults(null);
    };

    const downloadPDF = () => {
        window.print();
    };

    const copyResults = () => {
        if (!results) return;
        let text = `${modes.find(m => m.value === mode)?.label}\n=====================\n`;

        if (results.emi) text += `EMI: ${currency}${Math.round(results.emi).toLocaleString()}\n`;
        if (results.totalInterest) text += `Total Interest: ${currency}${Math.round(results.totalInterest).toLocaleString()}\n`;
        if (results.totalPayment) text += `Total Payment: ${currency}${Math.round(results.totalPayment).toLocaleString()}\n`;

        navigator.clipboard.writeText(text.trim());
        alert('Results copied to clipboard!');
    };

    const downloadCSV = () => {
        if (!results || !results.schedule) return;

        let csv = 'Month,EMI,Principal,Interest,Balance\n';
        results.schedule.forEach(row => {
            csv += `${row.month},${row.emi.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'amortization-schedule.csv';
        a.click();
    };

    const renderInputs = () => {
        const commonInputs = (
            <>
                <Input
                    label="Currency Symbol"
                    type="text"
                    value={currency}
                    onChange={setCurrency}
                    placeholder="e.g., $, NPR, €, ₹"
                    tooltip="Enter your currency symbol"
                />
            </>
        );

        switch (mode) {
            case 'emi':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix={currency} tooltip="Principal loan amount" />
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={0} tooltip="Loan tenure in years" />
                            <Input label="Tenure (Months)" value={tenureMonths} onChange={setTenureMonths} min={0} max={11} tooltip="Additional months" />
                            <Input label="Processing Fee (Optional)" value={processingFee} onChange={setProcessingFee} prefix={currency} tooltip="One-time processing fee" />
                        </div>
                    </>
                );

            case 'loan':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix={currency} tooltip="Principal loan amount" />
                            <Input label="Annual Interest  Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={0} tooltip="Loan tenure in years" />
                            <Input label="Tenure (Months)" value={tenureMonths} onChange={setTenureMonths} min={0} max={11} tooltip="Additional months" />
                            <Input label="Extra Monthly Payment (Optional)" value={extraPayment} onChange={setExtraPayment} prefix={currency} tooltip="Additional payment each month" />
                        </div>
                    </>
                );

            case 'mortgage':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Home Price" value={homePrice} onChange={setHomePrice} prefix={currency} tooltip="Total price of the home" />
                            <Input label="Down Payment" value={downPayment} onChange={setDownPayment} suffix="%" tooltip="Down payment percentage" />
                            <div className="col-span-full">
                                <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                    Loan Amount: <strong>{currency}{(homePrice - (homePrice * downPayment / 100)).toLocaleString()}</strong>
                                </div>
                            </div>
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={10} max={30} tooltip="Loan tenure (10-30 years)" />
                            <Input label="Annual Property Tax (Optional)" value={propertyTax} onChange={setPropertyTax} prefix={currency} tooltip="Yearly property tax" />
                            <Input label="Annual Insurance (Optional)" value={insurance} onChange={setInsurance} prefix={currency} tooltip="Yearly home insurance" />
                        </div>
                    </>
                );

            case 'car':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Car Price" value={carPrice} onChange={setCarPrice} prefix={currency} tooltip="Total price of the car" />
                            <Input label="Down Payment" value={carDownPayment} onChange={setCarDownPayment} prefix={currency} tooltip="Upfront payment" />
                            <div className="col-span-full">
                                <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                    Loan Amount: <strong>{currency}{(carPrice - carDownPayment).toLocaleString()}</strong>
                                </div>
                            </div>
                            <Input label="Processing Fee (Optional)" value={processingFee} onChange={setProcessingFee} prefix={currency} tooltip="One-time processing fee" />
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={1} max={7} tooltip="Loan tenure (1-7 years)" />
                        </div>
                    </>
                );

            case 'interest-only':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix={currency} tooltip="Principal loan amount" />
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={1} tooltip="Investment period in years" />
                        </div>
                    </>
                );

            case 'extra-payment':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix={currency} tooltip="Principal loan amount" />
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={0} tooltip="Original loan tenure" />
                            <Input label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} prefix={currency} tooltip="Additional payment each month" />
                        </div>
                    </>
                );

            case 'amortization':
                return (
                    <>
                        {commonInputs}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix={currency} tooltip="Principal loan amount" />
                            <Input label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} tooltip="Annual interest rate" />
                            <Input label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} min={0} tooltip="Loan tenure in years" />
                            <Input label="Tenure (Months)" value={tenureMonths} onChange={setTenureMonths} min={0} max={11} tooltip="Additional months" />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    const renderResults = () => {
        if (!results) return null;

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.emi && (
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-300 dark:border-blue-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly EMI</div>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                                {currency}{Math.round(results.emi).toLocaleString()}
                            </div>
                        </Card>
                    )}

                    {results.totalInterest && (
                        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-2 border-orange-300 dark:border-orange-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest</div>
                            <div className="text-3xl font-bold text-orange-900 dark:text-orange-300">
                                {currency}{Math.round(results.totalInterest).toLocaleString()}
                            </div>
                        </Card>
                    )}

                    {results.totalPayment && (
                        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-300 dark:border-purple-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount Payable</div>
                            <div className="text-3xl font-bold text-purple-900 dark:text-purple-300">
                                {currency}{Math.round(results.totalPayment).toLocaleString()}
                            </div>
                        </Card>
                    )}

                    {results.monthlyInterest && (
                        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-300 dark:border-green-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Interest Payment</div>
                            <div className="text-3xl font-bold text-green-900 dark:text-green-300">
                                {currency}{Math.round(results.monthlyInterest).toLocaleString()}
                            </div>
                        </Card>
                    )}

                    {results.savedInterest && (
                        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-300 dark:border-green-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Saved</div>
                            <div className="text-3xl font-bold text-green-900 dark:text-green-300">
                                {currency}{Math.round(results.savedInterest).toLocaleString()}
                            </div>
                        </Card>
                    )}

                    {results.monthsSaved && (
                        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-300 dark:border-indigo-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Months Saved</div>
                            <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">
                                {results.monthsSaved} months
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                ({(results.monthsSaved / 12).toFixed(1)} years)
                            </div>
                        </Card>
                    )}
                </div>

                {/* Amortization Table */}
                {results.schedule && results.schedule.length > 0 && (
                    <Card title="Amortization Schedule" icon="📊" className="mt-6">
                        <div className="mb-4 flex gap-2">
                            <Button variant="secondary" onClick={downloadCSV}>
                                <Download className="w-4 h-4 inline mr-2" />
                                Download CSV
                            </Button>
                        </div>
                        <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Month</th>
                                        <th className="px-4 py-2 text-right">EMI</th>
                                        <th className="px-4 py-2 text-right">Principal</th>
                                        <th className="px-4 py-2 text-right">Interest</th>
                                        <th className="px-4 py-2 text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.schedule.slice(0, 100).map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-4 py-2">{row.month}</td>
                                            <td className="px-4 py-2 text-right">{currency}{Math.round(row.emi).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right font-semibold text-green-600 dark:text-green-400">{currency}{Math.round(row.principal).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right text-orange-600 dark:text-orange-400">{currency}{Math.round(row.interest).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-right font-semibold">{currency}{Math.round(row.balance).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {results.schedule.length > 100 && (
                                <p className="text-xs text-gray-500 text-center mt-2">Showing first 100 months...</p>
                            )}
                        </div>
                    </Card>
                )}
            </>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card title="All-in-One Loan & EMI Calculator" icon="🏦">
                {/* Mode Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Select Loan Type
                    </label>
                    <select
                        value={mode}
                        onChange={(e) => {
                            setMode(e.target.value);
                            setResults(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-lg font-medium"
                    >
                        {modes.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                {/* Dynamic Inputs */}
                {renderInputs()}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                    <Button onClick={calculate}>
                        <Calculator className="w-5 h-5 inline mr-2" />
                        Calculate
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
                        </>
                    )}
                </div>
            </Card>

            {/* Results */}
            {renderResults()}
        </div>
    );
};

export default LoanCalculator;
