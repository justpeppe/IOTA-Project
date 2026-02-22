import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ShieldAlert, Fingerprint, Scan } from 'lucide-react';

export function HomeView({ onNavigate }: { onNavigate: (view: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-left gap-12 md:gap-24 mt-12 md:mt-24 w-full"
        >
            <div className="flex flex-col items-center md:items-start gap-8 max-w-xl">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-iota-blueDeep/30 flex items-center justify-center relative border border-iota-blue/20">
                    <Fingerprint className="w-8 h-8 md:w-10 md:h-10 text-iota-blue" />
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                        Own your identity, <br />
                        <span className="text-iota-blue">notarize it on IOTA.</span>
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl px-2 md:px-0 max-w-lg leading-relaxed">
                        Prove who you are without sending sensitive documents to unknown hosts.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8 w-full md:w-[380px] mt-8 md:mt-0 bg-iota-secondary/50 backdrop-blur-sm border border-iota-border/30 rounded-3xl p-8 md:py-16 md:px-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-iota-blue/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-iota-blue/10 transition-colors duration-500" />

                <div className="flex flex-col gap-5">
                    <Button size="lg" onClick={() => onNavigate('notarize')} className="gap-3 h-16 text-lg w-full">
                        <ShieldAlert className="w-6 h-6" />
                        I am a Traveler
                    </Button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-iota-separator/50"></div>
                        <span className="flex-shrink-0 mx-4 text-text-muted text-xs font-semibold tracking-widest">OR</span>
                        <div className="flex-grow border-t border-iota-separator/50"></div>
                    </div>

                    <Button variant="secondary" size="lg" onClick={() => onNavigate('verify')} className="gap-3 h-16 text-lg text-move-gold border-move-gold/30 hover:bg-move-gold/10 hover:border-move-gold w-full transition-all">
                        <Scan className="w-6 h-6" />
                        I am a Host
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
