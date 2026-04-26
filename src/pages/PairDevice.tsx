import { useState } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

import '../styles/pages/PairDevice.css';

import { InfoType } from '../types';

interface PairDeviceProps {
    loading: boolean;
    info: InfoType | undefined;
    onCodeFound: (string: string) => void;
}

const PairDevice = ({ loading = false, info, onCodeFound }: PairDeviceProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onCodeFound(inputValue.trim());
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <QrCode size={64} color="#ff9e80" />
                <div>
                    <div>
                        <h1>SAH APP</h1>
                        <p>Entrez le code d'appareillage affiché sur votre capteur (ex. A1B2).</p>
                    </div>
                    {info && <p style={{ color: info.color, marginTop: 15 }}>{info.text}</p>}
                </div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Code d'appareillage"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={!inputValue.trim() || loading}>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PairDevice;
