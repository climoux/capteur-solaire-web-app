import { LucideIcon } from 'lucide-react';

import '../styles/components/Selector.css';

interface SelectorProps {
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    mode: 'auto' | 'manual';
    onModeChange: (mode: 'auto' | 'manual') => void;
    state?: string;
    states?: string[];
    onStateChange: (state: string) => void;
    accentColor?: string;
}

const Selector = ({ 
    title, 
    subtitle, 
    Icon, 
    mode, 
    onModeChange, 
    state, 
    states, 
    onStateChange,
    accentColor = 'var(--accent-cyan)'
}: SelectorProps) => {
    return (
        <div className="selector">
            <div className="selector-header">
                <div className="selector-icon-wrapper">
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

            {state && states && (
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
            )}
        </div>
    );
};

export default Selector;
