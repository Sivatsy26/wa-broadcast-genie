import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Bot, MessageSquare, Copy, Zap, Key, ArrowRight, MessageSquarePlus, FileText, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import custom node components
import StartNode from '@/components/botflow/StartNode';
import MessageNode from '@/components/botflow/MessageNode';
import ConditionNode from '@/components/botflow/ConditionNode';
import AIAssistantNode from '@/components/botflow/AIAssistantNode';
import { MenuNode } from '@/components/botflow/MenuNode';
import KeywordTriggerNode from '@/components/botflow/KeywordTriggerNode';
import CustomEdge from '@/components/botflow/CustomEdge';

// Node types registry
const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  condition: ConditionNode,
  aiAssistant: AIAssistantNode,
  menu: MenuNode,
  keywordTrigger: KeywordTriggerNode,
};

// Edge types registry
const edgeTypes = {
  custom: CustomEdge,
};

// Initial flow data
const initialNodes = [
  {
    id: 'start-1',
    type: 'start',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
];

const initialEdges = [];

// Sample templates for quick start
const flowTemplates = [
  {
    id: 'welcome-flow',
    name: 'Welcome Flow',
    description: 'Greet users and collect basic information',
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
  },
  {
    id: 'support-flow',
    name: 'Support Bot',
    description: 'Handle common customer support inquiries',
    icon: <Bot className="h-10 w-10 text-purple-500" />,
  },
  {
    id: 'sales-flow',
    name: 'Lead Generation',
    description: 'Qualify leads and collect contact information',
    icon: <Zap className="h-10 w-10 text-green-500" />,
  },
  {
    id: 'faq-flow',
    name: 'FAQ Bot',
    description: 'Answer frequently asked questions automatically',
    icon: <Key className="h-10 w-10 text-amber-500" />,
  },
];

const BotFlowBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [flowName, setFlowName] = useState('Untitled Flow');
  const [activeTab, setActiveTab] = useState("editor");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [userFlows, setUserFlows] = useState([]);
  const [triggerKeywords, setTriggerKeywords] = useState(['help', 'support']);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newBotDialogOpen, setNewBotDialogOpen] = useState(false);
  const [newBotName, setNewBotName] = useState('');

  // Check for authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsAuthenticated(!!data.session);
        
        if (data.session) {
          fetchUserFlows();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  // Fetch user's saved flows
  const fetchUserFlows = async () => {
    try {
      setIsLoading(true);
      
      // Use supabase functions.invoke instead of rpc
      const { data: flows, error } = await supabase.functions.invoke('get_user_bot_flows');
      
      if (error) {
        console.error("Error fetching flows using edge function:", error);
        
        // Fallback to direct query
        const { data: directFlows, error: directError } = await supabase
          .from('bot_flows')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (directError) throw directError;
        setUserFlows(directFlows || []);
      } else {
        setUserFlows(flows || []);
      }
    } catch (error) {
      console.error("Error fetching flows:", error);
      toast({
        title: "Failed to load your flows",
        description: "There was an error loading your saved flows.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Connect nodes when connections are made
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge({ ...params, type: 'custom', animated: true }, eds));
  };

  // Add a new node to the flow
  const addNode = (type, label) => {
    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      data: { label },
      position: { x: 250, y: nodes.length * 100 + 100 },
    };
    
    setNodes((nds) => [...nds, newNode]);
    
    // If there's at least one node, connect to the last one
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const newEdge = {
        id: `e${lastNode.id}-${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
        type: 'custom',
        animated: true,
      };
      setEdges((eds) => [...eds, newEdge]);
    }
    
    toast({
      title: "Node Added",
      description: `Added ${label} node to the flow`,
    });
  };

  // Load a template flow
  const loadTemplate = (templateId) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let templateNodes = [];
      let templateEdges = [];
      
      if (templateId === 'welcome-flow') {
        templateNodes = [
          { id: 'start-1', type: 'start', data: { label: 'Start' }, position: { x: 250, y: 0 } },
          { id: 'message-1', type: 'message', data: { label: 'Welcome Message', message: 'Hello! Welcome to our service. How can I help you today?' }, position: { x: 250, y: 100 } },
          { id: 'menu-1', type: 'menu', data: { label: 'Menu Options', options: ['Product Information', 'Support', 'Pricing', 'Talk to agent'] }, position: { x: 250, y: 200 } },
        ];
        templateEdges = [
          { id: 'e1-2', source: 'start-1', target: 'message-1', type: 'custom', animated: true },
          { id: 'e2-3', source: 'message-1', target: 'menu-1', type: 'custom', animated: true },
        ];
      } else if (templateId === 'support-flow') {
        templateNodes = [
          { id: 'start-1', type: 'start', data: { label: 'Start' }, position: { x: 250, y: 0 } },
          { id: 'message-1', type: 'message', data: { label: 'Support Greeting', message: 'Welcome to customer support. What issue are you experiencing?' }, position: { x: 250, y: 100 } },
          { id: 'condition-1', type: 'condition', data: { label: 'Check Issue Type', condition: 'issue_type' }, position: { x: 250, y: 200 } },
          { id: 'aiAssistant-1', type: 'aiAssistant', data: { label: 'AI Support Agent', prompt: 'Help the customer with their issue using the context provided' }, position: { x: 100, y: 300 } },
          { id: 'message-2', type: 'message', data: { label: 'Human Agent', message: 'Connecting you to a human agent...' }, position: { x: 400, y: 300 } },
        ];
        templateEdges = [
          { id: 'e1-2', source: 'start-1', target: 'message-1', type: 'custom', animated: true },
          { id: 'e2-3', source: 'message-1', target: 'condition-1', type: 'custom', animated: true },
          { id: 'e3-4', source: 'condition-1', target: 'aiAssistant-1', type: 'custom', animated: true, label: 'Common Issue' },
          { id: 'e3-5', source: 'condition-1', target: 'message-2', type: 'custom', animated: true, label: 'Complex Issue' },
        ];
      } else if (templateId === 'sales-flow') {
        // Sales flow template
        templateNodes = [
          { id: 'start-1', type: 'start', data: { label: 'Start' }, position: { x: 250, y: 0 } },
          { id: 'message-1', type: 'message', data: { label: 'Sales Greeting', message: 'Hi there! Interested in learning about our products?' }, position: { x: 250, y: 100 } },
          { id: 'menu-1', type: 'menu', data: { label: 'Product Interest', options: ['Basic Plan', 'Premium Plan', 'Enterprise Solution', 'Just Browsing'] }, position: { x: 250, y: 200 } },
          { id: 'message-2', type: 'message', data: { label: 'Collect Contact', message: 'Great choice! Could you share your email to receive more information?' }, position: { x: 250, y: 300 } },
          { id: 'aiAssistant-1', type: 'aiAssistant', data: { label: 'AI Sales Assistant', prompt: 'Respond to specific product questions and provide tailored recommendations' }, position: { x: 250, y: 400 } },
        ];
        templateEdges = [
          { id: 'e1-2', source: 'start-1', target: 'message-1', type: 'custom', animated: true },
          { id: 'e2-3', source: 'message-1', target: 'menu-1', type: 'custom', animated: true },
          { id: 'e3-4', source: 'menu-1', target: 'message-2', type: 'custom', animated: true },
          { id: 'e4-5', source: 'message-2', target: 'aiAssistant-1', type: 'custom', animated: true },
        ];
      } else if (templateId === 'faq-flow') {
        // FAQ flow template
        templateNodes = [
          { id: 'start-1', type: 'start', data: { label: 'Start' }, position: { x: 250, y: 0 } },
          { id: 'keywordTrigger-1', type: 'keywordTrigger', data: { label: 'FAQ Keywords', keywords: ['pricing', 'features', 'subscription', 'cancel'] }, position: { x: 250, y: 100 } },
          { id: 'aiAssistant-1', type: 'aiAssistant', data: { label: 'FAQ AI Assistant', prompt: 'Answer frequently asked questions based on the knowledge base' }, position: { x: 250, y: 200 } },
          { id: 'message-1', type: 'message', data: { label: 'Fallback', message: "I'm sorry, I couldn't find information about that. Would you like to talk to a human agent?" }, position: { x: 250, y: 300 } },
        ];
        templateEdges = [
          { id: 'e1-2', source: 'start-1', target: 'keywordTrigger-1', type: 'custom', animated: true },
          { id: 'e2-3', source: 'keywordTrigger-1', target: 'aiAssistant-1', type: 'custom', animated: true, label: 'Keyword Match' },
          { id: 'e2-4', source: 'keywordTrigger-1', target: 'message-1', type: 'custom', animated: true, label: 'No Match' },
        ];
      } else if (typeof templateId === 'object' && templateId.id) {
        // Load a user-saved flow
        templateNodes = templateId.flow_data.nodes;
        templateEdges = templateId.flow_data.edges;
        setFlowName(templateId.name);
        setTriggerKeywords(templateId.keywords || []);
      }
      
      setNodes(templateNodes);
      setEdges(templateEdges);
      
      if (typeof templateId === 'string') {
        setFlowName(flowTemplates.find(t => t.id === templateId)?.name || 'Untitled Flow');
        setSelectedFlow(templateId);
      } else {
        setSelectedFlow(templateId.id);
      }
      
      toast({
        title: "Flow Loaded",
        description: `Loaded ${typeof templateId === 'string' ? flowTemplates.find(t => t.id === templateId)?.name : templateId.name}`,
      });
      
      setIsLoading(false);
    }, 800);
  };

  // Clone a flow
  const cloneFlow = () => {
    if (!selectedFlow) {
      toast({
        title: "No flow selected",
        description: "Please select a flow to clone",
        variant: "destructive",
      });
      return;
    }

    // Create a deep copy of the current nodes and edges
    const clonedNodes = JSON.parse(JSON.stringify(nodes));
    const clonedEdges = JSON.parse(JSON.stringify(edges));

    // Save the cloned flow with a new name
    saveFlowToDb(`${flowName} (Clone)`, clonedNodes, clonedEdges, [...triggerKeywords]);

    toast({
      title: "Flow Cloned",
      description: `Created a clone of "${flowName}"`,
    });
  };

  // Add/edit trigger keywords
  const handleKeywordChange = (newKeywords) => {
    setTriggerKeywords(newKeywords);
    
    toast({
      title: "Trigger Keywords Updated",
      description: `Updated the trigger keywords for this flow`,
    });
  };

  // Open save dialog
  const openSaveDialog = () => {
    setSaveDialogOpen(true);
  };

  // Open new bot dialog
  const openNewBotDialog = () => {
    setNewBotDialogOpen(true);
  };

  // Create a new bot flow
  const createNewBot = () => {
    if (!newBotName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your new bot flow",
        variant: "destructive",
      });
      return;
    }

    setFlowName(newBotName);
    setNodes(initialNodes);
    setEdges(initialEdges);
    setTriggerKeywords(['help', 'support']);
    setSelectedFlow(null);
    setNewBotDialogOpen(false);
    setNewBotName('');
    
    toast({
      title: "New Bot Created",
      description: `Created a new bot flow "${newBotName}"`,
    });
  };

  // Save the current flow to the database
  const saveFlowToDb = async (name = flowName, flowNodes = nodes, flowEdges = edges, keywords = triggerKeywords) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your flow",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const flowData = {
        name: name,
        flow_data: {
          nodes: flowNodes,
          edges: flowEdges,
        },
        keywords: keywords,
        user_id: userData.user.id
      };

      // If selectedFlow is a string ID from one of our templates, create a new flow
      const isUpdate = selectedFlow && typeof selectedFlow !== 'string';

      let result;
      if (isUpdate) {
        // Update existing flow
        const { data, error } = await supabase
          .from('bot_flows')
          .update(flowData)
          .eq('id', selectedFlow)
          .select();
        
        if (error) throw error;
        result = data[0];
      } else {
        // Create new flow
        const { data, error } = await supabase
          .from('bot_flows')
          .insert(flowData)
          .select();
        
        if (error) throw error;
        result = data[0];
        setSelectedFlow(result.id);
      }

      toast({
        title: "Flow Saved",
        description: `${isUpdate ? 'Updated' : 'Saved'} "${name}" successfully`,
      });

      // Refresh user flows
      fetchUserFlows();
      setSaveDialogOpen(false);
    } catch (error) {
      console.error("Error saving flow:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your flow",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Save the current flow
  const saveFlow = () => {
    if (!flowName || flowName === 'Untitled Flow') {
      openSaveDialog();
    } else {
      saveFlowToDb();
    }
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bot Flow Builder</h1>
            <p className="text-muted-foreground">
              Design complex chat interactions with a drag-and-drop interface
            </p>
          </div>
        </div>
        
        <Card className="text-center p-6">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to create and manage bot flows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You need to be authenticated to use the Bot Flow Builder.</p>
            <Button onClick={handleSignIn}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bot Flow Builder</h1>
          <p className="text-muted-foreground">
            Design complex chat interactions with a drag-and-drop interface
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={openNewBotDialog}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Bot
          </Button>
          <Button 
            variant="outline" 
            onClick={saveFlow}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Flow
          </Button>
          <Button 
            variant="outline"
            onClick={cloneFlow}
          >
            <Copy className="mr-2 h-4 w-4" />
            Clone Flow
          </Button>
          <Button onClick={() => navigate('/chatbots')}>
            Back to Chatbots
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="editor">Flow Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="saved">My Bots</TabsTrigger>
          <TabsTrigger value="keywords">Trigger Keywords</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="mt-4">
          <div className="grid grid-cols-5 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Add Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flow-node-buttons space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addNode('message', 'Message')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addNode('menu', 'Menu Options')}
                  >
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Menu
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addNode('condition', 'Condition')}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Condition
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addNode('aiAssistant', 'AI Assistant')}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    AI Assistant
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addNode('keywordTrigger', 'Keyword Trigger')}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Keyword Trigger
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-4 h-[70vh]">
              <CardHeader className="py-3 px-4 border-b flex flex-row justify-between items-center">
                <CardTitle className="text-lg">{flowName}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-60px)]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                  >
                    <Controls />
                    <MiniMap />
                    <Background gap={16} size={1} />
                  </ReactFlow>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {flowTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all ${selectedFlow === template.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                onClick={() => loadTemplate(template.id)}
              >
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {template.icon}
                  </div>
                  <CardTitle className="text-center text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : userFlows.length > 0 ? (
              userFlows.map((flow) => (
                <Card 
                  key={flow.id} 
                  className={`cursor-pointer transition-all ${selectedFlow === flow.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                  onClick={() => loadTemplate(flow)}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <FileText className="h-10 w-10 text-blue-500" />
                    </div>
                    <CardTitle className="text-center text-lg">{flow.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Last updated: {new Date(flow.updated_at || flow.created_at).toLocaleDateString()}
                    </p>
                    {flow.keywords && flow.keywords.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 justify-center">
                        {flow.keywords.slice(0, 3).map((keyword, i) => (
                          <span key={i} className="bg-muted px-2 py-0.5 text-xs rounded-full">{keyword}</span>
                        ))}
                        {flow.keywords.length > 3 && (
                          <span className="bg-muted px-2 py-0.5 text-xs rounded-full">+{flow.keywords.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-40 text-muted-foreground">
                <p>You don't have any saved bots yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={openNewBotDialog}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Bot
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="keywords" className="mt-4">
          <KeywordManager 
            keywords={triggerKeywords} 
            onChange={handleKeywordChange} 
          />
        </TabsContent>
      </Tabs>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Bot Flow</DialogTitle>
            <DialogDescription>
              Give your bot flow a name to save it
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="flow-name">Bot Flow Name</Label>
            <Input
              id="flow-name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              placeholder="Enter a name for your bot flow"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => saveFlowToDb()}
              disabled={!flowName.trim() || isSaving}
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Bot Dialog */}
      <Dialog open={newBotDialogOpen} onOpenChange={setNewBotDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Bot</DialogTitle>
            <DialogDescription>
              Start building a new bot flow from scratch
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="new-bot-name">Bot Name</Label>
            <Input
              id="new-bot-name"
              value={newBotName}
              onChange={(e) => setNewBotName(e.target.value)}
              placeholder="Enter a name for your new bot"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewBotDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={createNewBot}
              disabled={!newBotName.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Component to manage trigger keywords
const KeywordManager = ({ keywords, onChange }) => {
  const [newKeyword, setNewKeyword] = useState('');
  const { toast } = useToast();
  
  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    if (keywords.includes(newKeyword.trim())) {
      toast({
        title: "Keyword already exists",
        description: "This trigger keyword already exists",
        variant: "destructive",
      });
      return;
    }
    onChange([...keywords, newKeyword.trim()]);
    setNewKeyword('');
  };
  
  const handleRemoveKeyword = (keyword) => {
    onChange(keywords.filter(k => k !== keyword));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigger Keywords</CardTitle>
        <CardDescription>
          Set up various trigger keywords for this bot to handle different scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter a keyword..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddKeyword();
              }
            }}
          />
          <Button onClick={handleAddKeyword}>Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <div
              key={keyword}
              className="bg-muted px-3 py-1 rounded-full flex items-center gap-2"
            >
              <Key className="h-3.5 w-3.5" />
              <span>{keyword}</span>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveKeyword(keyword)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BotFlowBuilder;
