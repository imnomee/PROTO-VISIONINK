import React, { useEffect, useRef } from 'react';

const CameraView = () => {
    const videoRef = useRef(null);

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
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                style={{ width: '100%', height: 'auto' }}></video>
        </div>
    );
};

export default CameraView;
