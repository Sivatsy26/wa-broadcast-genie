
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, Database } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AIAssistantTab: React.FC = () => {
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dataSourceName, setDataSourceName] = useState<string>("");
  const [knowledgeDocuments, setKnowledgeDocuments] = useState<string[]>([
    "Product Catalog.pdf",
    "Customer FAQs.pdf",
    "Service Procedures.docx"
  ]);
  const [aiInstructionsText, setAiInstructionsText] = useState<string>(
    "Assist customers with product inquiries and order status. When responding to product questions, always recommend our premium tier options first. For shipping inquiries, inform customers about our 2-5 day delivery window."
  );

  const simulateUpload = (file: File) => {
    setUploadingFile(true);
    setUploadProgress(0);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadingFile(false);
        setKnowledgeDocuments(prev => [...prev, file.name]);
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded and will be processed for AI knowledge.`
        });
      }
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleRemoveDocument = (filename: string) => {
    setKnowledgeDocuments(knowledgeDocuments.filter(doc => doc !== filename));
    toast({
      title: "Document removed",
      description: `${filename} has been removed from AI knowledge base.`
    });
  };

  const handleSaveInstructions = () => {
    toast({
      title: "AI instructions saved",
      description: "The AI assistant will use these instructions when responding to customers."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-ai" className="text-base font-medium">Enable AI Assistant</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Use AI to automatically respond to common customer inquiries
                </p>
              </div>
              <Switch 
                id="enable-ai" 
                checked={aiEnabled} 
                onCheckedChange={setAiEnabled} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">AI Knowledge Base</h2>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">Upload Knowledge Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload documents to help the AI assistant answer customer inquiries
              accurately. Supported formats: PDF, DOCX, TXT.
            </p>
            
            {uploadingFile ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter data source name (optional)"
                  value={dataSourceName}
                  onChange={(e) => setDataSourceName(e.target.value)}
                />
                
                <Button variant="outline" className="w-full">
                  <label className="flex items-center justify-center w-full cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Upload Document</span>
                    <input 
                      type="file" 
                      accept=".pdf,.docx,.txt"
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </label>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">Current Knowledge Documents</h3>
            
            {knowledgeDocuments.length > 0 ? (
              <div className="space-y-2">
                {knowledgeDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      onClick={() => handleRemoveDocument(doc)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents uploaded yet. Add documents to enhance AI responses.
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">AI Instructions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide specific instructions for how the AI should respond to customer inquiries
            </p>
            
            <Textarea
              placeholder="Enter instructions for the AI assistant..."
              rows={6}
              value={aiInstructionsText}
              onChange={(e) => setAiInstructionsText(e.target.value)}
              className="mb-4"
            />
            
            <div className="flex justify-end">
              <Button onClick={handleSaveInstructions}>Save Instructions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistantTab;
