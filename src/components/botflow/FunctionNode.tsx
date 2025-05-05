
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Code } from 'lucide-react';

const FunctionNode = ({ data, selected }) => {
  return (
    <div className={`px-3 py-2 shadow-md rounded-md bg-white border-2 ${selected ? 'border-blue-500' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-blue-600" />
        <div className="font-semibold text-sm">{data.label || 'Function'}</div>
      </div>
      
      {data.functionCode && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono text-gray-700 max-h-24 overflow-y-auto">
          {data.functionCode.length > 100 
            ? data.functionCode.substring(0, 100) + '...' 
            : data.functionCode}
        </div>
      )}
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 rounded-full bg-blue-500" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 rounded-full bg-blue-500" 
      />
    </div>
  );
};

export default memo(FunctionNode);
