import { useState } from 'react'

// ─── Feed data ────────────────────────────────────────────────────────────────
const FEED = [
  {
    id: 1,
    show: 'Product Builder',
    episode: 'קרולינה פיין | בעיה תוך כדי נהיגה',
    cover: '/cover.png',
    timestamp: '14:22',
    progress: 0.38,
    quote: 'The data shows that people who maintain a sense of optimism — and choosing to act anyway.',
    savedBy: 'You',
    savedAt: 'Just now',
    duration: '0:28',
    likes: 3,
    accent: '#0a2e1c',
    accentLight: '#1DB954',
  },
  {
    id: 2,
    show: 'How I Built This',
    episode: 'Airbnb: Brian Chesky',
    cover: null,
    timestamp: '32:10',
    progress: 0.61,
    quote: 'The most dangerous thing you can do is play it safe. When the world is changing, standing still is moving backward.',
    savedBy: 'Eyal David',
    savedAt: '1h ago',
    duration: '0:22',
    likes: 47,
    accent: '#1a1040',
    accentLight: '#7c6fdf',
  },
  {
    id: 3,
    show: 'Masters of Scale',
    episode: 'Reid Hoffman on Risk',
    cover: null,
    timestamp: '18:45',
    progress: 0.44,
    quote: 'An entrepreneur is someone who jumps off a cliff and builds a plane on the way down.',
    savedBy: 'Sarah K.',
    savedAt: '3h ago',
    duration: '0:15',
    likes: 128,
    accent: '#2a1010',
    accentLight: '#e05050',
  },
  {
    id: 4,
    show: 'Lex Fridman Podcast',
    episode: 'Sam Altman: OpenAI',
    cover: null,
    timestamp: '1:04:33',
    progress: 0.77,
    quote: 'Intelligence is not a single thing. It is a collection of capabilities that we are only beginning to understand.',
    savedBy: 'Noa M.',
    savedAt: 'Yesterday',
    duration: '0:19',
    likes: 214,
    accent: '#0d1f2d',
    accentLight: '#4ca3dd',
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconHeart({ filled }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={filled ? '#1DB954' : 'none'}
      stroke={filled ? '#1DB954' : 'rgba(255,255,255,0.7)'}
      strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}
function IconShare() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
function IconBookmark({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24"
      fill={filled ? '#1DB954' : 'none'}
      stroke={filled ? '#1DB954' : 'rgba(255,255,255,0.7)'}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
}
function IconMore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
      <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
    </svg>
  )
}

// ─── Placeholder cover (when no image) ───────────────────────────────────────
function CoverPlaceholder({ color, size = 52 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 6,
      background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
      border: '1px solid rgba(255,255,255,0.1)',
      flexShrink: 0,
    }}/>
  )
}

// ─── Single highlight card ────────────────────────────────────────────────────
function HighlightCard({ item }) {
  const [liked, setLiked]   = useState(item.savedBy === 'You')
  const [saved, setSaved]   = useState(item.savedBy === 'You')
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      background: '#181818',
      marginBottom: 12,
      flexShrink: 0,
    }}>
      {/* Accent gradient header */}
      <div style={{
        background: `linear-gradient(180deg, ${item.accent} 0%, #181818 100%)`,
        padding: '20px 20px 0',
      }}>
        {/* Show info row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {item.cover
            ? <img src={item.cover} alt="cover"
                style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}/>
            : <CoverPlaceholder color={item.accentLight} size={44} />
          }
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: 'white', fontWeight: 700,
              fontSize: 13, lineHeight: '17px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{item.episode}</p>
            <p style={{
              color: '#b3b3b3', fontWeight: 400,
              fontSize: 11, lineHeight: '15px', marginTop: 2,
            }}>{item.show}</p>
          </div>
          <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', lineHeight: 0 }}>
            <IconMore />
          </button>
        </div>
      </div>

      {/* Quote block */}
      <div style={{
        margin: '0 20px',
        background: 'rgba(0,0,0,0.35)',
        borderLeft: `3px solid ${item.accentLight}`,
        borderRadius: '0 8px 8px 0',
        padding: '14px 16px',
      }}>
        <p style={{
          color: '#ffffff',
          fontSize: 15,
          fontWeight: 450,
          lineHeight: '23px',
          fontStyle: 'italic',
          margin: 0,
        }}>
          "{item.quote}"
        </p>
      </div>

      {/* Progress bar — shows where in the episode */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ position: 'relative', height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${item.progress * 100}%`,
            background: item.accentLight,
            borderRadius: 2,
          }}/>
          {/* Highlight marker */}
          <div style={{
            position: 'absolute',
            left: `${item.progress * 100}%`,
            top: -3, transform: 'translateX(-50%)',
            width: 9, height: 9,
            background: 'white',
            borderRadius: '50%',
          }}/>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 6,
          color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 450,
        }}>
          <span>{item.timestamp}</span>
          <span>{item.duration} clip</span>
        </div>
      </div>

      {/* Actions row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 14px 14px',
        gap: 4,
      }}>
        {/* Play clip button */}
        <button
          onPointerDown={() => setPlaying(p => !p)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'white', border: 'none',
            borderRadius: 20, padding: '8px 16px',
            cursor: 'pointer', flexShrink: 0,
          }}>
          <IconPlay />
          <span style={{ color: '#121212', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
            {playing ? 'Pause' : 'Play clip'}
          </span>
        </button>

        <div style={{ flex: 1 }} />

        {/* Like */}
        <button
          onPointerDown={() => setLiked(l => !l)}
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
          <IconHeart filled={liked} />
        </button>
        {liked && (
          <span style={{ color: '#1DB954', fontSize: 11, fontWeight: 700, marginLeft: -4, marginRight: 4 }}>
            {item.likes + 1}
          </span>
        )}

        {/* Share */}
        <button style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
          <IconShare />
        </button>

        {/* Save */}
        <button
          onPointerDown={() => setSaved(s => !s)}
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
          <IconBookmark filled={saved} />
        </button>
      </div>

      {/* Saved-by footer */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: item.savedBy === 'You' ? '#1DB954' : 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: item.savedBy === 'You' ? '#121212' : 'white',
          flexShrink: 0,
        }}>
          {item.savedBy[0]}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, margin: 0, fontWeight: 400 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{item.savedBy}</span>
          {' '}saved this · {item.savedAt}
        </p>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function HighlightsFeed({ onBack }) {
  const [filter, setFilter] = useState('For You')
  const filters = ['For You', 'Following', 'Product Builder', 'All']

  return (
    <div style={{
      background: '#121212',
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ flexShrink: 0, paddingTop: 54, paddingBottom: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '0 20px', marginBottom: 16,
        }}>
          <button
            onPointerDown={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px 4px 0', lineHeight: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{
              color: 'white', fontSize: 22, fontWeight: 700,
              lineHeight: '26px', letterSpacing: '-0.55px', margin: 0,
            }}>Highlights</h1>
            <p style={{ color: '#b3b3b3', fontSize: 12, margin: '2px 0 0', fontWeight: 400 }}>
              Moments saved by you &amp; others
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          padding: '0 20px 4px',
          scrollbarWidth: 'none',
        }}>
          {filters.map(f => (
            <button
              key={f}
              onPointerDown={() => setFilter(f)}
              style={{
                flexShrink: 0, borderRadius: 20,
                padding: '7px 14px',
                fontSize: 13, fontWeight: 700, lineHeight: '17px',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.2)',
                background: filter === f ? 'white' : 'transparent',
                color: filter === f ? '#121212' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '12px 16px 24px',
        scrollbarWidth: 'none',
      }}>
        {FEED.map(item => (
          <HighlightCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
