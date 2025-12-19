export const calculateFingerExtension = (landmarks: any) => {
    // Simple check: Is the tip higher (lower y) than the MCP?
    // 4: Thumb tip, 8: Index tip, 12: Middle tip, 16: Ring tip, 20: Pinky tip
    // 2, 5, 9, 13, 17 are MCP points
    const tips = [8, 12, 16, 20];
    const mcps = [5, 9, 13, 17];

    const extensions = tips.map((tipIdx, i) => {
        const tip = landmarks[tipIdx];
        const mcp = landmarks[mcps[i]];
        const wrt = landmarks[0];

        // Normalize based on distance from wrist to MCP
        const handScale = Math.sqrt(Math.pow(mcp.x - wrt.x, 2) + Math.pow(mcp.y - wrt.y, 2));
        const extension = (mcp.y - tip.y) / handScale;

        return Math.max(0, Math.min(1, extension * 1.5));
    });

    // Thumb special case
    const thumbTip = landmarks[4];
    const thumbBase = landmarks[2];
    const thumbScale = Math.sqrt(Math.pow(thumbBase.x - landmarks[0].x, 2) + Math.pow(thumbBase.y - landmarks[0].y, 2));
    const thumbExt = Math.sqrt(Math.pow(thumbTip.x - thumbBase.x, 2) + Math.pow(thumbTip.y - thumbBase.y, 2)) / thumbScale;

    return [Math.max(0, Math.min(1, (thumbExt - 0.5) * 2)), ...extensions];
};

export const calculatePinchStrength = (landmarks: any) => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const dist = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) +
        Math.pow(thumbTip.y - indexTip.y, 2) +
        Math.pow(thumbTip.z - indexTip.z, 2)
    );
    // Normalize dist: small dist = 1 (strong pinch), large dist = 0
    return Math.max(0, Math.min(1, 1 - (dist * 10)));
};

export const getHandOrientation = (landmarks: any) => {
    const wrist = landmarks[0];
    const middleMcp = landmarks[9];
    const dx = middleMcp.x - wrist.x;
    const dy = middleMcp.y - wrist.y;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    return (angle * 180) / Math.PI;
};
