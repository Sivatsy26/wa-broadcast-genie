
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';

const StartNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <div className="flex items-center">
        <Bot className="h-5 w-5 text-green-500" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">Flow starting point</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-green-500"
      />
    </div>
  );
};

export default StartNode;
