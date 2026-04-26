import { LucideIcon } from 'lucide-react';
import '../styles/components/InfoCard.css';

interface InfoCardProps {
    label: string;
    value: string | number;
    unit: string;
    sublabel: string;
    Icon: LucideIcon;
    color?: string;
}

const InfoCard = ({ label, value, unit, sublabel, Icon, color = '#8DCDFF' }: InfoCardProps) => {
    return (
        <div className="info-card">
            <div className="info-card-header">
                <span className="info-card-label" style={{ color }}>{label}</span>
                <Icon size={24} style={{ color }} />
            </div>
            <div className="info-card-body-container">
                <div className="info-card-body">
                    <span className="info-card-value">{value}</span>
                    <span className="info-card-unit">°{unit}</span>
                </div>
                <span className="info-card-sublabel">{sublabel}</span>
            </div>
        </div>
    );
};

export default InfoCard;
