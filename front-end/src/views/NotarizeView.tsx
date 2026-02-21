import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Upload, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';

type Step = 'upload' | 'hashing' | 'notarizing' | 'success';

export function NotarizeView({ onGoHome }: { onGoHome: () => void }) {
    const [step, setStep] = useState<Step>('upload');

    const handleUploadClick = () => {
        setStep('hashing');
        setTimeout(() => {
            setStep('notarizing');
            setTimeout(() => {
                setStep('success');
            }, 2500); // Fake blockchain notarization time
        }, 1500); // Fake local hashing time
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full gap-6 w-full max-w-2xl mx-auto mt-4 md:mt-12"
        >
            <div className="text-center mb-6 md:mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Notarize ID</h2>
                <p className="text-text-muted mt-2 md:text-lg">Local only. Zero-knowledge cryptographic proof.</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 'upload' && (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
                        <Card className="flex flex-col items-center justify-center p-12 md:p-20 gap-6 border-dashed border-2 border-iota-border/30 hover:border-iota-blue/50 cursor-pointer transition-all bg-iota-secondary group hover:bg-iota-button" onClick={handleUploadClick}>
                            <div className="w-24 h-24 rounded-full bg-iota-blueDeep/50 flex items-center justify-center group-hover:bg-iota-blueDeep transition-colors">
                                <Upload className="w-12 h-12 text-iota-blue" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-2xl text-text-primary">Tap to upload ID</h3>
                                <p className="text-base text-text-muted mt-2">Image or PDF. We process this locally.</p>
                            </div>
                        </Card>
                        <div className="text-center text-sm md:text-base text-text-muted px-4 py-4 bg-iota-secondary border border-iota-border/30 rounded-2xl shadow-none">
                            <ShieldCheck className="w-5 h-5 inline-block mr-2 text-iota-blue opacity-80" />
                            Your document data will be hashed and <strong className="text-text-primary">never leave your device</strong>.
                        </div>
                    </motion.div>
                )}

                {step === 'hashing' && (
                    <motion.div key="hashing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 gap-8 h-[400px]">
                        <Loader2 className="w-20 h-20 text-iota-blue animate-spin" />
                        <div className="text-center gap-3 flex flex-col">
                            <h3 className="text-3xl font-bold">Generating SHA-256...</h3>
                            <p className="text-text-muted md:text-lg px-6 max-w-md">Your document is safe. Creating cryptographic hash locally on your device.</p>
                        </div>
                    </motion.div>
                )}

                {step === 'notarizing' && (
                    <motion.div key="notarizing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 gap-8 h-[400px]">
                        <div className="relative flex items-center justify-center w-32 h-32">
                            <div className="absolute inset-0 border-[4px] border-t-iota-blue border-r-transparent border-b-iota-blue border-l-transparent rounded-full animate-spin-slow shadow-none"></div>
                            <ShieldCheck className="w-14 h-14 text-iota-blue" />
                        </div>
                        <div className="text-center gap-3 flex flex-col">
                            <h3 className="text-3xl font-bold">Notarizing on IOTA...</h3>
                            <p className="text-text-muted md:text-lg px-6 max-w-md">Connecting to wallet and storing proof permanently on the secure ledger.</p>
                        </div>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 bg-iota-secondary border border-iota-border/30 rounded-2xl p-8 md:p-12 shadow-xl">
                        <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
                            <CheckCircle2 className="w-12 h-12 text-success" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-3xl font-bold tracking-tight">Successfully Notarized!</h3>
                            <p className="text-text-muted mt-3 px-4 md:text-lg">Show this QR code to the host to securely prove your identity.</p>
                        </div>

                        <div className="w-full max-w-sm bg-white p-8 rounded-[2rem] flex flex-col items-center gap-5 border-[6px] border-iota-primary shadow-xl mt-4">
                            <div className="w-full flex justify-center">
                                <QRCode
                                    value="iota:trustpass:0x1a2b3c4d5e6f7g8h9i0j:notarized:true"
                                    size={240}
                                    level="H"
                                    className="rounded-xl w-full h-auto"
                                />
                            </div>
                            <div className="bg-gray-100 text-gray-500 text-xs md:text-sm px-4 py-2.5 rounded-xl w-full font-mono text-center truncate tracking-widest uppercase font-bold">
                                ID: 0x1A2B...8H9I0J
                            </div>
                        </div>

                        <Button size="lg" fullWidth onClick={onGoHome} variant="secondary" className="mt-6 md:mt-8 h-14 text-lg hidden md:flex">
                            Return to Dashboard
                        </Button>
                        <Button size="lg" fullWidth onClick={onGoHome} variant="secondary" className="mt-2 text-lg md:hidden">
                            Return Home
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
