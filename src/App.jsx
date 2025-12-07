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

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        <PromoBanner />
                        <Header />

                        <main className="container mx-auto px-4 py-8 max-w-7xl">
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/fire" element={<FIREPage />} />
                                <Route path="/emi" element={<EMIPage />} />
                                <Route path="/bmi" element={<BMIPage />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
