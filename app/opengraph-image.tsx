import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Smart Bookmark App'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-10%',
                        width: '600px',
                        height: '600px',
                        background: '#7c3aed',
                        filter: 'blur(150px)',
                        opacity: 0.2,
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-20%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background: '#db2777',
                        filter: 'blur(150px)',
                        opacity: 0.2,
                        borderRadius: '50%',
                    }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 10 }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'white',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(255,255,255,0.3)'
                    }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'black' }} />
                    </div>
                    <h1 style={{ fontSize: '80px', fontWeight: 900, letterSpacing: '-0.05em', margin: 0 }}>Smart Bookmark</h1>
                </div>
                <p style={{ fontSize: '32px', color: '#a1a1aa', marginTop: '20px', fontWeight: 300 }}>
                    Store your web in one place.
                </p>
            </div>
        ),
        {
            ...size,
        }
    )
}
