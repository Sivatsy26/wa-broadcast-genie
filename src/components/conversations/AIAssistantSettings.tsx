
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Database, Bot, FileText, X, FileSpreadsheet, FileImage } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AIAssistantSettingsProps {
  onClose: () => void;
}

const AIAssistantSettings: React.FC<AIAssistantSettingsProps> = ({ onClose }) => {
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dataSourceName, setDataSourceName] = useState<string>("");
  const [aiInstructions, setAiInstructions] = useState<string>(
    "Answer customer inquiries accurately based on the company documents. Be helpful and concise."
  );
  
  const [knowledgeDocuments, setKnowledgeDocuments] = useState<{name: string, type: string}[]>([
    { name: "Product Catalog.pdf", type: "pdf" },
    { name: "Customer FAQs.pdf", type: "pdf" },
    { name: "Financial_Report_2023.xlsx", type: "spreadsheet" }
  ]);

  const simulateUpload = (file: File) => {
    setUploadingFile(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadingFile(false);
        
        // Determine file type
        let type = "document";
        if (file.type.includes("pdf")) type = "pdf";
        else if (file.type.includes("spreadsheet") || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) type = "spreadsheet";
        else if (file.type.includes("image")) type = "image";
        
        setKnowledgeDocuments(prev => [...prev, { name: file.name, type }]);
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded to AI knowledge base.`
        });
      }
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleRemoveDocument = (filename: string) => {
    setKnowledgeDocuments(knowledgeDocuments.filter(doc => doc.name !== filename));
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

  const getFileIcon = (type: string) => {
    switch(type) {
      case "pdf":
        return <FileText className="h-4 w-4 mr-2 text-red-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />;
      case "image":
        return <FileImage className="h-4 w-4 mr-2 text-blue-500" />;
      default:
        return <Database className="h-4 w-4 mr-2 text-muted-foreground" />;
    }
  };

  return (
    <>
      <DialogHeader className="pb-4">
        <DialogTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant Settings
        </DialogTitle>
      </DialogHeader>
    
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-ai" className="text-base font-medium">Enable AI Assistant</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use AI to automatically respond to customer inquiries
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
              <h3 className="font-medium mb-3">Upload Company Documents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload documents to help the AI assistant answer customer inquiries. 
                Supported formats: PDF, DOCX, TXT, XLS, XLSX, JPG, PNG.
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
                    placeholder="Enter document description (optional)"
                    value={dataSourceName}
                    onChange={(e) => setDataSourceName(e.target.value)}
                  />
                  
                  <Button variant="outline" className="w-full">
                    <label className="flex items-center justify-center w-full cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Upload Document</span>
                      <input 
                        type="file" 
                        accept=".pdf,.docx,.txt,.xls,.xlsx,.jpg,.jpeg,.png"
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
              <h3 className="font-medium mb-3">Knowledge Documents</h3>
              
              {knowledgeDocuments.length > 0 ? (
                <div className="space-y-2">
                  {knowledgeDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center overflow-hidden">
                        {getFileIcon(doc.type)}
                        <span className="text-sm truncate">{doc.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0 flex-shrink-0"
                        onClick={() => handleRemoveDocument(doc.name)}
                      >
                        <X className="h-4 w-4" />
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
                Provide specific instructions for how the AI should respond to inquiries
              </p>
              
              <Textarea
                placeholder="Enter instructions for the AI assistant..."
                rows={4}
                value={aiInstructions}
                onChange={(e) => setAiInstructions(e.target.value)}
                className="mb-4"
              />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveInstructions}>Save Instructions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AIAssistantSettings;
