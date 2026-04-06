import React from 'react';
import '../styles/components/TargetTempSlider.css';

interface TargetTempSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    label: string;
}

const TargetTempSlider = ({ value, min, max, onChange, label }: TargetTempSliderProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="slider-container">
            <div className="slider-header">
                <span className="slider-label">{label}</span>
                <span className="slider-value">{value}°C</span>
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
                    <span>{min}°C</span>
                    <span>{max}°C</span>
                </div>
            </div>
        </div>
    );
};

export default TargetTempSlider;
