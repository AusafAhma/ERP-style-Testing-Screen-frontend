import { useState, useEffect } from 'react';
import type { AppData } from './types/models';
import { initializeData } from './services/DataService';
import Sidebar from './components/Layout/Sidebar';
import TestingScreen from './components/TestingScreen/TestingScreen';
import ClassMasterView from './components/Masters/ClassMaster';
import VAMasterView from './components/Masters/VAMaster';
import IECStandardMasterView from './components/Masters/IECStandardMaster';
import PartyMasterView from './components/Masters/PartyMaster';
import LabelMasterView from './components/Masters/LabelMaster';
import PartCodeMasterView from './components/Masters/PartCodeMaster';
import ModelMasterView from './components/Masters/ModelMaster';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('testing');
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    // Initialize data on mount
    const initialData = initializeData();
    setData(initialData);
  }, []);

  if (!data) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading ERP Testing App...</p>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'testing':
        return <TestingScreen data={data} onDataChange={setData} />;
      case 'class':
        return <ClassMasterView data={data} onDataChange={setData} />;
      case 'va':
        return <VAMasterView data={data} onDataChange={setData} />;
      case 'iec':
        return <IECStandardMasterView data={data} onDataChange={setData} />;
      case 'party':
        return <PartyMasterView data={data} onDataChange={setData} />;
      case 'label':
        return <LabelMasterView data={data} onDataChange={setData} />;
      case 'partcode':
        return <PartCodeMasterView data={data} onDataChange={setData} />;
      case 'model':
        return <ModelMasterView data={data} onDataChange={setData} />;
      default:
        return <TestingScreen data={data} onDataChange={setData} />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, { icon: string; title: string; desc: string }> = {
      testing: { icon: '🔬', title: 'Testing Screen', desc: 'Electrical testing workflow and data entry' },
      class: { icon: '📊', title: 'Class Master', desc: 'Manage electrical component classes' },
      va: { icon: '⚡', title: 'VA Master', desc: 'Manage Volt-Ampere ratings' },
      iec: { icon: '📋', title: 'IEC Standard Master', desc: 'Manage IEC standards' },
      party: { icon: '🏢', title: 'Party Master', desc: 'Manage companies and customers' },
      label: { icon: '🏷️', title: 'Label Master', desc: 'Configure label types' },
      partcode: { icon: '🔧', title: 'Part Code Master', desc: 'Manage part codes' },
      model: { icon: '📦', title: 'Model Master', desc: 'Manage model configurations' },
    };
    return titles[currentView] || titles.testing;
  };

  const pageInfo = getPageTitle();

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        {currentView !== 'testing' && (
          <div className="page-header">
            <h2>{pageInfo.icon} {pageInfo.title}</h2>
            <p>{pageInfo.desc}</p>
          </div>
        )}
        {renderView()}
      </main>
    </div>
  );
}

export default App;
