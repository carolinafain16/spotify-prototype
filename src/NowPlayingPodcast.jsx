import { useState, useRef, useEffect } from 'react'

// Product Builder podcast cover art — place your image at: public/cover.png
const imgAlbumArt = "/cover.png"

const HOLD_DURATION      = 1500   // ms — full hold required
const SWIPE_CANCEL       = 8      // px — movement before treating as swipe
const HIGHLIGHT_TOTAL_MS = 6000   // ms — total sweep duration across full text
const AUTO_STOP_MS       = 15000  // ms — auto-stop if user doesn't tap again

// Perimeter of rounded-rect 361×361 r=9 (clockwise from top-center) ≈ 1405px
const PERIMETER  = 1405
const BORDER_PATH =
  'M180,3 L349,3 A9,9,0,0,1,358,12 L358,349 A9,9,0,0,1,349,358 ' +
  'L12,358 A9,9,0,0,1,3,349 L3,12 A9,9,0,0,1,12,3 L180,3'

// Transcript from Figma design
const TRANSCRIPT_TEXT =
  "The data shows that people who maintain a sense of optimism — and choosing to act anyway."
const WORDS = TRANSCRIPT_TEXT.split(' ')

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconChevronDown() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M5 8L10.5 13.5L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconMore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <circle cx="5" cy="12" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="19" cy="12" r="1.5"/>
    </svg>
  )
}
function IconHeart({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={active ? '#1DB954' : 'none'}
      stroke={active ? '#1DB954' : '#b3b3b3'}
      strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}
function IconSpeed1x() {
  return (
    <span style={{ color: 'white', fontSize: '16px', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1 }}>
      1×
    </span>
  )
}
function IconRewind15() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M22 13a9 9 0 1 1-9-9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <polyline points="12,1 16,4.5 12,8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="13" y="16.5" fontFamily="system-ui, -apple-system" fontSize="7.5" fontWeight="700" fill="white" textAnchor="middle">15</text>
    </svg>
  )
}
function IconForward15() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M4 13a9 9 0 1 0 9-9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <polyline points="14,1 10,4.5 14,8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="13" y="16.5" fontFamily="system-ui, -apple-system" fontSize="7.5" fontWeight="700" fill="white" textAnchor="middle">15</text>
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="#0d2318"/>
      <rect x="14" y="4" width="4" height="16" rx="1" fill="#0d2318"/>
    </svg>
  )
}
function IconRepeat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}
function IconShare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
function IconQueue() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="15" y2="18"/>
    </svg>
  )
}

// ─── Hold progress border — Spotify green stroke ──────────────────────────────
function ProgressBorder({ progress }) {
  if (progress <= 0) return null
  const offset = PERIMETER * (1 - progress)
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ inset: '-3px', width: 'calc(100% + 6px)', height: 'calc(100% + 6px)' }}
      viewBox="-3 -3 367 367"
      fill="none"
    >
      <path d={BORDER_PATH} stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none"/>
      <path
        d={BORDER_PATH}
        stroke="#1DB954"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={PERIMETER}
        strokeDashoffset={offset}
      />
    </svg>
  )
}

// ─── Transcript strip — smooth line-by-line marker sweep ─────────────────────
// Line positions are measured once via getBoundingClientRect after first show.
// highlightProgress (0–1) drives one overlay rect per text line, each sweeping
// left→right in sequence: line 0 sweeps 0→1/n, line 1 sweeps 1/n→2/n, etc.
function TranscriptStrip({ visible, highlightProgress }) {
  const wrapRef    = useRef(null)
  const measuredRef = useRef(false)
  const [lines, setLines] = useState([]) // [{top, left, right, height}]

  // Measure word-span positions to find line boundaries.
  // Runs once when the transcript first becomes visible so layout is stable.
  useEffect(() => {
    if (!visible || measuredRef.current || !wrapRef.current) return
    // RAF gives the browser one frame to finish painting the slide-in transition
    const raf = requestAnimationFrame(() => {
      const spans = wrapRef.current?.querySelectorAll('[data-wi]')
      if (!spans?.length) return
      const parentRect = wrapRef.current.getBoundingClientRect()
      const lineMap = new Map()
      spans.forEach(span => {
        const r = span.getBoundingClientRect()
        // Round to nearest 2px to tolerate sub-pixel positioning differences
        const y = Math.round((r.top - parentRect.top) / 2) * 2
        if (!lineMap.has(y)) {
          lineMap.set(y, { top: r.top - parentRect.top, left: Infinity, right: -Infinity, height: r.height })
        }
        const ln = lineMap.get(y)
        ln.left  = Math.min(ln.left,  r.left  - parentRect.left)
        ln.right = Math.max(ln.right, r.right - parentRect.left)
      })
      const sorted = [...lineMap.values()].sort((a, b) => a.top - b.top)
      setLines(sorted)
      measuredRef.current = true
    })
    return () => cancelAnimationFrame(raf)
  }, [visible])

  const numLines = lines.length || 1

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        left: '13px',
        right: '13px',
        top: '409px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div
        ref={wrapRef}
        className="rounded-[10px] px-4 py-3"
        style={{ background: 'rgba(0,0,0,0.4)', position: 'relative' }}
      >
        {/* One highlight overlay per text line, sweeps left → right in sequence */}
        {lines.map((line, i) => {
          const lineStart = i / numLines
          const lineEnd   = (i + 1) / numLines
          const lineP =
            highlightProgress <= lineStart ? 0 :
            highlightProgress >= lineEnd   ? 1 :
            (highlightProgress - lineStart) / (lineEnd - lineStart)
          if (lineP <= 0) return null
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left:   line.left,
                top:    line.top + 2,
                width:  `${(line.right - line.left) * lineP}px`,
                height: line.height - 4,
                background: 'rgba(255, 215, 0, 0.60)',
                borderRadius: '3px',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )
        })}

        {/* Text — sits above the highlight overlays */}
        <p style={{ position: 'relative', zIndex: 1, margin: 0, lineHeight: 1.55, fontSize: '13px', color: 'white' }}>
          {WORDS.map((word, i) => (
            <span
              key={i}
              data-wi={i}
              style={{ display: 'inline', marginRight: i < WORDS.length - 1 ? '4px' : 0 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function NowPlayingPodcast({ onHighlight }) {
  // ── Refs ───────────────────────────────────────────────────────────────────
  const rafRef               = useRef(null)   // hold-progress animation frame (visual only)
  const holdTimerRef         = useRef(null)   // setTimeout that guarantees hold completes
  const startTimeRef         = useRef(null)
  const startPosRef          = useRef({ x: 0, y: 0 })
  const activeRef            = useRef(false)
  const highlightingRef      = useRef(false)
  const highlightRafRef      = useRef(null)   // text-sweep animation frame
  const highlightStartRef    = useRef(null)   // sweep start timestamp
  const timerIdsRef          = useRef([])
  // Stable setter refs — always point at the latest setter so closures stay fresh
  const setHighlightProgressRef = useRef(null)
  const setShowTranscriptRef    = useRef(null)
  const setCoverShrunkRef       = useRef(null)
  const setToastRef             = useRef(null)
  const onHighlightRef          = useRef(onHighlight)
  const confirmRef              = useRef(null)

  // ── State ──────────────────────────────────────────────────────────────────
  const [liked,             setLiked]             = useState(false)
  const [progress,          setProgress]          = useState(0)
  const [pressing,          setPressing]          = useState(false)
  const [coverShrunk,       setCoverShrunk]       = useState(false)
  const [showTranscript,    setShowTranscript]    = useState(false)
  const [highlightProgress, setHighlightProgress] = useState(0)
  const [toast,             setToast]             = useState(false)

  // Wire setter refs every render so timer/RAF callbacks never go stale
  setHighlightProgressRef.current = setHighlightProgress
  setShowTranscriptRef.current    = setShowTranscript
  setCoverShrunkRef.current       = setCoverShrunk
  setToastRef.current             = setToast
  onHighlightRef.current          = onHighlight

  // ── Helpers ────────────────────────────────────────────────────────────────
  const stopSweep = () => {
    if (highlightRafRef.current) {
      cancelAnimationFrame(highlightRafRef.current)
      highlightRafRef.current = null
    }
  }

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay)
    timerIdsRef.current.push(id)
    return id
  }
  const clearAllTimers = () => {
    timerIdsRef.current.forEach(clearTimeout)
    timerIdsRef.current = []
  }

  // Shared confirm — called by second tap OR auto-stop.
  const confirmHighlight = () => {
    if (!highlightingRef.current) return
    highlightingRef.current = false
    stopSweep()
    clearAllTimers()
    navigator.vibrate?.(150)
    setToastRef.current?.(true)
    // Transcript + cover return after 2s so user can read highlighted words
    const t1 = setTimeout(() => {
      setShowTranscriptRef.current?.(false)
      setCoverShrunkRef.current?.(false)
    }, 2000)
    // Snackbar fades after 4s, progress resets
    const t2 = setTimeout(() => {
      setToastRef.current?.(false)
      setHighlightProgressRef.current?.(0)
    }, 4000)
    timerIdsRef.current.push(t1, t2)
    onHighlightRef.current?.()
  }

  confirmRef.current = confirmHighlight

  // Smooth RAF-driven sweep — animates highlightProgress 0→1 over HIGHLIGHT_TOTAL_MS
  const startSweep = () => {
    setHighlightProgressRef.current?.(0)
    highlightStartRef.current = performance.now()

    const animate = (now) => {
      if (!highlightingRef.current) return
      const p = Math.min((now - highlightStartRef.current) / HIGHLIGHT_TOTAL_MS, 1)
      setHighlightProgressRef.current?.(p)
      if (p < 1) {
        highlightRafRef.current = requestAnimationFrame(animate)
      }
    }
    highlightRafRef.current = requestAnimationFrame(animate)
  }

  // Full sequence triggered after hold completes
  const runSequence = () => {
    highlightingRef.current = true
    setCoverShrunkRef.current?.(true)
    addTimer(() => {
      setShowTranscriptRef.current?.(true)
      startSweep()
      // Auto-stop after 15s if user doesn't tap
      addTimer(() => {
        if (highlightingRef.current) confirmRef.current()
      }, AUTO_STOP_MS)
    }, 300)
  }

  const cancelPress = () => {
    activeRef.current = false
    cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null }
    setPressing(false)
    setProgress(0)
  }

  const startPress = (clientX, clientY) => {
    activeRef.current = true
    startPosRef.current = { x: clientX, y: clientY }
    startTimeRef.current = performance.now()
    setPressing(true)

    // setTimeout guarantees the hold triggers exactly at HOLD_DURATION,
    // even when RAF is throttled (background tab, power-save, testing)
    holdTimerRef.current = setTimeout(() => {
      if (!activeRef.current) return
      holdTimerRef.current = null
      activeRef.current = false
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      setPressing(false)
      setProgress(0)
      runSequence()
    }, HOLD_DURATION)

    // RAF drives only the visual progress ring — no completion logic here
    const tick = (now) => {
      if (!activeRef.current) return
      const p = Math.min((now - startTimeRef.current) / HOLD_DURATION, 1)
      setProgress(p)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const onPointerDown = (e) => {
    if (e.button > 0) return
    // Tap while highlighting → stop and save at this exact moment
    if (highlightingRef.current) {
      confirmRef.current()
      return
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    startPress(e.clientX, e.clientY)
  }

  const onPointerMove = (e) => {
    if (!activeRef.current) return
    const dx = Math.abs(e.clientX - startPosRef.current.x)
    const dy = Math.abs(e.clientY - startPosRef.current.y)
    if (dx > SWIPE_CANCEL || dy > SWIPE_CANCEL) cancelPress()
  }

  const onPointerUp     = () => cancelPress()
  const onPointerCancel = () => cancelPress()

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    stopSweep()
    clearAllTimers()
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: 'linear-gradient(to bottom, #000000 42%, #666666 100%)' }}
    >
      {/* Top bar: ··· (left) | Show name (center) | ∨ (right) */}
      <div className="absolute top-[50px] left-0 right-0 flex items-center justify-between px-5 z-10">
        <button className="w-[44px] h-[44px] flex items-center justify-center -ml-2">
          <IconMore />
        </button>
        <p className="text-white text-[14px] font-bold">
          פרודקט בילדר | Product Builder
        </p>
        <button className="w-[44px] h-[44px] flex items-center justify-center -mr-2">
          <IconChevronDown />
        </button>
      </div>

      {/* Hint text — top, below header */}
      <p
        className="absolute z-10 text-center pointer-events-none halo-pulse"
        style={{
          top: '119px',
          left: '53px',
          right: '53px',
          fontSize: '11px',
          color: '#fbea8b',
          margin: 0,
        }}
      >
        Long-press the HIGHLIGHT button to save a moment
      </p>

      {/* ── Cover image — long-press target ── */}
      <div
        className="absolute left-0 right-0 mx-auto top-[148px] w-[361px] h-[361px] rounded-xl shadow-2xl"
        style={{
          touchAction: 'pan-x',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          transform: coverShrunk ? 'scale(0.65)' : 'scale(1)',
          transformOrigin: 'top center',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={e => e.preventDefault()}
      >
        <img
          alt="podcast cover"
          className={`w-full h-full object-cover rounded-xl pointer-events-none transition-opacity duration-200 ${
            pressing && progress > 0 ? 'opacity-85' : 'opacity-100'
          }`}
          src={imgAlbumArt}
          draggable={false}
        />
        <div className={`absolute inset-0 rounded-xl bg-black pointer-events-none transition-opacity duration-150 ${
          pressing && progress > 0 ? 'opacity-20' : 'opacity-0'
        }`} />
        <ProgressBorder progress={progress} />
      </div>

      {/* HIGHLIGHTING… indicator — appears below shrunken cover */}
      {coverShrunk && (
        <div
          className="absolute z-20 w-full text-center pointer-events-none"
          style={{
            top: '390px',
            fontSize: '11px',
            fontWeight: 500,
            color: '#ffd700',
            letterSpacing: '0.5px',
          }}
        >
          ●&nbsp;&nbsp;HIGHLIGHTING…
        </div>
      )}

      {/* Transcript strip — smooth line-by-line sweep */}
      <TranscriptStrip visible={showTranscript} highlightProgress={highlightProgress} />

      {/* Track info + heart */}
      <div className="absolute left-[16px] right-[16px] top-[572px] flex items-start justify-between z-10">
        <div className="flex-1 mr-4">
          <p className="text-white text-[22px] font-bold leading-[28px] tracking-[-0.5px]">
            קרולינה פיין | בעיה תוך כדי נהיגה
          </p>
          <p className="text-[#b3b3b3] text-[14px] mt-1">Product Builder with Eyal David</p>
        </div>
        <button
          onPointerDown={() => setLiked(l => !l)}
          className="w-[44px] h-[44px] flex items-center justify-center mt-1"
        >
          <IconHeart active={liked} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute left-[16px] right-[16px] top-[636px] z-10">
        <div className="relative h-[4px] bg-[#535353] rounded-full">
          <div className="absolute left-0 top-0 h-full bg-white rounded-full w-[38%]" />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[13px] h-[13px] bg-white rounded-full shadow-md"
            style={{ left: 'calc(38% - 6.5px)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[#b3b3b3] text-[11px] font-medium">14:22</span>
          <span className="text-[#b3b3b3] text-[11px] font-medium">-23:41</span>
        </div>
      </div>

      {/* Playback controls — podcast layout: 1× | ⟲15 | ⏸ | 15⟳ | repeat */}
      <div className="absolute left-[8px] right-[8px] top-[684px] flex items-center justify-between z-10">
        <button className="w-[42px] h-[42px] flex items-center justify-center">
          <IconSpeed1x />
        </button>
        <button className="w-[26px] h-[26px] flex items-center justify-center">
          <IconRewind15 />
        </button>
        <button
          className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center"
          style={{
            boxShadow: coverShrunk
              ? '0 0 0 4px #fbea8b, 0 8px 24px rgba(0,0,0,0.4)'
              : '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <IconPause />
        </button>
        <button className="w-[26px] h-[26px] flex items-center justify-center">
          <IconForward15 />
        </button>
        <button className="w-[22px] h-[22px] flex items-center justify-center">
          <IconRepeat />
        </button>
      </div>

      {/* Bottom utility row */}
      <div className="absolute left-[26px] right-[26px] top-[796px] flex items-center justify-between z-10">
        <button className="w-[44px] h-[44px] flex items-center justify-center"><IconShare /></button>
        <button className="w-[44px] h-[44px] flex items-center justify-center"><IconQueue /></button>
      </div>

    </div>
  )
}
