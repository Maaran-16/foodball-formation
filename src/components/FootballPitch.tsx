import React, { useRef, useEffect } from 'react';
import { Player, TacticalArrow } from '../types';

interface FootballPitchProps {
  players: Player[];
  arrows: TacticalArrow[];
  onPlayerDrag: (playerId: string, x: number, y: number) => void;
  onArrowCreate: (arrow: Omit<TacticalArrow, 'id'>) => void;
  isDrawingMode: boolean;
}

const FootballPitch: React.FC<FootballPitchProps> = ({
  players,
  arrows,
  onPlayerDrag,
  onArrowCreate,
  isDrawingMode
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [draggedPlayer, setDraggedPlayer] = React.useState<string | null>(null);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [drawingArrow, setDrawingArrow] = React.useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent, playerId: string) => {
    if (isDrawingMode) return;
    
    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;

    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDraggedPlayer(playerId);
    setDragOffset({
      x: mouseX - player.x,
      y: mouseY - player.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedPlayer || isDrawingMode) return;

    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = Math.max(25, Math.min(rect.width - 25, mouseX - dragOffset.x));
    const newY = Math.max(25, Math.min(rect.height - 25, mouseY - dragOffset.y));

    onPlayerDrag(draggedPlayer, newX, newY);
  };

  const handleMouseUp = () => {
    setDraggedPlayer(null);
  };

  const handlePitchClick = (e: React.MouseEvent) => {
    if (!isDrawingMode) return;

    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (!drawingArrow) {
      setDrawingArrow({
        startX: mouseX,
        startY: mouseY,
        endX: mouseX,
        endY: mouseY
      });
    } else {
      onArrowCreate({
        startX: drawingArrow.startX,
        startY: drawingArrow.startY,
        endX: mouseX,
        endY: mouseY,
        color: '#ef4444'
      });
      setDrawingArrow(null);
    }
  };

  const handleMouseMoveDrawing = (e: React.MouseEvent) => {
    if (!isDrawingMode || !drawingArrow) return;

    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDrawingArrow({
      ...drawingArrow,
      endX: mouseX,
      endY: mouseY
    });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-b from-green-400 to-green-500 rounded-lg shadow-2xl overflow-hidden">
      <div
        ref={pitchRef}
        className="relative w-full h-[500px] cursor-crosshair"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)
          `,
          backgroundSize: '20px 20px'
        }}
        onMouseMove={isDrawingMode ? handleMouseMoveDrawing : handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handlePitchClick}
      >
        {/* Pitch markings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Outer boundary */}
          <rect x="20" y="20" width="calc(100% - 40px)" height="calc(100% - 40px)" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Center line - VERTICAL */}
          <line x1="50%" y1="20" x2="50%" y2="calc(100% - 20px)" 
                stroke="white" strokeWidth="3" />
          
          {/* Center circle */}
          <circle cx="50%" cy="50%" r="50" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="50%" cy="50%" r="2" fill="white" />
          
          {/* Left penalty area */}
          <rect x="20" y="calc(50% - 100px)" width="120" height="200" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Right penalty area */}
          <rect x="calc(100% - 140px)" y="calc(50% - 100px)" width="120" height="200" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Left goal area */}
          <rect x="20" y="calc(50% - 50px)" width="50" height="100" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Right goal area */}
          <rect x="calc(100% - 70px)" y="calc(50% - 50px)" width="50" height="100" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Left goal */}
          <rect x="10" y="calc(50% - 35px)" width="10" height="70" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Right goal */}
          <rect x="calc(100% - 20px)" y="calc(50% - 35px)" width="10" height="70" 
                fill="none" stroke="white" strokeWidth="3" />
          
          {/* Penalty spots */}
          <circle cx="80" cy="50%" r="3" fill="white" />
          <circle cx="calc(100% - 80px)" cy="50%" r="3" fill="white" />
          
          {/* Corner arcs */}
          <path d="M 20 20 A 10 10 0 0 1 30 20" fill="none" stroke="white" strokeWidth="3" />
          <path d="M 20 calc(100% - 20px) A 10 10 0 0 0 30 calc(100% - 20px)" fill="none" stroke="white" strokeWidth="3" />
          <path d="M calc(100% - 20px) 20 A 10 10 0 0 0 calc(100% - 30px) 20" fill="none" stroke="white" strokeWidth="3" />
          <path d="M calc(100% - 20px) calc(100% - 20px) A 10 10 0 0 1 calc(100% - 30px) calc(100% - 20px)" fill="none" stroke="white" strokeWidth="3" />
          
          {/* Penalty arcs */}
          <path d="M 80 calc(50% - 60px) A 60 60 0 0 1 80 calc(50% + 60px)" fill="none" stroke="white" strokeWidth="3" />
          <path d="M calc(100% - 80px) calc(50% - 60px) A 60 60 0 0 0 calc(100% - 80px) calc(50% + 60px)" fill="none" stroke="white" strokeWidth="3" />
        </svg>

        {/* Tactical arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {arrows.map(arrow => (
            <g key={arrow.id}>
              <defs>
                <marker
                  id={`arrowhead-${arrow.id}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={arrow.color}
                  />
                </marker>
              </defs>
              <line
                x1={arrow.startX}
                y1={arrow.startY}
                x2={arrow.endX}
                y2={arrow.endY}
                stroke={arrow.color}
                strokeWidth="3"
                markerEnd={`url(#arrowhead-${arrow.id})`}
              />
            </g>
          ))}
          
          {/* Drawing arrow preview */}
          {drawingArrow && (
            <g>
              <defs>
                <marker
                  id="arrowhead-preview"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#ef4444"
                  />
                </marker>
              </defs>
              <line
                x1={drawingArrow.startX}
                y1={drawingArrow.startY}
                x2={drawingArrow.endX}
                y2={drawingArrow.endY}
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="5,5"
                markerEnd="url(#arrowhead-preview)"
              />
            </g>
          )}
        </svg>

        {/* Players */}
        {players.map(player => (
          <div
            key={player.id}
            className={`absolute w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-move flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110 ${
              draggedPlayer === player.id ? 'scale-110 z-10' : ''
            }`}
            style={{
              left: player.x - 24,
              top: player.y - 24,
              backgroundColor: player.color,
              userSelect: 'none'
            }}
            onMouseDown={(e) => handleMouseDown(e, player.id)}
          >
            {player.position}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballPitch;