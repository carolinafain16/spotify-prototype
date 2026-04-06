const imgVector = "https://www.figma.com/api/mcp/asset/f968bbfe-0ff8-4b20-acc5-fedbd76371d1";
const imgBluetooth = "https://www.figma.com/api/mcp/asset/42ba75e0-c1c1-4c2e-9d2f-ee90b8aecdc5";
const imgAlbumArt = "https://www.figma.com/api/mcp/asset/1733623b-c1c5-4d38-bfcb-0c41bc06621b";
const imgChevronDown = "https://www.figma.com/api/mcp/asset/fd510d97-1e25-45ba-bcd4-d4efc2f3d03c";
const imgShuffle = "https://www.figma.com/api/mcp/asset/2be56faf-2b0e-4c8d-9a8a-5e5e7733abfa";
const imgHeart = "https://www.figma.com/api/mcp/asset/b4a1156f-ded4-41df-ae95-cf793c1c11b0";
const imgPlay = "https://www.figma.com/api/mcp/asset/2d26bfc4-4e2f-42a5-9faf-e13338c884c3";
const imgRepeat = "https://www.figma.com/api/mcp/asset/c7577efb-5e58-4d16-b0e8-28f9c29b8861";
const imgProgressDot = "https://www.figma.com/api/mcp/asset/9562a66d-f83b-4bad-aa0d-5361b0bcc078";
const imgNext = "https://www.figma.com/api/mcp/asset/4f516eba-08a8-4a36-a977-038d8af667df";
const imgBack = "https://www.figma.com/api/mcp/asset/8a1d5417-612a-41d6-a58c-3af348f65407";
const imgMore = "https://www.figma.com/api/mcp/asset/9b4f52f0-d655-4538-93b4-28ef208b7f91";
const imgShare = "https://www.figma.com/api/mcp/asset/386957c8-f5b5-4980-90b3-0009db8ed3bd";
const imgVolume = "https://www.figma.com/api/mcp/asset/732e7b82-3d45-42f0-a565-bae24609becc";
const imgRepeatDot = "https://www.figma.com/api/mcp/asset/ad9a2bed-104a-4b5a-bfad-f4c866497645";

function BluetoothIcon({ className }) {
  return (
    <div className={className}>
      <img alt="bluetooth" className="w-full h-full object-contain" src={imgBluetooth} />
    </div>
  );
}

export default function TrackView() {
  return (
    <div className="bg-[#121212] relative w-[430px] h-[932px] overflow-hidden font-sans">
      {/* Background gradient */}
      <div className="absolute bg-gradient-to-b from-[#962419] via-[#661710] to-[#430e09] w-[429px] h-[928px] left-[-1px] top-[-2px]" />

      {/* Top bar */}
      <div className="absolute top-[54px] left-0 right-0 flex items-center justify-between px-5">
        {/* Chevron down */}
        <button className="flex items-center justify-center w-[21px] h-[21px] rotate-[-90deg]">
          <img alt="back" className="w-full h-full object-contain" src={imgChevronDown} />
        </button>
        {/* Title */}
        <span className="text-white text-[14px] font-semibold text-center">
          1(Remastered)
        </span>
        {/* More menu */}
        <button className="w-[21px] h-[21px] flex items-center justify-center">
          <img alt="more" className="w-full h-full object-contain" src={imgMore} />
        </button>
      </div>

      {/* Album art */}
      <div className="absolute left-[26px] top-[160px] w-[380px] h-[380px] rounded-sm overflow-hidden">
        <img alt="album art" className="w-full h-full object-cover" src={imgAlbumArt} />
      </div>

      {/* Track info + heart */}
      <div className="absolute left-[26px] right-[26px] top-[607px] flex items-start justify-between">
        <div>
          <p className="text-white text-[22px] font-semibold tracking-[-0.66px] leading-[28px]">
            From Me to You - Mono / Remast
          </p>
          <p className="text-[#b3b3b3] text-[16px] font-medium mt-1">
            The Beatles
          </p>
        </div>
        <button className="mt-1">
          <img alt="heart" className="w-[22px] h-[22px]" src={imgHeart} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute left-[14px] right-[14px] top-[669px]">
        <div className="relative h-[4px] bg-[#777] rounded-full mx-2 mt-[13px]">
          <div className="absolute left-0 top-0 h-full bg-white rounded-full w-[128px]" />
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '128px' }}>
            <img alt="" className="w-[13px] h-[13px] -translate-x-1/2" src={imgRepeatDot} />
          </div>
        </div>
        <div className="flex justify-between mt-2 px-2">
          <span className="text-[#b2b2b2] text-[10px] font-medium">0:38</span>
          <span className="text-[#b2b2b2] text-[10px] font-medium">-1:18</span>
        </div>
      </div>

      {/* Playback controls */}
      <div className="absolute left-[21px] right-[21px] top-[725px] flex items-center justify-between">
        {/* Shuffle */}
        <button className="w-[22px] h-[22px]">
          <img alt="shuffle" className="w-full h-full object-contain" src={imgShuffle} />
        </button>
        {/* Back */}
        <button className="w-[36px] h-[37px]">
          <img alt="previous" className="w-full h-full object-contain" src={imgBack} />
        </button>
        {/* Play/Pause */}
        <button className="w-[67px] h-[67px]">
          <img alt="play" className="w-full h-full object-contain" src={imgPlay} />
        </button>
        {/* Next */}
        <button className="w-[22px] h-[26px] rotate-180">
          <img alt="next" className="w-full h-full object-contain" src={imgNext} />
        </button>
        {/* Repeat */}
        <button className="w-[29px] h-[29px] relative">
          <img alt="repeat" className="w-full h-full object-contain" src={imgRepeat} />
          <img alt="" className="absolute bottom-0 right-0 w-[4px] h-[4px]" src={imgProgressDot} />
        </button>
      </div>

      {/* Bottom bar: Bluetooth device + share + queue */}
      <div className="absolute left-[21px] right-[21px] top-[815px] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <BluetoothIcon className="w-[29px] h-[29px]" />
          <span className="text-[#17b54e] text-[10.5px] font-semibold">BEATSPILL+</span>
        </div>
        <div className="flex items-center gap-4">
          <button>
            <img alt="share" className="w-[22px] h-[22px] object-contain" src={imgShare} />
          </button>
          <button>
            <img alt="queue" className="w-[18px] h-[16px] object-contain" src={imgVolume} />
          </button>
        </div>
      </div>

      {/* Lyrics card */}
      <div className="absolute left-[20px] right-[20px] top-[862px] bg-[#d8672a] rounded-[7px] h-[69px] flex items-center px-4 justify-between">
        <span className="text-white text-[18px] font-semibold tracking-[-0.54px]">Lyrics</span>
        <button className="bg-[#6b3311] rounded-[21px] px-4 py-1.5 flex items-center gap-1">
          <span className="text-white text-[10.5px] font-semibold">MORE</span>
          <img alt="" className="w-[14px] h-[14px] object-contain" src={imgVector} />
        </button>
      </div>
    </div>
  );
}
