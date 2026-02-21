import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ShieldAlert, Fingerprint, Scan } from 'lucide-react';

export function HomeView({ onNavigate }: { onNavigate: (view: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-12 md:gap-24 mt-12 md:mt-24 w-full max-w-5xl mx-auto"
        >
            <div className="flex flex-col items-center md:items-start gap-6 max-w-xl">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-iota-blueDeep/50 flex items-center justify-center relative">
                    <Fingerprint className="w-10 h-10 md:w-12 md:h-12 text-iota-blue" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 leading-tight">
                    Own your identity, <br />
                    <span className="text-iota-blue">notarize it on IOTA.</span>
                </h1>
                <p className="text-text-muted text-lg md:text-xl px-2 md:px-0 max-w-lg">
                    Prove who you are without sending sensitive documents to unknown hosts.
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[340px] mt-8 md:mt-0 bg-iota-secondary border border-iota-border/30 rounded-2xl p-8 md:p-10 shadow-xl">
                <Button size="lg" onClick={() => onNavigate('notarize')} className="gap-3 h-16 text-lg w-full">
                    <ShieldAlert className="w-6 h-6" />
                    I am a Traveler
                </Button>

                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-iota-separator"></div>
                    <span className="flex-shrink-0 mx-4 text-text-muted text-sm font-medium">OR</span>
                    <div className="flex-grow border-t border-iota-separator"></div>
                </div>

                <Button variant="secondary" size="lg" onClick={() => onNavigate('verify')} className="gap-3 h-16 text-lg text-move-gold border-move-gold/30 hover:bg-move-gold/10 hover:border-move-gold w-full transition-all">
                    <Scan className="w-6 h-6" />
                    I am a Host
                </Button>
            </div>
        </motion.div>
    );
}
