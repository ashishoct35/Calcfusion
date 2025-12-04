import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AdvancedSection = ({ children, title = 'Advanced Options' }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            >
                <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <span className="mr-2">⚙️</span>
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            {isOpen && (
                <div className="p-6 bg-white dark:bg-gray-800 animate-slide-down">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AdvancedSection;
