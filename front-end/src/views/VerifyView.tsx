import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScanFace, Search, CheckCircle2, Link } from 'lucide-react';

type Step = 'scan' | 'verifying' | 'success';

export function VerifyView({ onGoHome }: { onGoHome: () => void }) {
    const [step, setStep] = useState<Step>('scan');

    const handleSimulateScan = () => {
        setStep('verifying');
        setTimeout(() => {
            setStep('success');
        }, 2000); // Fake verification time
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full gap-6 w-full max-w-xl mx-auto mt-2 md:mt-4"
        >
            <div className="text-center mb-4 md:mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Host Verification</h2>
                <p className="text-text-muted md:text-lg mt-1">Scan a TrustPass QR code to verify cryptographically.</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 'scan' && (
                    <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                        {/* Fake Camera Viewfinder */}
                        <div className="w-full max-w-[320px] mx-auto aspect-square bg-iota-secondary/80 rounded-3xl relative overflow-hidden flex items-center justify-center border-[6px] border-iota-primary shadow-xl">
                            <div className="absolute inset-x-6 inset-y-6 border-2 border-iota-blue/50 border-dashed rounded-[32px] bg-iota-blueDeep/20" />
                            <div className="absolute w-full h-[2px] bg-iota-blue/70 shadow-none animate-[ping_3s_infinite]" />
                            <div className="flex flex-col items-center text-text-muted z-10">
                                <ScanFace className="w-16 h-16 mb-4 opacity-50 text-white" />
                                <span className="font-medium text-white/50 text-lg">Waiting for QR Code...</span>
                            </div>
                        </div>

                        <Button fullWidth onClick={handleSimulateScan} size="lg" className="shadow-2xl h-14 text-lg">
                            Simulate Scan Complete
                        </Button>
                    </motion.div>
                )}

                {step === 'verifying' && (
                    <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 gap-8 h-[400px]">
                        <Search className="w-20 h-20 text-iota-blue animate-bounce shadow-none rounded-full" />
                        <div className="text-center">
                            <h3 className="text-3xl font-bold">Querying IOTA Ledger...</h3>
                            <p className="text-text-muted mt-3 md:text-lg px-6 cursor-pulse">Checking notarization authenticity against the blockchain.</p>
                        </div>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
                        <Card className="flex items-center gap-6 bg-success/10 border-success/30 shadow-successGlow p-6 md:p-8">
                            <CheckCircle2 className="w-12 h-12 text-success flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-success text-2xl tracking-tight">Verification Passed</h3>
                                <p className="text-success/80 text-base mt-2">Hash matches blockchain record exactly.</p>
                            </div>
                        </Card>

                        <Card className="flex flex-col gap-5 text-base bg-iota-secondary p-6 md:p-8">
                            <div className="flex justify-between items-center pb-4 border-b border-iota-separator">
                                <span className="text-text-muted">Owner Address</span>
                                <span className="font-mono bg-iota-blueDeep/50 py-1.5 px-3 rounded-lg text-iota-blue border border-iota-blue/20">0x8f2e...9a1b</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-iota-separator">
                                <span className="text-text-muted">Proof Timestamp</span>
                                <span className="font-medium text-text-primary">10 mins ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-muted">Status</span>
                                <span className="text-xs uppercase tracking-widest bg-iota-blueDeep/50 text-iota-blue py-1.5 px-3 rounded-lg font-bold border border-iota-blue/30">
                                    Locked Notarization
                                </span>
                            </div>
                        </Card>

                        <div className="flex flex-col gap-4 mt-6">
                            <Button variant="outline" fullWidth size="lg" className="gap-2 text-move-gold border-move-gold/30 hover:bg-move-gold/10 hover:border-move-gold h-14">
                                <Link className="w-5 h-5" />
                                Request 24h Data Link
                            </Button>

                            <Button variant="ghost" fullWidth size="lg" onClick={onGoHome} className="opacity-70 hover:opacity-100 h-14">
                                Finish & Return
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
