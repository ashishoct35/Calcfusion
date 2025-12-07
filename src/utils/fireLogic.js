export const calculateFIREScenario = (inputs) => {
    const {
        currentAge,
        retirementAge,
        monthlyInvestment,
        annualReturn,
        withdrawalRate,
        inflationRate,
        yearsInRetirement,
        monthlyBudget,
        lumpSum,
        contributionGrowth,
        stepUpSIP,
        postRetirementReturn,
        fireMultiplier,
        healthcareInflation,
        additionalIncomeYear,
        additionalIncomeAmount,
        additionalExpenseYear,
        additionalExpenseAmount,
    } = inputs;

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
        const incomeYearVal = parseFloat(additionalIncomeYear) || 0;
        const incomeAmountVal = parseFloat(additionalIncomeAmount) || 0;
        if (incomeYearVal > 0 && (currentAge + year + 1) === incomeYearVal) {
            corpus += incomeAmountVal;
        }

        // Apply one-time additional expense
        const expenseYearVal = parseFloat(additionalExpenseYear) || 0;
        const expenseAmountVal = parseFloat(additionalExpenseAmount) || 0;
        if (expenseYearVal > 0 && (currentAge + year + 1) === expenseYearVal) {
            corpus -= expenseAmountVal;
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

    return {
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
        inflationAdjustedMonthlyBudget
    };
};
