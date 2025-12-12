import './Sidebar.css';

interface SidebarProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

const menuItems = [
    { id: 'testing', label: 'Testing Screen', icon: '🔬', section: 'main' },
    { id: 'class', label: 'Class Master', icon: '📊', section: 'masters' },
    { id: 'va', label: 'VA Master', icon: '⚡', section: 'masters' },
    { id: 'iec', label: 'IEC Standard', icon: '📋', section: 'masters' },
    { id: 'party', label: 'Party Master', icon: '🏢', section: 'masters' },
    { id: 'label', label: 'Label Master', icon: '🏷️', section: 'masters' },
    { id: 'partcode', label: 'Part Code Master', icon: '🔧', section: 'masters' },
    { id: 'model', label: 'Model Master', icon: '📦', section: 'masters' },
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
    const mainItems = menuItems.filter(item => item.section === 'main');
    const masterItems = menuItems.filter(item => item.section === 'masters');

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1>
                    <span className="icon">⚙️</span>
                    ERP Testing
                </h1>
                <p>Cross-Platform Edition</p>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-section-title">Main</div>
                <ul className="sidebar-nav">
                    {mainItems.map(item => (
                        <li key={item.id}>
                            <button
                                className={currentView === item.id ? 'active' : ''}
                                onClick={() => onViewChange(item.id)}
                            >
                                <span className="icon">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-section">
                <div className="sidebar-section-title">Master Data</div>
                <ul className="sidebar-nav">
                    {masterItems.map(item => (
                        <li key={item.id}>
                            <button
                                className={currentView === item.id ? 'active' : ''}
                                onClick={() => onViewChange(item.id)}
                            >
                                <span className="icon">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
