"use client";

export default function ForestFrame() {
  return (
    <>
      {/* Top forest silhouette */}
      <div className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-50">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgb(15, 23, 15)", stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: "rgb(15, 23, 15)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          
          {/* Background gradient */}
          <rect width="1200" height="200" fill="url(#topGradient)" />
          
          {/* Tree silhouettes */}
          <g opacity="0.6" fill="rgba(26, 46, 26, 0.8)">
            {/* Left trees */}
            <path d="M50,80 L40,100 L45,100 L35,120 L40,120 L30,150 L70,150 L60,120 L65,120 L55,100 L60,100 Z" />
            <path d="M100,60 L90,85 L95,85 L85,110 L90,110 L80,150 L120,150 L110,110 L115,110 L105,85 L110,85 Z" />
            <path d="M180,70 L170,95 L175,95 L165,120 L170,120 L160,150 L200,150 L190,120 L195,120 L185,95 L190,95 Z" />
            
            {/* Center trees */}
            <path d="M450,50 L440,75 L445,75 L435,100 L440,100 L430,150 L470,150 L460,100 L465,100 L455,75 L460,75 Z" />
            <path d="M550,65 L540,90 L545,90 L535,115 L540,115 L530,150 L570,150 L560,115 L565,115 L555,90 L560,90 Z" />
            <path d="M650,55 L640,80 L645,80 L635,105 L640,105 L630,150 L670,150 L660,105 L665,105 L655,80 L660,80 Z" />
            
            {/* Right trees */}
            <path d="M1000,70 L990,95 L995,95 L985,120 L990,120 L980,150 L1020,150 L1010,120 L1015,120 L1005,95 L1010,95 Z" />
            <path d="M1080,60 L1070,85 L1075,85 L1065,110 L1070,110 L1060,150 L1100,150 L1090,110 L1095,110 L1085,85 L1090,85 Z" />
            <path d="M1150,75 L1140,100 L1145,100 L1135,125 L1140,125 L1130,150 L1170,150 L1160,125 L1165,125 L1155,100 L1160,100 Z" />
          </g>
          
          {/* Pine trees overlay */}
          <g opacity="0.4" fill="rgba(46, 125, 50, 0.3)">
            <path d="M250,90 L240,110 L245,110 L235,130 L255,130 L250,150 L265,130 L260,110 Z" />
            <path d="M350,85 L340,105 L345,105 L335,125 L355,125 L350,150 L365,125 L360,105 Z" />
            <path d="M750,80 L740,100 L745,100 L735,120 L755,120 L750,150 L765,120 L760,100 Z" />
            <path d="M850,95 L840,115 L845,115 L835,135 L855,135 L850,150 L865,135 L860,115 Z" />
          </g>
        </svg>
      </div>

      {/* Bottom forest silhouette */}
      <div className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none z-50">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgb(15, 23, 15)", stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: "rgb(15, 23, 15)", stopOpacity: 0.9 }} />
            </linearGradient>
          </defs>
          
          {/* Background gradient */}
          <rect width="1200" height="200" fill="url(#bottomGradient)" />
          
          {/* Tree silhouettes */}
          <g opacity="0.6" fill="rgba(26, 46, 26, 0.8)">
            {/* Left trees */}
            <path d="M80,0 L70,20 L75,20 L65,40 L70,40 L60,70 L100,70 L90,40 L95,40 L85,20 L90,20 Z" />
            <path d="M150,10 L140,35 L145,35 L135,60 L140,60 L130,100 L170,100 L160,60 L165,60 L155,35 L160,35 Z" />
            <path d="M220,5 L210,30 L215,30 L205,55 L210,55 L200,90 L240,90 L230,55 L235,55 L225,30 L230,30 Z" />
            
            {/* Center trees */}
            <path d="M500,15 L490,40 L495,40 L485,65 L490,65 L480,110 L520,110 L510,65 L515,65 L505,40 L510,40 Z" />
            <path d="M600,0 L590,25 L595,25 L585,50 L590,50 L580,95 L620,95 L610,50 L615,50 L605,25 L610,25 Z" />
            <path d="M700,20 L690,45 L695,45 L685,70 L690,70 L680,120 L720,120 L710,70 L715,70 L705,45 L710,45 Z" />
            
            {/* Right trees */}
            <path d="M950,10 L940,35 L945,35 L935,60 L940,60 L930,105 L970,105 L960,60 L965,60 L955,35 L960,35 Z" />
            <path d="M1050,5 L1040,30 L1045,30 L1035,55 L1040,55 L1030,100 L1070,100 L1060,55 L1065,55 L1055,30 L1060,30 Z" />
            <path d="M1120,15 L1110,40 L1115,40 L1105,65 L1110,65 L1100,110 L1140,110 L1130,65 L1135,65 L1125,40 L1130,40 Z" />
          </g>
          
          {/* Ground/grass layer */}
          <g opacity="0.5" fill="rgba(46, 125, 50, 0.4)">
            <ellipse cx="300" cy="150" rx="80" ry="30" />
            <ellipse cx="500" cy="140" rx="100" ry="35" />
            <ellipse cx="700" cy="145" rx="90" ry="32" />
            <ellipse cx="900" cy="150" rx="85" ry="28" />
          </g>
        </svg>
      </div>

      {/* Left side branches */}
      <div className="fixed left-0 top-1/4 w-32 h-96 pointer-events-none z-40 opacity-30">
        <svg viewBox="0 0 100 400" className="w-full h-full">
          <g fill="rgba(46, 125, 50, 0.4)">
            <path d="M100,50 Q80,70 60,80 Q40,90 20,85 Q40,95 60,90 Q80,85 100,100" />
            <path d="M100,150 Q85,170 70,175 Q50,180 30,175 Q50,185 70,182 Q85,180 100,195" />
            <path d="M100,250 Q80,270 60,280 Q40,290 20,285 Q40,295 60,290 Q80,285 100,300" />
          </g>
          {/* Leaves */}
          <g fill="rgba(46, 125, 50, 0.3)">
            <ellipse cx="30" cy="85" rx="8" ry="15" transform="rotate(-30 30 85)" />
            <ellipse cx="45" cy="90" rx="10" ry="18" transform="rotate(20 45 90)" />
            <ellipse cx="35" cy="175" rx="9" ry="16" transform="rotate(-25 35 175)" />
            <ellipse cx="50" cy="180" rx="11" ry="19" transform="rotate(15 50 180)" />
            <ellipse cx="30" cy="285" rx="8" ry="15" transform="rotate(-30 30 285)" />
            <ellipse cx="45" cy="290" rx="10" ry="18" transform="rotate(20 45 290)" />
          </g>
        </svg>
      </div>

      {/* Right side branches */}
      <div className="fixed right-0 top-1/3 w-32 h-96 pointer-events-none z-40 opacity-30">
        <svg viewBox="0 0 100 400" className="w-full h-full">
          <g fill="rgba(46, 125, 50, 0.4)">
            <path d="M0,50 Q20,70 40,80 Q60,90 80,85 Q60,95 40,90 Q20,85 0,100" />
            <path d="M0,150 Q15,170 30,175 Q50,180 70,175 Q50,185 30,182 Q15,180 0,195" />
            <path d="M0,250 Q20,270 40,280 Q60,290 80,285 Q60,295 40,290 Q20,285 0,300" />
          </g>
          {/* Leaves */}
          <g fill="rgba(46, 125, 50, 0.3)">
            <ellipse cx="70" cy="85" rx="8" ry="15" transform="rotate(30 70 85)" />
            <ellipse cx="55" cy="90" rx="10" ry="18" transform="rotate(-20 55 90)" />
            <ellipse cx="65" cy="175" rx="9" ry="16" transform="rotate(25 65 175)" />
            <ellipse cx="50" cy="180" rx="11" ry="19" transform="rotate(-15 50 180)" />
            <ellipse cx="70" cy="285" rx="8" ry="15" transform="rotate(30 70 285)" />
            <ellipse cx="55" cy="290" rx="10" ry="18" transform="rotate(-20 55 290)" />
          </g>
        </svg>
      </div>
    </>
  );
}
