import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);

        // Remove all theme classes
        document.documentElement.classList.remove('light', 'dark', 'theme-neon');

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'neon') {
            document.documentElement.classList.add('dark', 'theme-neon');
            document.body.classList.add('theme-neon');
        } else {
            document.body.classList.remove('theme-neon');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'neon';
            return 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
