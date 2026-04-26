import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import PairDevice from './pages/PairDevice';

import BottomNav from './components/BottomNav';

import { pairDevice } from './services/api';

import './styles/App.css';

import { InfoType } from './types';

function AppContent() {
    const [deviceId, setDeviceId] = useState<string | null>(localStorage.getItem('DEVICE_ID'));
    const [authSecret, setAuthSecret] = useState<string | null>(localStorage.getItem('AUTH_SECRET'));
    const [info, setInfo] = useState<InfoType>({
        text: '',
        color: 'var(--text-secondary)'
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handlePairDevice = async (code: string) => {
        setLoading(true);
        setInfo({
            text: 'Chargement...',
            color: 'var(--text-secondary)'
        });

        try {
            const results = await pairDevice(code);
            // Device ID
            setDeviceId(results.deviceId);
            localStorage.setItem('DEVICE_ID', results.deviceId);
            // Secret
            setAuthSecret(results.secret);
            localStorage.setItem('AUTH_SECRET', results.secret);
        } catch(error: any) {
            const errorData = error.response.data;
            setLoading(false);
            if(errorData.errorCode === "INVALID"){
                setInfo({ text: 'Votre code est invalide.', color: 'var(--error)' });
            }else if(errorData.errorCode === "EXPIRED"){
                setInfo({ text: 'Ce code est expiré.', color: 'var(--error)' });
            }else if(errorData.errorCode === "USED"){
                setInfo({ text: 'Cet appareil est déjà enregistré.', color: 'var(--error)' });
            }
        } finally {
            setLoading(false);
        }
    }

    if (!deviceId) {
        return <PairDevice loading={loading} info={info} onCodeFound={handlePairDevice} />;
    }

    return (
        <div className="app-container">
            <main className="content">
                <Routes>
                    <Route path="/" element={<Dashboard deviceId={deviceId} />} />
                    {/*<Route path="/history" element={<History deviceId={deviceId} />} />*/}
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
