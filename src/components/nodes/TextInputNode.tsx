
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TextInputNode = ({ data, isConnectable }: { data: any, isConnectable?: boolean }) => {
  return (
    <div className="p-3 bg-white rounded-md shadow border border-gray-200 min-w-[200px]">
      <Label className="mb-2 block">{data?.label || 'Text Input'}</Label>
      <Input 
        placeholder="Enter text..."
        className="nodrag" // prevents dragging when interacting with the input
        onChange={(e) => {
          if (data.onChange) {
            data.onChange(e.target.value);
          }
        }}
        value={data?.value || ''}
      />
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextInputNode;
