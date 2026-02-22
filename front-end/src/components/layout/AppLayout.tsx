import { Header } from './Header';
import { AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
    children: React.ReactNode;
    onGoHome: () => void;
    onNavigate?: (view: string) => void;
}

export function AppLayout({ children, onGoHome, onNavigate }: AppLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-iota-primary text-text-primary relative">
            {/* App container */}
            <div className="w-full min-h-screen relative flex flex-col z-10">
                {/* Subtle background ambient glow */}
                <div className="absolute top-[-20%] left-[-10%] md:left-[20%] w-[120%] md:w-[60%] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <Header onGoHome={onGoHome} onNavigate={onNavigate} />

                <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-24 relative z-10 flex flex-col">
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
