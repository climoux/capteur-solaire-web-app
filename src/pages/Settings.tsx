import { useEffect, useState } from 'react';
import { Bell, Terminal } from 'lucide-react';

import Header from '../components/Header';
import { TargetTempSliderSettings } from '../components/TargetTempSlider';

import '../styles/pages/Settings.css';
import '../styles/components/Selector.css';

import { convertTemp } from '../utils/convertTemp';

interface SettingsProps {
    deviceId: string;
}

const Settings = ({ deviceId }: SettingsProps) => {
    const [threshold, setThreshold] = useState(72);
    const [notifTemp, setNotifTemp] = useState(true);
    const [unit, setUnit] = useState<{ current: 'C' | 'F'; previous?: 'C' | 'F' }>({ current: 'C', previous: undefined });

    // Tout d'abord, on regarde si une unité et un seuil sont déjà enregistrés dans le localStorage
    useEffect(() => {
        const savedUnit = localStorage.getItem('TEMP_UNIT') as 'C' | 'F' | null;
        const savedThreshold = localStorage.getItem('TEMP_THRESHOLD');
        if (savedUnit && savedThreshold) {
            setUnit({ current: savedUnit, previous: undefined });
            setThreshold(parseInt(savedThreshold));
        }
    }, []);

    const handleUnitChange = (newUnit: 'C' | 'F') => {
        const previousUnit = unit.current;
        setUnit({ current: newUnit, previous: previousUnit });
        const newThreshold = Math.round(convertTemp(threshold, previousUnit, newUnit));
        setThreshold(newThreshold);
        // On enregistre la nouvelle unité et le nouveau seuil dans localStorage
        localStorage.setItem('TEMP_UNIT', newUnit);
        localStorage.setItem('TEMP_THRESHOLD', newThreshold.toString());
    }

    return (
        <div className="settings-page">
            <Header title="RÉGLAGES" />

            <TargetTempSliderSettings
                label="Seuil d'alerte" 
                value={threshold}
                min={unit.current === 'C' ? 40 : 104}
                max={unit.current === 'C' ? 100 : 212}
                unit={unit.current ?? 'C'}
                onChange={setThreshold} 
            />

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
                        <div className="mode-toggle" style={{ width:'100%', marginBottom: 0 }}>
                            <button 
                                className={unit.current === 'C' ? 'active' : ''} 
                                onClick={() => handleUnitChange('C')}
                            >
                                °C
                            </button>
                            <button 
                                className={unit.current === 'F' ? 'active' : ''} 
                                onClick={() => handleUnitChange('F')}
                            >
                                °F
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="app-version">
                <p>Version 1.0.0</p>
                <p>Clément Menguy © 2026</p>
            </div>
        </div>
    );
};

export default Settings;
