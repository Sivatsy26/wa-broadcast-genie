
import { Node, Edge } from '@xyflow/react';

/**
 * Download flow data as a JSON file
 */
export const downloadAsJson = (nodes: Node[], edges: Edge[], flowName: string) => {
  const fileName = flowName.trim() ? `${flowName.replace(/\s+/g, '_')}_flow.json` : 'bot_flow.json';
  const data = {
    nodes,
    edges,
    flowName
  };
  
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Upload and parse flow data from a JSON file
 */
export const uploadFromJson = (
  event: React.ChangeEvent<HTMLInputElement>,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  setFlowName: (name: string) => void
) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target?.result as string;
      const flowData = JSON.parse(result);
      
      if (flowData.nodes && Array.isArray(flowData.nodes)) {
        setNodes(flowData.nodes);
      }
      
      if (flowData.edges && Array.isArray(flowData.edges)) {
        setEdges(flowData.edges);
      }
      
      if (flowData.flowName) {
        setFlowName(flowData.flowName);
      }
    } catch (error) {
      console.error('Error parsing flow JSON:', error);
    }
  };
  
  reader.readAsText(file);
  
  // Reset the input value so the same file can be uploaded again if needed
  event.target.value = '';
};
