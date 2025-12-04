import { useState } from 'react';
import { Activity, TrendingUp, RotateCcw, Info } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Card from '../shared/Card';

const BMICalculator = () => {
    // Mode State
    const [mode, setMode] = useState('simple'); // 'simple' or 'advanced'

    // Unit State
    const [heightUnit, setHeightUnit] = useState('cm'); // 'cm', 'ft', or 'in'
    const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lbs'

    // Input State
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(175); // stores in cm internally
    const [weight, setWeight] = useState(70); // stores in kg internally
    const [activityLevel, setActivityLevel] = useState('1.2');
    const [goal, setGoal] = useState('maintain');

    // Advanced Inputs
    const [neck, setNeck] = useState(38); // cm
    const [waist, setWaist] = useState(85); // cm
    const [hip, setHip] = useState(95); // cm (female only)

    // Results State
    const [results, setResults] = useState(null);

    const activityMultipliers = {
        '1.2': 'Sedentary (<3,000 steps/day, desk job)',
        '1.375': 'Lightly Active (3,000-5,000 steps/day)',
        '1.55': 'Moderately Active (5,000-8,000 steps/day)',
        '1.725': 'Very Active (8,000-12,000 steps/day)',
        '1.9': 'Super Active (>12,000 steps/day + intense training)'
    };

    const goals = {
        'lose_fat': 'Lose Fat',
        'maintain': 'Maintain Weight',
        'gain_muscle': 'Gain Muscle',
        'recomp': 'Body Recomposition'
    };

    // Unit conversion helpers
    const convertHeightToDisplay = (heightCm) => {
        if (heightUnit === 'cm') return heightCm;
        if (heightUnit === 'in') return (heightCm / 2.54).toFixed(1);
        if (heightUnit === 'ft') {
            const totalInches = heightCm / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = (totalInches % 12).toFixed(1);
            return `${feet}'${inches}"`;
        }
    };

    const convertHeightFromDisplay = (value) => {
        if (heightUnit === 'cm') return parseFloat(value) || 175;
        if (heightUnit === 'in') return (parseFloat(value) || 69) * 2.54;
        // For ft, we'd need special handling in the input
        return parseFloat(value) || 175;
    };

    const convertWeightToDisplay = (weightKg) => {
        if (weightUnit === 'kg') return weightKg;
        return (weightKg * 2.20462).toFixed(1);
    };

    const convertWeightFromDisplay = (value) => {
        if (weightUnit === 'kg') return parseFloat(value) || 70;
        return (parseFloat(value) || 154) / 2.20462;
    };

    const calculateBMI = () => {
        // 1. BMI Calculation
        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);

        let bmiCategory = '';
        let bmiColor = '';
        if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = 'text-blue-500'; }
        else if (bmi < 25) { bmiCategory = 'Normal Weight'; bmiColor = 'text-green-500'; }
        else if (bmi < 30) { bmiCategory = 'Overweight'; bmiColor = 'text-orange-500'; }
        else { bmiCategory = 'Obese'; bmiColor = 'text-red-500'; }

        // 2. BMR Calculation (Mifflin-St Jeor)
        let bmr = 10 * weight + 6.25 * height - 5 * age;
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        // 3. TDEE Calculation
        const tdee = bmr * parseFloat(activityLevel);

        // 4. Macro Calculations
        let proteinG = weight * 2.2; // g per kg (high protein for all goals)
        let carbsG = 0;
        let fatG = 0;

        // 4. Goal Adjustment
        let targetCalories = tdee;
        let advice = '';
        let macroAdvice = '';
        let timeline = '';

        switch (goal) {
            case 'lose_fat':
                targetCalories = tdee - 500;
                proteinG = weight * 2.5; // Higher for muscle preservation
                fatG = weight * 0.8;
                carbsG = (targetCalories - (proteinG * 4) - (fatG * 9)) / 4;

                const weeksToLose = Math.abs(bmi - 22) * weight * 0.1 / 0.5; // ~0.5kg/week
                const monthsToLose = Math.ceil(weeksToLose / 4);

                advice = `To lose fat effectively, aim for a caloric deficit of 500 kcal/day for ~0.5kg/week fat loss. This is sustainable and preserves muscle mass.`;
                macroAdvice = `**Macros**: ${Math.round(proteinG)}g protein, ${Math.round(carbsG)}g carbs, ${Math.round(fatG)}g fat.`;
                timeline = `**Timeline**: At this rate, you'll reach a healthy body composition in approximately ${monthsToLose} months.`;
                break;

            case 'gain_muscle':
                targetCalories = tdee + 300;
                proteinG = weight * 2.2;
                fatG = weight * 1.0;
                carbsG = (targetCalories - (proteinG * 4) - (fatG * 9)) / 4;

                advice = `To gain muscle, aim for a slight surplus of 300 kcal/day. Expect ~0.25-0.5kg gain per month (mostly muscle with proper training).`;
                macroAdvice = `**Macros**: ${Math.round(proteinG)}g protein (essential!), ${Math.round(carbsG)}g carbs (fuel), ${Math.round(fatG)}g fat.`;
                timeline = `**Timeline**: Building significant muscle takes 6-12 months of consistent training and nutrition. Expect 2-4kg lean mass in your first year.`;
                break;

            case 'recomp':
                targetCalories = tdee;
                proteinG = weight * 2.7; // VERY high protein for recomp
                fatG = weight * 0.9;
                carbsG = (targetCalories - (proteinG * 4) - (fatG * 9)) / 4;

                advice = `For body recomposition, eat at maintenance calories. This is the hardest goal – you're building muscle while losing fat simultaneously.`;
                macroAdvice = `**Macros**: ${Math.round(proteinG)}g protein (critical for recomp!), ${Math.round(carbsG)}g carbs, ${Math.round(fatG)}g fat. Hit protein daily!`;
                timeline = `**Timeline**: Recomp is slow. Expect visible changes in 3-6 months. Focus on strength gains in the gym as your primary progress marker.`;
                break;

            case 'maintain':
            default:
                targetCalories = tdee;
                proteinG = weight * 2.0;
                fatG = weight * 1.0;
                carbsG = (targetCalories - (proteinG * 4) - (fatG * 9)) / 4;

                advice = `To maintain your current weight, eat at your TDEE. Monitor your weight weekly and adjust by ±100-200 kcal if you notice trends.`;
                macroAdvice = `**Macros**: ${Math.round(proteinG)}g protein, ${Math.round(carbsG)}g carbs, ${Math.round(fatG)}g fat.`;
                timeline = `**Timeline**: Maintenance is ongoing. Reassess your needs every 3-6 months as your activity or body composition changes.`;
                break;
        }

        // 5. Advanced: Body Fat (US Navy Method)
        let bodyFat = null;
        let leanMass = null;
        let fatMass = null;

        if (mode === 'advanced') {
            if (gender === 'male') {
                bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            } else {
                bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
            }

            // Clamp negative results
            if (bodyFat < 2) bodyFat = 2;

            fatMass = weight * (bodyFat / 100);
            leanMass = weight - fatMass;
        }

        setResults({
            bmi,
            bmiCategory,
            bmiColor,
            bmr,
            tdee,
            targetCalories,
            advice,
            macroAdvice,
            timeline,
            proteinG,
            carbsG,
            fatG,
            bodyFat,
            leanMass,
            fatMass
        });
    };

    const reset = () => {
        setGender('male');
        setAge(30);
        setHeight(175);
        setWeight(70);
        setActivityLevel('1.2');
        setGoal('maintain');
        setNeck(38);
        setWaist(85);
        setHip(95);
        setResults(null);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card title="BMI & Body Fat Calculator" icon="⚖️">
                {/* Mode Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setMode('simple')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'simple' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Simple Mode
                        </button>
                        <button
                            onClick={() => setMode('advanced')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'advanced' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            Advanced Mode
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Gender Selection */}
                    <div className="col-span-full flex gap-4 justify-center mb-2">
                        <button
                            onClick={() => setGender('male')}
                            className={`flex-1 md:flex-none px-6 py-3 rounded-lg border-2 font-semibold transition-all ${gender === 'male' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                        >
                            👨 Male
                        </button>
                        <button
                            onClick={() => setGender('female')}
                            className={`flex-1 md:flex-none px-6 py-3 rounded-lg border-2 font-semibold transition-all ${gender === 'female' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300' : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'}`}
                        >
                            👩 Female
                        </button>
                    </div>

                    <Input
                        label="Age"
                        value={age}
                        onChange={setAge}
                        min={10}
                        max={100}
                        tooltip="Your age in years"
                    />

                    {/* Height with Unit Selector */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Height</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={heightUnit === 'cm' ? height : heightUnit === 'in' ? (height / 2.54).toFixed(1) : height}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value) || 0;
                                    if (heightUnit === 'cm') setHeight(val);
                                    else if (heightUnit === 'in') setHeight(val * 2.54);
                                }}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <select
                                value={heightUnit}
                                onChange={(e) => setHeightUnit(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="cm">cm</option>
                                <option value="in">inches</option>
                            </select>
                        </div>
                    </div>

                    {/* Weight with Unit Selector */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={weightUnit === 'kg' ? weight : (weight * 2.20462).toFixed(1)}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value) || 0;
                                    if (weightUnit === 'kg') setWeight(val);
                                    else setWeight(val / 2.20462);
                                }}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <select
                                value={weightUnit}
                                onChange={(e) => setWeightUnit(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>
                    </div>

                    {/* Activity Level Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            Activity Level
                            <div className="group relative">
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                                <div className="invisible group-hover:visible absolute z-10 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg -top-2 left-6">
                                    Choose based on your average daily steps and exercise.
                                </div>
                            </div>
                        </label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            {Object.entries(activityMultipliers).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Goal Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fitness Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            {Object.entries(goals).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Advanced Inputs */}
                    {mode === 'advanced' && (
                        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="col-span-full">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Body Measurements (for Body Fat %)</h4>
                            </div>
                            <Input
                                label="Neck Circumference (cm)"
                                value={neck}
                                onChange={setNeck}
                                min={20}
                                max={60}
                                tooltip="Measure around the middle of your neck"
                            />
                            <Input
                                label="Waist Circumference (cm)"
                                value={waist}
                                onChange={setWaist}
                                min={40}
                                max={200}
                                tooltip="Measure around your waist at the navel"
                            />
                            {gender === 'female' && (
                                <Input
                                    label="Hip Circumference (cm)"
                                    value={hip}
                                    onChange={setHip}
                                    min={40}
                                    max={200}
                                    tooltip="Measure around the widest part of your hips"
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    <Button onClick={calculateBMI}>
                        <Activity className="w-5 h-5 inline mr-2" />
                        Calculate
                    </Button>
                    <Button variant="secondary" onClick={reset}>
                        <RotateCcw className="w-5 h-5 inline mr-2" />
                        Reset
                    </Button>
                </div>
            </Card>

            {/* Results */}
            {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    {/* BMI Card */}
                    <Card className={`border-l-4 ${results.bmiColor.replace('text-', 'border-')}`}>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your BMI</div>
                        <div className={`text-4xl font-bold ${results.bmiColor} mb-2`}>
                            {results.bmi.toFixed(1)}
                        </div>
                        <div className={`text-lg font-semibold ${results.bmiColor}`}>
                            {results.bmiCategory}
                        </div>
                        {mode === 'advanced' && results.bodyFat && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Body Fat</div>
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    {results.bodyFat.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Lean Mass: {results.leanMass.toFixed(1)} kg | Fat Mass: {results.fatMass.toFixed(1)} kg
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Calories Card */}
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-2 border-orange-300 dark:border-orange-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Daily Calorie Target</div>
                        <div className="text-4xl font-bold text-orange-900 dark:text-orange-300 mb-2">
                            {Math.round(results.targetCalories).toLocaleString()} <span className="text-xl">kcal</span>
                        </div>
                        <div className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                            Goal: {goals[goal]}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Maintenance (TDEE): {Math.round(results.tdee).toLocaleString()} kcal
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            BMR: {Math.round(results.bmr).toLocaleString()} kcal
                        </div>
                    </Card>

                    {/* Macros Card */}
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-300 dark:border-green-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Daily Macros</div>
                        <div className="space-y-2 mt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Protein</span>
                                <span className="text-xl font-bold text-green-900 dark:text-green-300">{Math.round(results.proteinG)}g</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Carbs</span>
                                <span className="text-xl font-bold text-green-900 dark:text-green-300">{Math.round(results.carbsG)}g</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fats</span>
                                <span className="text-xl font-bold text-green-900 dark:text-green-300">{Math.round(results.fatG)}g</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                            P: {Math.round((results.proteinG * 4 / results.targetCalories) * 100)}% |
                            C: {Math.round((results.carbsG * 4 / results.targetCalories) * 100)}% |
                            F: {Math.round((results.fatG * 9 / results.targetCalories) * 100)}%
                        </div>
                    </Card>

                    {/* Advice Card */}
                    <Card className="col-span-full bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Your Personalized Roadmap
                        </h3>
                        <div className="space-y-3">
                            <p className="text-gray-700 dark:text-gray-300">
                                {results.advice}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                {results.macroAdvice}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">
                                {results.timeline}
                            </p>
                        </div>
                        {mode === 'advanced' && results.bodyFat < 15 && results.bmi > 25 && (
                            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-700">
                                <strong className="text-blue-600 dark:text-blue-400">Note:</strong> Your BMI indicates "Overweight", but your Body Fat % is low. This suggests you have high muscle mass (Athlete). In your case, BMI is not an accurate health indicator; rely on Body Fat % instead.
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
