import React, { useEffect, useRef, useState } from 'react';

interface PinchSignalProps {
    strength: number;
}

export const PinchSignal: React.FC<PinchSignalProps> = ({ strength }) => {
    const [history, setHistory] = useState<number[]>(new Array(50).fill(0));
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setHistory(prev => [...prev.slice(1), strength]);
    }, [strength]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Area
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        history.forEach((val, i) => {
            const x = (i / (history.length - 1)) * canvas.width;
            const y = canvas.height - (val * (canvas.height - 20)) - 10;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 255, 157, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw Line
        ctx.beginPath();
        history.forEach((val, i) => {
            const x = (i / (history.length - 1)) * canvas.width;
            const y = canvas.height - (val * (canvas.height - 20)) - 10;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [history]);

    return (
        <div className="widget-card area-pinch">
            <div className="widget-title">
                <span>Signal_Analysis_Pinch</span>
                <span className="accent-text">{strength.toFixed(3)}</span>
            </div>
            <div style={{ flex: 1, position: 'relative', marginTop: '10px' }}>
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={150}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 10, left: 10, fontSize: '24px', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}>
                    0:09
                </div>
            </div>
        </div>
    );
};
