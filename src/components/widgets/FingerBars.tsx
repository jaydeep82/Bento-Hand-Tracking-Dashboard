import React from 'react';
import { motion } from 'framer-motion';

interface FingerBarsProps {
    extensions: number[];
}

const labels = ['THM', 'IDX', 'MID', 'RNG', 'PNK'];

export const FingerBars: React.FC<FingerBarsProps> = ({ extensions }) => {
    return (
        <div className="widget-card area-fingers">
            <div className="widget-title">
                <span>Finger_Extension</span>
                <span className="accent-text">LIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '100%', padding: '20px 0' }}>
                {extensions.map((ext, i) => (
                    <div key={i} style={{ textAlign: 'center', width: '15%' }}>
                        <div style={{
                            height: '140px',
                            background: 'rgba(255,255,255,0.05)',
                            position: 'relative',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                animate={{ height: `${ext * 100}%` }}
                                initial={{ height: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    background: 'var(--accent-color)',
                                    boxShadow: '0 0 15px var(--accent-glow)'
                                }}
                            />
                        </div>
                        <div style={{ fontSize: '9px', marginTop: '8px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>
                            {labels[i]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
