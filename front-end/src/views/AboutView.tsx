import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Shield, Smartphone, QrCode, Lock, Blocks, Target, Group } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function AboutView({ onGoHome }: { onGoHome: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col h-full gap-8 w-full max-w-4xl mx-auto mt-4 md:mt-8 pb-12"
        >
            <div className="text-center md:text-left mb-4">
                <span className="text-iota-blue font-bold tracking-wider text-sm uppercase mb-2 block">Project Overview</span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">TrustPass MVP</h2>
                <p className="text-text-muted md:text-xl mt-4 max-w-2xl leading-relaxed">
                    Digital Identity Notarization for Travel Check-in. Replace insecure document sharing with verifiable on-chain cryptographic proofs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-iota-blueDeep/50 flex flex-col items-center justify-center">
                        <Target className="w-6 h-6 text-iota-blue" />
                    </div>
                    <h3 className="text-xl font-bold">The Problem</h3>
                    <p className="text-text-muted leading-relaxed">
                        Travelers are currently forced to send photos of sensitive documents (ID cards, passports) to unknown hosts via WhatsApp or email, completely losing control over their data footprint.
                    </p>
                </Card>
                <Card className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-move-gold/10 border border-move-gold/20 flex flex-col items-center justify-center">
                        <Lock className="w-6 h-6 text-move-gold" />
                    </div>
                    <h3 className="text-xl font-bold">The Solution</h3>
                    <p className="text-text-muted leading-relaxed">
                        TrustPass replaces raw document sharing with verifiable, untampered proofs notarized on the IOTA blockchain. Hosts verify a cryptographic guarantee instead of collecting JPEGs.
                    </p>
                </Card>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Blocks className="w-6 h-6 text-iota-blue" />
                    Architecture & Flow
                </h3>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-iota-secondary border border-iota-border/20">
                        <div className="w-16 h-16 rounded-full bg-iota-primary flex items-center justify-center shrink-0 border border-iota-border/30">
                            <Smartphone className="w-8 h-8 text-text-primary" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">1. Traveler (Prover)</h4>
                            <p className="text-text-muted mt-2">
                                Uploads the ID locally. The device generates a SHA-256 hash. The hash is notarized on IOTA via dApp Kit, and an Object ID is created. The traveler generates a shareable QR code from this ID.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-iota-secondary border border-iota-border/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Group className="w-32 h-32" />
                        </div>
                        <div className="w-16 h-16 rounded-full bg-iota-primary flex items-center justify-center shrink-0 border border-iota-border/30 z-10">
                            <Shield className="w-8 h-8 text-text-primary" />
                        </div>
                        <div className="z-10">
                            <h4 className="text-lg font-bold">2. Group Leader (Phase 2)</h4>
                            <p className="text-text-muted mt-2">
                                Collects ONLY Object IDs from members to create a "Travel Bundle" (Dynamic Notarization). The leader shares one unified bundle QR code, aggregating checks without ever seeing the raw IDs.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-iota-secondary border border-iota-border/20">
                        <div className="w-16 h-16 rounded-full bg-iota-primary flex items-center justify-center shrink-0 border border-iota-border/30">
                            <QrCode className="w-8 h-8 text-text-primary" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">3. Host (Verifier)</h4>
                            <p className="text-text-muted mt-2">
                                Scans the QR code to query the IOTA ledger. Validates that the notarization is untampered. If required by law, requests an encrypted, temporary (24h TTL) data link.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-iota-button/50 border border-iota-blue/20 rounded-2xl p-6 md:p-8 mt-4">
                <h3 className="text-xl font-bold mb-4">Tech Stack Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-muted">
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-iota-blue"></div>
                        <strong className="text-text-primary">Blockchain:</strong> IOTA Mainnet / Testnet
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-iota-blue"></div>
                        <strong className="text-text-primary">Smart Contracts:</strong> Move Language
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-iota-blue"></div>
                        <strong className="text-text-primary">Frontend:</strong> React + IOTA dApp Kit
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-iota-blue"></div>
                        <strong className="text-text-primary">Security:</strong> Local SHA-256 Hashing
                    </li>
                </ul>
            </div>

            <div className="flex justify-center mt-6">
                <Button size="lg" onClick={onGoHome} className="px-12 h-14 w-full md:w-auto text-lg">
                    Return to App
                </Button>
            </div>
        </motion.div>
    );
}
