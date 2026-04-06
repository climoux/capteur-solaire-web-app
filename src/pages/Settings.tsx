import { useState, useEffect } from 'react';
import { Bell, Terminal } from 'lucide-react';
import Header from '../components/Header';
import TargetTempSlider from '../components/TargetTempSlider';
import '../styles/pages/Settings.css';

interface SettingsProps {
    deviceId: string;
}

const Settings = ({ deviceId }: SettingsProps) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || '');
    const [threshold, setThreshold] = useState(72);
    const [notifTemp, setNotifTemp] = useState(true);
    const [notifMaint, setNotifMaint] = useState(false);
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    useEffect(() => {
        localStorage.setItem('authToken', token);
    }, [token]);

    return (
        <div className="settings-page">
            <Header title="RÉGLAGES" />

            <section className="settings-section">
                <TargetTempSlider 
                    label="Seuil d'alerte" 
                    value={threshold} 
                    min={40} 
                    max={100} 
                    onChange={setThreshold} 
                />
            </section>

            <section className="settings-section">
                <h2 className="section-title">CONNEXION</h2>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <Terminal size={20} className="setting-icon" />
                            <span>ID Appareil</span>
                        </div>
                        <span className="setting-value secondary">{deviceId}</span>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h2 className="section-title">NOTIFICATIONS</h2>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <Bell size={20} className="setting-icon" />
                            <span>Alertes de température</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={notifTemp} onChange={() => setNotifTemp(!notifTemp)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h2 className="section-title">SYSTÈME</h2>
                <div className="settings-card">
                    <div className="setting-item column">
                        <span className="sub-label">UNITÉS</span>
                        <div className="unit-toggle">
                            <button className={unit === 'C' ? 'active' : ''} onClick={() => setUnit('C')}>°C</button>
                            <button className={unit === 'F' ? 'active' : ''} onClick={() => setUnit('F')}>°F</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="app-version">
                <p>Version 1.0.0</p>
                <p>© 2026 SAH</p>
            </div>
        </div>
    );
};

export default Settings;
