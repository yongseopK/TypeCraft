import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'MBTI';
  const title = searchParams.get('title') || '개발자 유형';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            borderRadius: 32,
            padding: '48px 80px',
            boxShadow: '0 8px 40px rgba(49,130,246,0.12)',
          }}
        >
          <div style={{ fontSize: 20, color: '#8B95A1', marginBottom: 16, letterSpacing: 2 }}>
            Developer MBTI
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#3182F6',
              letterSpacing: 8,
              lineHeight: 1,
            }}
          >
            {type}
          </div>
          <div style={{ fontSize: 28, color: '#191F28', marginTop: 20, fontWeight: 700 }}>
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 16,
              color: '#8B95A1',
              background: '#F2F4F6',
              borderRadius: 100,
              padding: '8px 24px',
            }}
          >
            typecraft.kr
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
