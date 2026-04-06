import { Thermometer } from 'lucide-react';
import '../styles/components/Header.css';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="app-header">
            <div className="header-brand">
                <Thermometer className="brand-icon" size={24} />
                <h1>{title}</h1>
            </div>
        </header>
    );
};

export default Header;
