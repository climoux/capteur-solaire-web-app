import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TelemetryChart from '../components/TelemetryChart';
import { TelemetryPoint } from '../types';
import { getHistory } from '../services/api';
import '../styles/pages/History.css';

interface HistoryProps {
    deviceId: string;
}

const History = ({ deviceId }: HistoryProps) => {
    const [data, setData] = useState<TelemetryPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const historyData = await getHistory(deviceId);
            setData(historyData);
        } catch (err) {
            console.error('Error fetching history:', err);
            // Mock data for demo
            const now = new Date();
            const mockData: TelemetryPoint[] = Array.from({ length: 24 }, (_, i) => ({
                timestamp: new Date(now.getTime() - (23 - i) * 3600000).toISOString(),
                temperature: 20 + Math.random() * 15,
                airflow: 300 + Math.random() * 200
            }));
            setData(mockData);
        } finally {
            setLoading(false);
        }
        };

        fetchHistory();
    }, [deviceId]);

    if (loading) return <div className="loading-screen">Chargement...</div>;

    return (
        <div className="history-page">
            <Header title="HISTORIQUE" />

            <section className="chart-section">
                <h2 className="section-title">Température de Sortie</h2>
                <TelemetryChart 
                    label="Température"
                    data={data} 
                    dataKey="temperature" 
                    color="var(--accent-peach)" 
                    unit="°C" 
                />
            </section>

            <section className="chart-section">
                <h2 className="section-title">Flux d'Air</h2>
                <TelemetryChart 
                    label="Flux d'air"
                    data={data} 
                    dataKey="airflow" 
                    color="var(--accent-cyan)" 
                    unit=" m³/h"
                />
            </section>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Min</span>
                    <span className="stat-value">{parseFloat((Math.min(...data.map(d => d.temperature))).toFixed(1)).toLocaleString('fr')}°C</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Max</span>
                    <span className="stat-value">{parseFloat((Math.max(...data.map(d => d.temperature))).toFixed(1)).toLocaleString('fr')}°C</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Moyenne</span>
                    <span className="stat-value">{parseFloat((data.reduce((acc, current) => acc + current.temperature, 0) / data.length).toFixed(1)).toLocaleString('fr')}°C</span>
                </div>
            </div>
        </div>
    );
};

export default History;
