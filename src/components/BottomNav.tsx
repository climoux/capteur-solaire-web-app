import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings } from 'lucide-react';
import '../styles/components/BottomNav.css';

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={24} />
                <span>DASHBOARD</span>
            </NavLink>
            {/*<NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <History size={24} />
                <span>HISTORIQUE</span>
            </NavLink>*/}
            <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Settings size={24} />
                <span>PARAMÈTRES</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
