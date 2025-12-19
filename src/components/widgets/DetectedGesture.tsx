import React from 'react';
import { Hand } from 'lucide-react';

interface DetectedGestureProps {
    gesture: string;
}

export const DetectedGesture: React.FC<DetectedGestureProps> = ({ gesture }) => {
    return (
        <div className="widget-card area-gesture">
            <div className="widget-title">
                <span>Detected_Gesture</span>
            </div>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <div style={{
                    fontSize: '32px',
                    fontWeight: '900',
                    letterSpacing: '0.1em',
                    fontFamily: 'JetBrains Mono'
                }}>
                    {gesture.toUpperCase()}
                </div>
                <div style={{ opacity: 0.5 }}>
                    <Hand size={48} strokeWidth={1} />
                </div>
            </div>
        </div>
    );
};
