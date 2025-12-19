import React, { useEffect, useState } from 'react';
import { useHandTracker } from './hooks/useHandTracker';
import { FingerBars } from './components/widgets/FingerBars';
import { OrientationCompass } from './components/widgets/OrientationCompass';
import { PinchSignal } from './components/widgets/PinchSignal';
import { NeuralHeatmap } from './components/widgets/NeuralHeatmap';
import { DetectedGesture } from './components/widgets/DetectedGesture';
import { calculateFingerExtension, calculatePinchStrength, getHandOrientation } from './utils/handMath';
import './styles/Dashboard.css';

const App: React.FC = () => {
    const { handLandmarker, isLoading, videoRef, canvasRef } = useHandTracker();
    const [frameData, setFrameData] = useState({
        extensions: [0.5, 0.5, 0.5, 0.5, 0.5],
        pinch: 0,
        orientation: 163,
        landmarks: null as any,
        gesture: 'Scanning...'
    });

    useEffect(() => {
        if (isLoading) return;

        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener('loadeddata', predictWebcam);
            }
        };

        let lastVideoTime = -1;
        const predictWebcam = async () => {
            if (!videoRef.current || !handLandmarker) return;

            const startTimeMs = performance.now();
            if (lastVideoTime !== videoRef.current.currentTime) {
                lastVideoTime = videoRef.current.currentTime;
                const results = handLandmarker.detectForVideo(videoRef.current, startTimeMs);

                if (results.landmarks && results.landmarks.length > 0) {
                    const landmarks = results.landmarks[0];
                    const extensions = calculateFingerExtension(landmarks);
                    const pinch = calculatePinchStrength(landmarks);
                    const orientation = getHandOrientation(landmarks);

                    let gesture = 'Open';
                    if (pinch > 0.8) gesture = 'Pinch';
                    else if (extensions.every(e => e < 0.2)) gesture = 'Closed';
                    else if (extensions[1] > 0.8 && extensions.slice(2).every(e => e < 0.2)) gesture = 'Point';

                    setFrameData({
                        extensions,
                        pinch,
                        orientation,
                        landmarks,
                        gesture
                    });

                    // Draw landmarks on canvas
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.strokeStyle = '#00ff9d';
                            ctx.lineWidth = 2;
                            ctx.fillStyle = '#00ff9d';

                            // Draw connections (Simplified)
                            const connections = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];

                            connections.forEach(([i, j]) => {
                                const pt1 = landmarks[i];
                                const pt2 = landmarks[j];
                                ctx.beginPath();
                                ctx.moveTo(pt1.x * canvas.width, pt1.y * canvas.height);
                                ctx.lineTo(pt2.x * canvas.width, pt2.y * canvas.height);
                                ctx.stroke();
                            });

                            landmarks.forEach((lm: any) => {
                                ctx.beginPath();
                                ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 3, 0, 2 * Math.PI);
                                ctx.fill();
                            });
                        }
                    }
                }
            }
            requestAnimationFrame(predictWebcam);
        };

        startCamera();
    }, [isLoading, handLandmarker]);

    return (
        <div className="dashboard-container">
            {/* Header Info */}
            <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                zIndex: 100,
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                display: 'flex',
                gap: '40px'
            }}>
                <div>NEURAL INTERFACE TERMINAL // MEDIAPIPE</div>
                <div><span style={{ color: 'var(--accent-color)' }}>●</span> LIVE  CPU_MEM: 14%  UTC+00</div>
            </div>

            {/* Main Camera Widget */}
            <div className="widget-card area-camera">
                <div className="widget-title">
                    <span>OPTICAL_SENSOR_01</span>
                    <span className="accent-text" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'red' }}></span> REC
                    </span>
                </div>
                <div className="camera-feed-container">
                    <video ref={videoRef} autoPlay playsInline className="camera-video" />
                    <canvas ref={canvasRef} className="camera-canvas" width={800} height={600} />
                    <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: '10px', opacity: 0.5 }}>
                        FPS 31 HANDS 1
                    </div>
                </div>
            </div>

            <FingerBars extensions={frameData.extensions} />
            <OrientationCompass rotation={frameData.orientation} />
            <PinchSignal strength={frameData.pinch} />
            <NeuralHeatmap landmarks={frameData.landmarks} />
            <DetectedGesture gesture={frameData.gesture} />
        </div>
    );
};

export default App;
