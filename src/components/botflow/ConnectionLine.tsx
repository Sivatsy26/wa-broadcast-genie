
import React from 'react';
import { getBezierPath, Position } from '@xyflow/react';

interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  fromPosition: Position;
  toX: number;
  toY: number;
  toPosition: Position;
}

export default function ConnectionLine({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}: ConnectionLineProps) {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2}
        className="animated"
        d={edgePath}
      />
      <path
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2}
        strokeDasharray="5,5"
        className="animated"
        d={edgePath}
        strokeOpacity={0.4}
      />
    </g>
  );
}
