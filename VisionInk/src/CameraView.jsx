import React, { useEffect, useRef } from 'react';

const CameraView = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const drawing = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const lineColor = useRef('red');
    const lineOpacity = useRef(0.5);
    const lineWidth = useRef(2);

    useEffect(() => {
        async function getVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing the camera: ', error);
            }
        }

        getVideo();

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext('2d') : null;

        if (video && canvas && ctx) {
            const resizeCanvas = () => {
                if (video && canvas) {
                    if (
                        canvas.width !== video.offsetWidth ||
                        canvas.height !== video.offsetHeight
                    ) {
                        canvas.width = video.offsetWidth;
                        canvas.height = video.offsetHeight;
                        // If you had any canvas context transformations (like the flip), you'd need to re-apply them here after resizing.
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            // Re-apply any transformations if needed
                            // ctx.translate(canvas.width, 0);
                            // ctx.scale(-1, 1);
                        }
                    }
                }
            };

            const animationFrame = () => {
                resizeCanvas();
                requestAnimationFrame(animationFrame);
            };

            requestAnimationFrame(animationFrame); // Start the animation loop

            function handleMouseDown(e) {
                drawing.current = true;
                lastX.current = e.offsetX;
                lastY.current = e.offsetY;
            }

            function handleMouseMove(e) {
                if (!drawing.current) return;
                ctx.beginPath();
                ctx.moveTo(lastX.current, lastY.current);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = lineColor.current;
                ctx.lineWidth = lineWidth.current;
                ctx.lineOpacity = lineOpacity.current;
                ctx.stroke();
                lastX.current = e.offsetX;
                lastY.current = e.offsetY;
            }

            function handleMouseUp() {
                drawing.current = false;
            }

            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('mouseout', handleMouseUp);

            return () => {
                // No need to remove resize listener as we are using animation frame
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
                canvas.removeEventListener('mouseout', handleMouseUp);
                // Optionally, you could cancel the animation frame here if needed:
                // cancelAnimationFrame(animationFrame);
            };
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            <video
                ref={videoRef}
                autoPlay
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                }}></video>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}></canvas>
        </div>
    );
};

export default CameraView;
