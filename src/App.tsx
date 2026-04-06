import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import QRScanner from './pages/QRScanner';
import BottomNav from './components/BottomNav';
import './styles/App.css';

function AppContent() {
    const [searchParams] = useSearchParams();
    const [deviceId, setDeviceId] = useState<string | null>(localStorage.getItem('deviceId'));

    useEffect(() => {
        const idFromUrl = searchParams.get('id');
        if (idFromUrl) {
            localStorage.setItem('deviceId', idFromUrl);
            setDeviceId(idFromUrl);
        }
    }, [searchParams]);

    if (!deviceId) {
        return <QRScanner onIdFound={setDeviceId} />;
    }

    return (
        <div className="app-container">
            <main className="content">
                <Routes>
                    <Route path="/" element={<Dashboard deviceId={deviceId} />} />
                    <Route path="/history" element={<History deviceId={deviceId} />} />
                    <Route path="/settings" element={<Settings deviceId={deviceId} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <BottomNav />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
