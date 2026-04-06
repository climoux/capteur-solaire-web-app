import { LucideIcon } from 'lucide-react';
import '../styles/components/ControlPanel.css';

interface ControlPanelProps {
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    mode: 'auto' | 'manual';
    onModeChange: (mode: 'auto' | 'manual') => void;
    state: string;
    states: string[];
    onStateChange: (state: string) => void;
    accentColor?: string;
}

const ControlPanel = ({ 
    title, 
    subtitle, 
    Icon, 
    mode, 
    onModeChange, 
    state, 
    states, 
    onStateChange,
    accentColor = 'var(--accent-cyan)'
}: ControlPanelProps) => {
    return (
        <div className="control-panel">
            <div className="control-panel-header">
                <div className="control-icon-wrapper">
                    <Icon size={24} />
                </div>
                <div className="control-info">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
            </div>

            <div className="mode-toggle">
                <button 
                    className={mode === 'auto' ? 'active' : ''} 
                    onClick={() => onModeChange('auto')}
                >
                    AUTO
                </button>
                <button 
                    className={mode === 'manual' ? 'active' : ''} 
                    style={mode === 'manual' ? ({ '--btn-accent': accentColor } as React.CSSProperties) : {}}
                    onClick={() => onModeChange('manual')}
                >
                    MANUEL
                </button>
            </div>

            <div className="state-selector">
                {states.map((s) => (
                    <button
                        key={s}
                        className={state === s ? 'active' : ''}
                        style={state === s ? ({ '--btn-accent': accentColor } as React.CSSProperties) : {}}
                        onClick={() => onStateChange(s)}
                        disabled={mode === 'auto'}
                    >
                        {s.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ControlPanel;
