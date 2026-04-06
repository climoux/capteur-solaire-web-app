import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip 
} from 'recharts';
import { TelemetryPoint } from '../types';
import '../styles/components/TelemetryChart.css';

interface TelemetryChartProps {
    data: TelemetryPoint[];
    dataKey: string;
    color: string;
    unit: string;
}

const TelemetryChart = ({ data, dataKey, color, unit }: TelemetryChartProps) => {
    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                        dataKey="timestamp" 
                        tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(val) => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                    <YAxis 
                        tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        unit={unit}
                    />
                    <Tooltip 
                        contentStyle={{ 
                        backgroundColor: 'var(--card-bg)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        fontSize: '12px'
                        }}
                        itemStyle={{ color: 'white' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey={dataKey} 
                        stroke={color} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill={`url(#gradient-${dataKey})`} 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TelemetryChart;
