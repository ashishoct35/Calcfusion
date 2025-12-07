import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import Homepage from './pages/Homepage';
import FIREPage from './pages/FIREPage';
import EMIPage from './pages/EMIPage';
import BMIPage from './pages/BMIPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './context/AuthContext';

const RootRoute = () => {
    const { user, loading } = useAuth();
    // Safe check for subdomain
    const isAppDomain = window.location.hostname.includes('financify');

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (isAppDomain) {
        return user ? <DashboardPage /> : <LoginPage />;
    }

    // Default: ALWAYS show Homepage for main domain
    return <Homepage />;
};

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            {/* Only show PromoBanner on main site, not the App */}
                            {!window.location.hostname.includes('financify') && <PromoBanner />}

                            <Header />

                            <main className="container mx-auto px-4 py-8 max-w-7xl">
                                <Routes>
                                    <Route path="/" element={<RootRoute />} />
                                    <Route path="/fire" element={<FIREPage />} />
                                    <Route path="/emi" element={<EMIPage />} />
                                    <Route path="/bmi" element={<BMIPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
