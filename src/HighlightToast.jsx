import { useEffect, useState } from 'react'

function IconBookmarkFilled() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="#1DB954">
      <path d="M7 4h14a1 1 0 0 1 1 1v18l-8-4-8 4V5a1 1 0 0 1 1-1z" strokeLinejoin="round"/>
    </svg>
  )
}

function IconRewind() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
      <text x="9" y="15" fontSize="7" fill="#b3b3b3" stroke="none" fontWeight="bold">3</text>
    </svg>
  )
}

/**
 * HighlightToast — slides up from the bottom after a successful highlight.
 * Auto-dismisses after 3s. Caller can also pass onDismiss to handle navigation.
 */
export default function HighlightToast({ visible, onDismiss, onViewHighlights }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const t = setTimeout(() => {
        setShow(false)
        setTimeout(onDismiss, 300)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div
      className={`absolute bottom-[100px] left-[16px] right-[16px] z-50 transition-all duration-300 ease-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-[#282828] rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl border border-white/5">
        {/* Icon */}
        <div className="w-[44px] h-[44px] bg-[#1DB954]/15 rounded-full flex items-center justify-center flex-shrink-0">
          <IconBookmarkFilled />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-[15px] font-semibold leading-tight">Highlight saved!</p>
          <p className="text-[#b3b3b3] text-[12px] mt-0.5 flex items-center gap-1">
            <span>Rewound 3s · transcript captured</span>
          </p>
        </div>

        {/* CTA */}
        <button
          onPointerDown={onViewHighlights}
          className="flex-shrink-0 text-[#1DB954] text-[13px] font-semibold whitespace-nowrap py-2 px-1"
        >
          View
        </button>
      </div>

      {/* Thin green progress bar showing auto-dismiss countdown */}
      <div className="mt-2 h-[2px] bg-[#535353] rounded-full overflow-hidden mx-1">
        <div
          className="h-full bg-[#1DB954] rounded-full"
          style={{
            animation: show ? 'shrink 3s linear forwards' : 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  )
}
