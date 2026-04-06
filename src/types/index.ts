export interface DeviceState {
    id: string;
    temperature_current: number;
    temperature_target: number;
    air_flux: number;
    fan_mode: 'auto' | 'manual';
    fan_speed: 'off' | 'bas' | 'moy' | 'haut';
    trapdoor_mode: 'auto' | 'manual';
    trapdoor_state: 'open' | 'close';
    is_heating: boolean;
    last_update: string;
}

export interface TelemetryPoint {
    timestamp: string;
    temperature: number;
    air_flux: number;
}
