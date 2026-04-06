import { useState } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';
import '../styles/pages/QRScanner.css';

interface QRScannerProps {
    onIdFound: (id: string) => void;
}

const QRScanner = ({ onIdFound }: QRScannerProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
        onIdFound(inputValue.trim());
        }
    };

    return (
        <div className="login-container">
        <div className="login-header">
            <QrCode size={64} color="#ff9e80" />
            <div>
                <h1>SAH APP</h1>
                <p>Scannez le QR Code sur votre capteur ou entrez son identifiant.</p>
            </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Identifiant de l'appareil"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" disabled={!inputValue.trim()}>
                    <ArrowRight size={24} />
                </button>
            </div>
        </form>
        </div>
    );
};

export default QRScanner;
