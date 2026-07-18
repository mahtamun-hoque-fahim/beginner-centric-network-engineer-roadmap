import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Network Engineer Roadmap — beginner to interview-ready'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#070807',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 15% 20%, rgba(61,244,154,0.14), transparent 55%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            color: '#3DF49A',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          Network Engineer Roadmap
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            color: '#F3F6F4',
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Beginner to interview-ready.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#8A938E',
            marginTop: 28,
            maxWidth: 780,
          }}
        >
          A scenario-based path for CSE students who want to compete with
          dedicated networking graduates.
        </div>
      </div>
    ),
    { ...size }
  )
}
