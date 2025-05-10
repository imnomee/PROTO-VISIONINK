// In App.js
import React from 'react';
import CameraView from './CameraView';

function App() {
    return (
        <div
            style={{
                width: '70vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            <h1>VisionInk</h1>
            <div style={{ width: '100%', flexGrow: 1 }}>
                {' '}
                {/* Container for CameraView to take available vertical space */}
                <CameraView />
            </div>
        </div>
    );
}

export default App;
