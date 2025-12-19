import React from 'react';
import { motion } from 'framer-motion';

interface NeuralHeatmapProps {
    landmarks: any;
}

export const NeuralHeatmap: React.FC<NeuralHeatmapProps> = ({ landmarks }) => {
    // Create a 5x5 grid
    const grid = Array(25).fill(0);

    // Activate cells based on landmarks if they exist
    if (landmarks) {
        landmarks.forEach((lm: any) => {
            const col = Math.floor(lm.x * 5);
            const row = Math.floor(lm.y * 5);
            const idx = Math.min(24, Math.max(0, row * 5 + col));
            grid[idx] = Math.max(grid[idx], 1 - lm.z * 10);
        });
    }

    return (
        <div className="widget-card area-heatmap">
            <div className="widget-title">
                <span>Neural_Heatmap</span>
                <span className="accent-text">ACTIVE: {landmarks ? '1' : '0'}</span>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '4px',
                height: '100%',
                padding: '10px'
            }}>
                {grid.map((val, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: val > 0 ? 0.8 : 0.1,
                            background: val > 0 ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)',
                            boxShadow: val > 0 ? '0 0 10px var(--accent-glow)' : 'none'
                        }}
                        style={{ borderRadius: '2px' }}
                    />
                ))}
            </div>
        </div>
    );
};
