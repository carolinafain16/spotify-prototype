import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import NowPlayingPodcast from './NowPlayingPodcast'
import HighlightToast from './HighlightToast'
import MyHighlights from './MyHighlights'
import HighlightsFeed from './HighlightsFeed'

export default function App() {
  const [screen, setScreen] = useState('podcast')
  const [toastVisible, setToastVisible] = useState(false)

  const handleHighlight = () => setToastVisible(true)
  const handleToastDismiss = () => setToastVisible(false)
  const handleViewHighlights = () => {
    setToastVisible(false)
    setScreen('highlights')
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black py-8 gap-6">
      {/* Screen switcher tabs */}
      <div className="flex gap-2 z-50">
        {[
          { id: 'podcast', label: 'Now Playing + Highlight' },
          { id: 'highlights', label: 'My Highlights' },
          { id: 'feed', label: 'Highlights Feed' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
              screen === tab.id
                ? 'bg-white text-black'
                : 'bg-[#282828] text-[#b3b3b3] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="w-[430px] h-[932px] relative overflow-hidden rounded-[40px] shadow-2xl ring-1 ring-white/10">
        {screen === 'podcast' && (
          <>
            <NowPlayingPodcast onHighlight={handleHighlight} />
            <HighlightToast
              visible={toastVisible}
              onDismiss={handleToastDismiss}
              onViewHighlights={handleViewHighlights}
            />
          </>
        )}

        {screen === 'highlights' && (
          <MyHighlights onBack={() => setScreen('podcast')} />
        )}

        {screen === 'feed' && (
          <HighlightsFeed onBack={() => setScreen('podcast')} />
        )}
      </div>

      {/* Usage hint */}
      <p className="text-[#535353] text-[12px] text-center">
        {screen === 'podcast'
          ? 'Long-press the HIGHLIGHT button to save a moment'
          : 'Back arrow returns to Now Playing'}
      </p>
      <Analytics />
    </div>
  )
}
