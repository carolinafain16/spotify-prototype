const THUMBNAIL_URL =
  'https://www.figma.com/api/mcp/asset/c88f5d13-a98d-48f3-8493-ed08491ee452'

const QUOTE_TEXT =
  'I used Claude Code together with Figma MCP, which allowed me to pull Spotify Mobile\u2019s real UI directly into my workspace \u2014 and created a working prototype that feels just like the original app.'

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
}

function IconShareUpload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5303 2.88378L12.0001 2.35352L11.4697 2.88372L7.96973 6.38289C7.6768 6.67575 7.67675 7.15062 7.96961 7.44355C8.26247 7.73648 8.73734 7.73653 9.03027 7.44368L11.25 5.22447V12.4143C11.25 12.8285 11.5858 13.1643 12 13.1643C12.4142 13.1643 12.75 12.8285 12.75 12.4143V5.22477L14.9697 7.44444C15.2626 7.73734 15.7374 7.73734 16.0303 7.44444C16.3232 7.15155 16.3232 6.67668 16.0303 6.38378L12.5303 2.88378ZM4.5 8.24999C4.08579 8.24999 3.75 8.58578 3.75 8.99999V20.4145C3.75 20.8288 4.08579 21.1645 4.5 21.1645H19.5C19.9142 21.1645 20.25 20.8288 20.25 20.4145V8.99999C20.25 8.58578 19.9142 8.24999 19.5 8.24999H17V9.74999H18.75V19.6645H5.25V9.74999H7V8.24999H4.5Z"
        fill="black"
      />
    </svg>
  )
}

export default function QuoteCardScreen({ visible, onClose }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Highlight from Product Builder',
          text: QUOTE_TEXT,
        })
      } catch {
        // User cancelled or share failed — no-op
      }
    } else {
      alert('Share:\n\n' + QUOTE_TEXT)
    }
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col"
      style={{
        background: '#121212',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Status bar placeholder */}
      <div className="flex-shrink-0 pt-[54px]" />

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center px-5 pb-4">
        <button
          onPointerDown={onClose}
          className="w-[36px] h-[36px] flex items-center justify-center rounded-full flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <IconClose />
        </button>
        <p className="flex-1 text-center text-white text-[16px] font-semibold">Highlight</p>
        {/* Spacer to balance the close button */}
        <div className="w-[36px] flex-shrink-0" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 flex flex-col justify-center pb-4">
        {/* Quote card */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#1f1f1f' }}
        >
          {/* Episode row */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={THUMBNAIL_URL}
              alt="Product Builder"
              className="w-[44px] h-[44px] rounded-[6px] object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#b3b3b3] text-[12px] leading-tight">Product Builder</p>
              <p className="text-white text-[14px] font-semibold leading-snug mt-0.5 truncate">
                What I Discovered While Driving
              </p>
            </div>
            <button
              className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center flex-shrink-0"
              style={{ paddingLeft: '2px' }}
            >
              <IconPlay />
            </button>
          </div>

          {/* Divider */}
          <div
            className="mb-4"
            style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
          />

          {/* Quote mark */}
          <p
            className="text-[40px] font-bold leading-none mb-2"
            style={{ color: '#1DB954', fontFamily: 'Georgia, serif' }}
          >
            &ldquo;
          </p>

          {/* Quote text */}
          <p
            className="text-[16px] leading-[26px] italic mb-4"
            style={{ color: '#f0f0f0' }}
          >
            {QUOTE_TEXT}
          </p>

          {/* Timestamp */}
          <p className="text-[12px]" style={{ color: '#b3b3b3' }}>
            14:22 &middot; Highlight moment
          </p>
        </div>
      </div>

      {/* Share button */}
      <div className="flex-shrink-0 px-5 pb-8">
        <button
          onPointerDown={handleShare}
          className="w-full h-[52px] rounded-full bg-white flex items-center justify-center gap-2"
        >
          <IconShareUpload />
          <span className="text-black text-[15px] font-bold">Share Highlight</span>
        </button>
      </div>
    </div>
  )
}
