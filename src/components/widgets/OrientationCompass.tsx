import React from 'react';
import { motion } from 'framer-motion';

interface OrientationCompassProps {
    rotation: number;
}

export const OrientationCompass: React.FC<OrientationCompassProps> = ({ rotation }) => {
    return (
        <div className="widget-card area-compass">
            <div className="widget-title">
                <span>Orientation_Compass</span>
            </div>
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: '120px',
                    height: '60px',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '100px',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>N</div>
                    <div style={{ position: 'absolute', bottom: -15, left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>S</div>
                    <div style={{ position: 'absolute', right: -15, top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>E</div>
                    <div style={{ position: 'absolute', left: -15, top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>W</div>

                    <motion.div
                        animate={{ rotate: rotation }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: 'white',
                            transformOrigin: 'center'
                        }}
                    />
                    <motion.div
                        animate={{ rotate: rotation }}
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '50%',
                            marginLeft: '-5px',
                            width: '10px',
                            height: '10px',
                            background: 'var(--accent-color)',
                            transformOrigin: '5px 40px',
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                        }}
                    />
                </div>
                <div style={{ position: 'absolute', bottom: 10, fontSize: '10px', fontFamily: 'JetBrains Mono' }}>
                    HDG <span className="accent-text">{Math.round(rotation)}°</span>
                </div>
            </div>
        </div>
    );
};
