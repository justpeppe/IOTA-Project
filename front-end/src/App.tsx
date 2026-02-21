import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { HomeView } from './views/HomeView';
import { NotarizeView } from './views/NotarizeView';
import { VerifyView } from './views/VerifyView';
import { GroupView } from './views/GroupView';
import { AboutView } from './views/AboutView';
type ViewState = 'home' | 'notarize' | 'verify' | 'group' | 'about';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <AppLayout onGoHome={() => setCurrentView('home')} onNavigate={(v) => setCurrentView(v as ViewState)}>
      {currentView === 'home' && <HomeView key="home" onNavigate={(v) => setCurrentView(v as ViewState)} />}
      {currentView === 'notarize' && <NotarizeView key="notarize" onGoHome={() => setCurrentView('home')} />}
      {currentView === 'verify' && <VerifyView key="verify" onGoHome={() => setCurrentView('home')} />}
      {currentView === 'group' && <GroupView key="group" onGoHome={() => setCurrentView('home')} />}
      {currentView === 'about' && <AboutView key="about" onGoHome={() => setCurrentView('home')} />}
    </AppLayout>
  );
}

export default App;
