import React from 'react';
import { ExternalLink } from 'lucide-react';

const PromoBanner = () => {
    return (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white font-medium text-xs sm:text-sm py-2 px-4 shadow-md items-center justify-center flex transition-all duration-300 hover:brightness-110 relative z-50">
            <a
                href="https://www.shresthaconsolidated.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline decoration-white/70 underline-offset-2"
            >
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider hidden sm:inline-block">Limited Offer</span>
                <span>
                    Build your Traffic! Get a professional Static Site for as affordable as <span className="font-bold text-yellow-300">$60</span>
                </span>
                <ExternalLink size={14} className="inline-block flex-shrink-0" />
            </a>
        </div>
    );
};

export default PromoBanner;
