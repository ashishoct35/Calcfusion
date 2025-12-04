import { HelpCircle } from 'lucide-react';

const Input = ({ label, type = 'number', value, onChange, tooltip, min, max, step, placeholder, prefix, suffix }) => {
    const handleChange = (e) => {
        if (type === 'number') {
            const inputValue = e.target.value;
            // Allow empty string or convert to number to remove leading zeros
            if (inputValue === '' || inputValue === '-') {
                onChange(inputValue);
            } else {
                const numValue = parseFloat(inputValue);
                onChange(isNaN(numValue) ? 0 : numValue);
            }
        } else {
            onChange(e.target.value);
        }
    };

    return (
        <div className="mb-4">
            <label className="block mb-2">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
                    {tooltip && (
                        <div className="group relative">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute right-0 top-6 hidden group-hover:block w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-50">
                                {tooltip}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    {prefix && (
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                            {prefix}
                        </span>
                    )}
                    <input
                        type={type}
                        value={type === 'number' && value !== '' ? Number(value) : value}
                        onChange={handleChange}
                        min={min}
                        max={max}
                        step={step}
                        placeholder={placeholder}
                        className={`input-field ${prefix ? 'pl-16' : ''} ${suffix ? 'pr-16' : ''}`}
                    />
                    {suffix && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                            {suffix}
                        </span>
                    )}
                </div>
            </label>
        </div>
    );
};

export default Input;
