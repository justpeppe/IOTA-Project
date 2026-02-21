import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Users } from 'lucide-react';

export function GroupView({ onGoHome }: { onGoHome: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full gap-6 w-full max-w-xl mx-auto mt-4 md:mt-12"
        >
            <div className="text-center mb-6 md:mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">TrustPass Bundle</h2>
                <p className="text-text-muted md:text-lg mt-2">Create a group for fast check-in.</p>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center gap-6 pb-20 opacity-80 bg-iota-secondary border border-iota-border/30 rounded-2xl p-10 mt-8 shadow-xl">
                <div className="w-24 h-24 rounded-full bg-iota-primary flex flex-col items-center justify-center border-2 border-iota-border/30 border-dashed">
                    <Users className="w-10 h-10 text-text-muted" />
                </div>
                <div className="text-center px-4 max-w-md">
                    <h3 className="text-xl font-semibold mb-3">Coming in Phase 2</h3>
                    <p className="text-base text-text-muted">Dynamic notarizations for groups will allow you to merge multiple IDs into one fast QR scan.</p>
                </div>
                <Button variant="secondary" size="lg" onClick={onGoHome} className="mt-6 w-full max-w-xs">Return Home</Button>
            </div>
        </motion.div>
    );
}
