
import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Node,
  Edge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { v4 as uuidv4 } from 'uuid';

// Custom node types - We're adding just the TextInputNode for now, 
// the rest will be placeholders until fully implemented
import TextInputNode from '@/components/nodes/TextInputNode';

// Layout
import { useWindowSize } from '@uidotdev/usehooks';

// Icons
import { Save, Upload, Download } from 'lucide-react';

// Helper functions
import { downloadAsJson, uploadFromJson } from '@/utils/flowUtils';

// Import our new helper
import { safeSupabaseTable, getTableData, ensureTableExists } from "@/utils/supabaseHelpers";

const BotFlowBuilder = () => {
  const { width, height } = useWindowSize();
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const reactFlowInstance = useReactFlow();
  const [flowName, setFlowName] = useState('');
  const [flowKeywords, setFlowKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<{ id: string; name: string } | null>(null);
  const [availableFlows, setAvailableFlows] = useState<{ id: string; name: string }[]>([]);

  // For now, only include TextInputNode, we'll add the other node types as needed
  const nodeTypes = {
    textInput: TextInputNode,
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handlePlatformChange = (platform: string) => {
		setSelectedPlatforms((prevPlatforms) =>
			prevPlatforms.includes(platform)
				? prevPlatforms.filter((p) => p !== platform)
				: [...prevPlatforms, platform]
		);
	};

  const addNode = (type: string) => {
    const id = uuidv4();
    const newNode = {
      id,
      type,
      data: { label: `${type} node` },
      position: { x: 250, y: 25 },
    };
    setNodes([...nodes, newNode]);
  };

  const handleAddKeyword = () => {
    if (keywordInput && !flowKeywords.includes(keywordInput)) {
      setFlowKeywords([...flowKeywords, keywordInput]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFlowKeywords(flowKeywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleDownload = () => {
    downloadAsJson(nodes, edges, flowName);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadFromJson(event, setNodes, setEdges, setFlowName);
  };

  // Update the function that loads flows to use our helper
  const loadUserFlows = async () => {
    setIsLoading(true);
    
    try {
      // Check if the table exists first
      await ensureTableExists('bot_flows');
      
      // Use our type-safe wrapper for Supabase operations
      const { data, error } = await safeSupabaseTable('bot_flows')
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Process the flow data
        const flows = data.map((flow: any) => ({
          id: flow.id,
          name: flow.name,
        }));
        setAvailableFlows(flows);
      }
    } catch (error) {
      console.error('Error fetching user flows:', error);
      toast.error('Failed to load your flows');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserFlows();
  }, []);

  const loadFlow = async (flowId: string) => {
    setIsLoading(true);
    try {
      // Check if the table exists first
      await ensureTableExists('bot_flows');
      
      // Load the flow data using our helper
      const { data, error } = await safeSupabaseTable('bot_flows')
        .select()
        .eq('id', flowId);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const flowData = data[0];
        setFlowName(flowData.name);
        setFlowKeywords(flowData.keywords || []);
        setSelectedPlatforms(flowData.flow_data?.platforms || []);
        
        // Ensure flow_data is correctly structured
        if (flowData.flow_data && typeof flowData.flow_data === 'object') {
          const { nodes: loadedNodes, edges: loadedEdges } = flowData.flow_data;
          setNodes(loadedNodes || []);
          setEdges(loadedEdges || []);
        } else {
          console.warn('Flow data is missing or malformed.');
          toast.warning('Flow data is missing or malformed.');
          setNodes([]);
          setEdges([]);
        }
      } else {
        console.warn('Flow not found.');
        toast.warning('Flow not found.');
        setNodes([]);
        setEdges([]);
      }
    } catch (error) {
      console.error('Error loading flow:', error);
      toast.error('Failed to load flow');
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  // Update saveFlow function
  const saveFlow = async () => {
    try {
      if (!flowName) {
        toast.error('Please enter a flow name');
        return;
      }
      
      // Prepare the flow data
      const flow = {
        name: flowName,
        flow_data: {
          nodes: nodes,
          edges: edges,
          platforms: selectedPlatforms,
        },
        keywords: flowKeywords,
        user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
      };
      
      // Check if the table exists first
      await ensureTableExists('bot_flows');
      
      // Save the flow using our helper
      const { error } = await safeSupabaseTable('bot_flows')
        .insert(flow);
      
      if (error) {
        throw error;
      }
      
      toast.success('Flow saved successfully!');
      await loadUserFlows();
    } catch (error) {
      console.error('Error saving flow:', error);
      toast.error('Failed to save flow');
    }
  };

  // Update updateFlow function
  const updateFlow = async () => {
    try {
      if (!selectedFlow) {
        toast.error('No flow selected to update');
        return;
      }
      
      // Update the flow using our helper
      const { error } = await safeSupabaseTable('bot_flows')
        .update({
          name: flowName,
          flow_data: {
            nodes: nodes,
            edges: edges,
            platforms: selectedPlatforms,
          },
          keywords: flowKeywords,
        })
        .eq('id', selectedFlow.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Flow updated successfully!');
      await loadUserFlows();
    } catch (error) {
      console.error('Error updating flow:', error);
      toast.error('Failed to update flow');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Bot Flow Builder</h1>

      {/* Flow Management Section */}
      <div className="mb-4 flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Enter flow name"
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          className="flex-grow"
        />

        {/* Keywords Input */}
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add keywords"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            className="w-48"
          />
          <Button type="button" onClick={handleAddKeyword} size="sm">Add Keyword</Button>
        </div>

        {/* Display Keywords */}
        <div className="flex items-center space-x-2">
          {flowKeywords.map((keyword) => (
            <div key={keyword} className="flex items-center space-x-1 bg-gray-200 rounded-full px-3 py-1 text-sm">
              <span>{keyword}</span>
              <Button 
                type="button" 
                onClick={() => handleRemoveKeyword(keyword)} 
                variant="ghost" 
                size="sm"
                className="h-4 w-4 p-0 text-xs"
              >
                X
              </Button>
            </div>
          ))}
        </div>

				{/* Platform Selection */}
				<div className="flex items-center space-x-2">
					<Label className="flex items-center space-x-2">
						<Switch
							checked={selectedPlatforms.includes('whatsapp')}
							onCheckedChange={() => handlePlatformChange('whatsapp')}
						/>
						<span>WhatsApp</span>
					</Label>
					<Label className="flex items-center space-x-2">
						<Switch
							checked={selectedPlatforms.includes('instagram')}
							onCheckedChange={() => handlePlatformChange('instagram')}
						/>
						<span>Instagram</span>
					</Label>
					<Label className="flex items-center space-x-2">
						<Switch
							checked={selectedPlatforms.includes('telegram')}
							onCheckedChange={() => handlePlatformChange('telegram')}
						/>
						<span>Telegram</span>
					</Label>
				</div>

        <Button onClick={saveFlow}><Save className="mr-2 h-4 w-4" /> Save Flow</Button>
        <Button onClick={updateFlow}>Update Flow</Button>
        <Button onClick={() => setIsDialogOpen(true)}>Load Flow</Button>

        {/* Upload and Download Buttons */}
        <input
          type="file"
          id="upload-flow"
          accept=".json"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <Label htmlFor="upload-flow" className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" /> Upload Flow
        </Label>
        <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download Flow</Button>
      </div>

      {/* Node Creation Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Node</h2>
        <div className="flex space-x-2">
          <Button onClick={() => addNode('textInput')}>Text Input</Button>
        </div>
      </div>

      {/* React Flow Component */}
      <div style={{ width: width ? width * 0.95 : '100%', height: height ? height * 0.7 : '600px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
					fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Load Flow Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Load Existing Flow</DialogTitle>
            <DialogDescription>
              Select a flow from the list below to load it into the builder.
            </DialogDescription>
          </DialogHeader>
          <div>
            {isLoading ? (
              <p>Loading flows...</p>
            ) : (
              <Select onValueChange={(value) => setSelectedFlow(availableFlows.find(flow => flow.id === value) || null)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a flow" />
                </SelectTrigger>
                <SelectContent>
                  {availableFlows.map((flow) => (
                    <SelectItem key={flow.id} value={flow.id}>{flow.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              type="button"
              onClick={() => {
                if (selectedFlow) {
                  loadFlow(selectedFlow.id);
                } else {
                  toast.error('No flow selected');
                }
              }}
              disabled={!selectedFlow}
            >
              Load Flow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BotFlowBuilder;
