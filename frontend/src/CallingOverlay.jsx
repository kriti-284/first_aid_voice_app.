import React from 'react';

const CallingOverlay = ({ onCancel }) => (
    <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(239, 68, 68, 0.98)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}
    >
        <h1 style={{
            fontSize: '60px',
            marginBottom: '10px',
            fontWeight: '900',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)',
        }}>
            🚨 EMERGENCY CALLING 🚨
        </h1>
        <p style={{ fontSize: '28px', fontWeight: '500', marginBottom: '10px' }}>
            Connecting to 911 / Local Services...
        </p>
        <p style={{ marginTop: '20px', fontSize: '18px', fontStyle: 'italic' }}>
            Stay calm and describe your location and situation clearly.
        </p>
        <button
            onClick={onCancel}
            style={{
                marginTop: '50px',
                padding: '15px 40px',
                backgroundColor: '#fff',
                color: '#ef4444',
                border: '4px solid #fca5a5',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                cursor: 'pointer',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            CANCEL CALL
        </button>
    </div>
);

export default CallingOverlay;
