// Custom drone SVG for better animation

const DroneAnimation = () => {
  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="relative">
        {/* Realistic 3D-style SVG Drone Animation */}
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl animate-drone-float">
          {/* Main body */}
          <ellipse cx="110" cy="60" rx="40" ry="18" fill="#222" />
          <ellipse cx="110" cy="60" rx="36" ry="14" fill="#38bdf8" />
          {/* Cockpit */}
          <ellipse cx="110" cy="60" rx="18" ry="10" fill="#fff" />
          <ellipse cx="110" cy="60" rx="12" ry="6" fill="#22c55e" />
          {/* Camera */}
          <circle cx="110" cy="60" r="5" fill="#222" />
          <circle cx="110" cy="60" r="2.5" fill="#38bdf8" />
          {/* Arms */}
          <rect x="30" y="57" width="50" height="6" rx="3" fill="#222" />
          <rect x="140" y="57" width="50" height="6" rx="3" fill="#222" />
          <rect x="107" y="10" width="6" height="40" rx="3" fill="#222" />
          <rect x="107" y="70" width="6" height="40" rx="3" fill="#222" />
          {/* Propellers (animated) */}
          <ellipse cx="35" cy="60" rx="12" ry="4" fill="#38bdf8" className="animate-spin-slow" />
          <ellipse cx="185" cy="60" rx="12" ry="4" fill="#38bdf8" className="animate-spin-slow" />
          <ellipse cx="110" cy="15" rx="8" ry="3" fill="#38bdf8" className="animate-spin-slow" />
          <ellipse cx="110" cy="105" rx="8" ry="3" fill="#38bdf8" className="animate-spin-slow" />
          {/* Status light */}
          <circle cx="110" cy="60" r="3" fill="#22c55e" className="status-pulse" />
        </svg>
        {/* Flight path indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-drone-info/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-drone-info/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-drone-info/20 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneAnimation;