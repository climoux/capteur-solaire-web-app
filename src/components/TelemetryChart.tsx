import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid,
    Tooltip,
} from 'recharts';

import { TelemetryPoint } from '../types';

import '../styles/components/TelemetryChart.css';

interface TelemetryChartProps {
    label: "Température" | "Flux d'air";
    data: TelemetryPoint[];
    dataKey: string;
    color: string;
    unit: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    name: string;
    unit: string;
}

const CustomTooltip = ({ active, payload, label, name, unit }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;

    const value = payload[0].value;
    const color = payload[0].stroke;

    return (
        <div className="custom-tooltip">
            <div className="tooltip-time">
                {new Date(label!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="tooltip-value" style={{ color }}>
                {name} : {parseFloat(value.toFixed(1)).toLocaleString('fr')}{unit}
            </div>
        </div>
    );
};

const TelemetryChart = ({ label, data, dataKey, color, unit }: TelemetryChartProps) => {
    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: -10 }}>
                    <defs>
                        <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
                    <XAxis 
                        dataKey="timestamp" 
                        tick={{ fill: 'var(--text-secondary)' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(val) => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                    <YAxis 
                        label={{ position: 'insideTopLeft', value: `${label} (${unit})`, angle: -90, dy: 170, dx: 0, fill: 'var(--text-secondary)' }}
                        tick={{ fill: 'var(--text-secondary)' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<CustomTooltip unit={unit} name={label} />}
                        contentStyle={{ 
                            backgroundColor: 'var(--card-bg)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontSize: 14
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
