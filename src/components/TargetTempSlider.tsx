import React from 'react';
import { AlertTriangle } from 'lucide-react';

import '../styles/components/TargetTempSlider.css';
import '../styles/components/Selector.css';

interface TargetTempSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    label: string;
    unit: 'C' | 'F';
}

const TargetTempSlider = ({ value, min, max, onChange, label, unit }: TargetTempSliderProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="slider-container">
            <div className="slider-header">
                <span className="slider-label">{label}</span>
                <span className="slider-value">{value}°{unit}</span>
            </div>
            <div className="slider-track-wrapper">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="slider-input"
                    style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
                />
                <div className="slider-labels">
                    <span>{min}°{unit}</span>
                    <span>{max}°{unit}</span>
                </div>
            </div>
        </div>
    );
};

export const TargetTempSliderSettings = ({ value, min, max, onChange, label, unit }: TargetTempSliderProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="selector">
            <div className="slider-container">
                <div className="slider-header">
                    <div className="slider-icon-wrapper">
                        <div className="selector-icon-wrapper">
                            <AlertTriangle size={18} />
                        </div>
                        <span className="slider-label settings">{label}</span>
                    </div>
                    <span className="slider-value settings">{value}°{unit}</span>
                </div>
                <div className="slider-track-wrapper">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleChange}
                        className="slider-input"
                        style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
                    />
                    <div className="slider-labels">
                        <span>{min}°{unit}</span>
                        <span>{max}°{unit}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetTempSlider;