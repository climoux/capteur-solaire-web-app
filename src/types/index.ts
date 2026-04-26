export interface DeviceState {
    id: string;
    temperature: {
        in: number;
        out: number;
        target: number;
    };
    airflow: number;
    fan_mode: 'auto' | 'manual';
    fan_speed: number;
    trapdoor_mode: 'auto' | 'manual';
    trapdoor_state: 'open' | 'close';
    is_heating: boolean;
    last_update: string;
}

export interface TelemetryPoint {
    timestamp: string;
    temperature: number;
    airflow: number;
}


export interface InfoType {
    text: string;
    color: 'var(--success)' | 'var(--error)' | 'var(--text-secondary)';
}