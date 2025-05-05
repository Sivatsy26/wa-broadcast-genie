
import React from 'react';
import { getBezierPath, Position } from '@xyflow/react';

interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  fromPosition: Position;
  toX: number;
  toY: number;
  toPosition: Position;
  connectionLineStyle?: React.CSSProperties;
}

export default function ConnectionLine({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineStyle,
}: ConnectionLineProps) {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  // Enhanced styling with animated dashed line
  return (
    <g>
      {/* Main line */}
      <path
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2}
        className="animated"
        d={edgePath}
        style={connectionLineStyle}
      />
      
      {/* Dashed overlay for visual enhancement */}
      <path
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2}
        strokeDasharray="5,5"
        className="animated"
        d={edgePath}
        strokeOpacity={0.4}
        style={connectionLineStyle}
      />
      
      {/* Direction indicator (subtle gradient) */}
      <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
        <stop offset="100%" stopColor="rgba(79, 70, 229, 0.6)" />
      </linearGradient>
    </g>
  );
}
