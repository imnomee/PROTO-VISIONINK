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
            const setCanvasSize = () => {
                if (video) {
                    canvas.width = video.offsetWidth;
                    canvas.height = video.offsetHeight;
                }
            };

            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);

            function handleMouseDown(e) {
                drawing.current = true;
                // Calculate the mirrored X coordinate
                lastX.current = canvas.width - e.offsetX;
                lastY.current = e.offsetY;
            }

            function handleMouseMove(e) {
                if (!drawing.current) return;
                ctx.beginPath();
                ctx.moveTo(lastX.current, lastY.current);
                const mirroredX = canvas.width - e.offsetX;
                ctx.lineTo(mirroredX, e.offsetY); // Ensure we are using the original offsetY
                ctx.strokeStyle = lineColor.current;
                ctx.lineWidth = lineWidth.current;
                ctx.lineOpacity = lineOpacity.current;
                ctx.stroke();
                lastX.current = mirroredX;
                lastY.current = e.offsetY;
            }

            function handleMouseUp() {
                drawing.current = false;
            }

            // Flip the canvas context horizontally to match the video
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);

            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('mouseout', handleMouseUp);

            return () => {
                window.removeEventListener('resize', setCanvasSize);
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
                canvas.removeEventListener('mouseout', handleMouseUp);
            };
        }
    }, []);

    return (
        <div
            style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
            {' '}
            {/* Added aspectRatio */}
            <video
                ref={videoRef}
                autoPlay
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%' /* Changed to 100% to fill the aspect ratio container */,
                    transform: 'rotateY(180deg)',
                    objectFit:
                        'cover' /* Ensure video fills the aspect ratio container without distortion */,
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
