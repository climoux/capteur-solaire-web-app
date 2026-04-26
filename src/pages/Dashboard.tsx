import { useState, useEffect } from 'react';
import { Wind, Gauge, Fan, Waves } from 'lucide-react';

import Header from '../components/Header';
import TargetTempSlider from '../components/TargetTempSlider';
import InfoCard from '../components/InfoCard';
import Selector from '../components/Selector';

import { DeviceState } from '../types';

import { getDevice, setTargetTemperature, setFanControl, setTrapdoorControl } from '../services/api';
import { wsService } from '../services/websocket';

import '../styles/pages/Dashboard.css';
import { convertTemp } from '../utils/convertTemp';

interface DashboardProps {
  deviceId: string;
}

const mapSpeedToLabel = (value: number) => {
    if(value === 0) return 'off';
    if(value > 0 && value <= 1500) return 'basse';
    if(value > 1500 && value <= 2250) return 'moyenne';
    if(value > 2250) return 'haute';
    return 'off';
}

const Dashboard = ({ deviceId }: DashboardProps) => {
    const [device, setDevice] = useState<DeviceState | null>(null);
    const [fanSpeed, setFanSpeed] = useState<'off' | 'basse' | 'moyenne' | 'haute'>('off');
    const [unit, setUnit] = useState<{ current: 'C' | 'F'; previous?: 'C' | 'F' }>({ current: 'C', previous: undefined });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const data = await getDevice(deviceId);
                setDevice({
                    id: data.deviceId,
                    last_update: data.last_seen,
                    ...data.state
                });
                setFanSpeed(mapSpeedToLabel(data.state.fan_speed));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError("Erreur de connexion au capteur.");
            }
        };

        fetchDevice();
        /*wsService.connect(deviceId);
        
        const unsubscribe = wsService.subscribe((data) => {
            if (data.type === 'telemetry' || data.type === 'state_update') {
                setDevice(prev => prev ? { ...prev, ...data.payload } : data.payload);
            }
        });

        return () => {
            unsubscribe();
            wsService.disconnect();
        };*/
    }, [deviceId]);

    const handleTempChange = async (val: number) => {
        if (!device) return;
        setDevice({
            ...device,
            temperature: {
                ...device.temperature,
                target: val
            }
        });

        try {
            await setTargetTemperature(deviceId, val);
        } catch (err) {
            console.error('Failed to update temperature:', err);
        }
    };

    const handleFanModeChange = async (mode: 'auto' | 'manual') => {
        if (!device) return;
        setDevice({ ...device, fan_mode: mode });

        try {
            await setFanControl(deviceId, mode, fanSpeed);
        } catch (err) {
            console.error('Failed to update fan mode:', err);
        }
    };

    const handleFanSpeedChange = async (speed: string) => {
        if (!device) return;
        setDevice({ ...device, fan_speed: speed as any });

        try {
            await setFanControl(deviceId, device.fan_mode, speed);
        } catch (err) {
            console.error('Failed to update fan speed:', err);
        }
    };

    const handleTrapdoorModeChange = async (mode: 'auto' | 'manual') => {
        if (!device) return;
        setDevice({ ...device, trapdoor_mode: mode });
        try {
            await setTrapdoorControl(deviceId, mode, device.trapdoor_state);
        } catch (err) {
            console.error('Failed to update trapdoor mode:', err);
        }
    };

    const handleTrapdoorStateChange = async (state: string) => {
        if (!device) return;
        setDevice({ ...device, trapdoor_state: state as any });
        try {
            await setTrapdoorControl(deviceId, device.trapdoor_mode, state);
        } catch (err) {
            console.error('Failed to update trapdoor state:', err);
        }
    };

    // On cherche l'unité dans localStorage (si il y a)
    useEffect(() => {
        if(device){
            const savedUnit = localStorage.getItem('TEMP_UNIT') as 'C' | 'F' | null;
            const previousUnit = localStorage.getItem('PREV_TEMP_UNIT') as 'C' | 'F' | null;
            if (savedUnit && previousUnit) {
                setUnit({ current: savedUnit, previous: previousUnit });
            }
        }
    }, [device]);

    if (loading) return <div className="loading-screen">Chargement...</div>;
    if (error) return <div className="error-screen">{error}</div>;
    if (!device) return null;

    return (
        <div className="dashboard-page">
            <Header title="SAH APP" />
            
            <div className="target-temp-container">
                <TargetTempSlider 
                    label="Température Cible" 
                    value={(unit.current && unit.previous) ? Math.round(convertTemp(device.temperature.target, unit.previous, unit.current)) : device.temperature.target} 
                    min={unit.current === 'C' ? 10 : 50} 
                    max={unit.current === 'C' ? 30 : 86}
                    unit={unit.current ?? 'C'}
                    onChange={handleTempChange}
                />

                {device.is_heating && (
                    <div className="status-banner heating">
                        <div className="status-dot"></div>
                        <span>CHAUFFAGE ACTIF</span>
                    </div>
                )}
                </div>

            <div className="info-grid">
                <InfoCard 
                    label="Admission"
                    value={(unit.current && unit.previous) ? Math.round(convertTemp(device.temperature.in, unit.previous, unit.current)) : device.temperature.in} 
                    unit={unit.current ?? 'C'}
                    sublabel="Température Extérieur" 
                    Icon={Waves} 
                    color="var(--accent-cyan)"
                />
                <InfoCard 
                    label="Sortie"
                    value={(unit.current && unit.previous) ? Math.round(convertTemp(device.temperature.out, unit.previous, unit.current)) : device.temperature.out} 
                    unit={unit.current ?? 'C'}
                    sublabel="Température en Sortie" 
                    Icon={Gauge} 
                    color="var(--accent-peach)"
                />
            </div>

            <div className="manual-controls-header">
                <div className="header-line"></div>
                <span>CONTRÔLES MANUELS</span>
            </div>

            <Selector 
                title="Flux de sortie"
                subtitle={device.trapdoor_mode === 'auto' ? 'Automatique' : 'Manuel'}
                Icon={Wind}
                mode={device.trapdoor_mode}
                onModeChange={handleTrapdoorModeChange}
                state={device.trapdoor_state}
                states={['close', 'open']}
                onStateChange={handleTrapdoorStateChange}
            />

            <Selector 
                title="Ventilateur"
                subtitle={`Vitesse : ${fanSpeed.charAt(0).toUpperCase() + fanSpeed.slice(1)}`}
                Icon={Fan}
                mode={device.fan_mode}
                onModeChange={handleFanModeChange}
                state={fanSpeed}
                states={['off', 'bas', 'moy', 'haut']}
                onStateChange={handleFanSpeedChange}
            />

            <div className="flow-card">
                <span className="flow-label">DÉBIT D'AIR</span>
                <div className="flow-value">
                    <span className="val">{device.airflow}</span>
                    <span className="unit">m³/h</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
