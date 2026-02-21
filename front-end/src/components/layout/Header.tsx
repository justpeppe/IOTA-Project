import { Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    onGoHome: () => void;
    onNavigate?: (view: string) => void;
}

export function Header({ onGoHome, onNavigate }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full bg-iota-secondary border-b border-iota-border/20">
            <div className="flex h-16 items-center px-6 w-full max-w-7xl mx-auto">
                <motion.button
                    onClick={onGoHome}
                    className="flex items-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="bg-iota-button p-2 rounded-xl text-iota-blue group-hover:bg-iota-buttonHover transition-colors">
                        <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-text-primary">TrustPass</span>
                </motion.button>
                <div className="ml-auto flex items-center gap-4">
                    {/* Placeholder for desktop nav links if needed */}
                    <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-text-muted">
                        <span onClick={() => onNavigate?.('about')} className="hover:text-iota-blue transition-colors cursor-pointer">About</span>
                        <span className="hover:text-iota-blue transition-colors cursor-pointer">Developers</span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-iota-button border border-iota-border/30 flex items-center justify-center text-text-onButton hover:bg-iota-buttonHover transition-colors cursor-pointer"
                    >
                        <User className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </header>
    );
}
