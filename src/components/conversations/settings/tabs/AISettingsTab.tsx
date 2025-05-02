
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Database, Info, FileText, FileSpreadsheet, Image, File } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AISettingsTab = () => {
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dataSourceName, setDataSourceName] = useState<string>("");
  const [knowledgeDocuments, setKnowledgeDocuments] = useState<{name: string, type: string, size: string}[]>([
    {name: "Product Catalog.pdf", type: "pdf", size: "2.4 MB"},
    {name: "Customer FAQs.pdf", type: "pdf", size: "1.2 MB"},
    {name: "Service Procedures.docx", type: "doc", size: "825 KB"},
    {name: "Sales Data Q1 2024.xlsx", type: "spreadsheet", size: "1.8 MB"},
    {name: "Company Logo.jpg", type: "image", size: "340 KB"}
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
        
        // Format file size
        let fileSize = "";
        if (file.size < 1024 * 1024) {
          fileSize = `${Math.round(file.size / 1024)} KB`;
        } else {
          fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        }
        
        // Get file type category
        let fileType = "file";
        if (file.type.includes("pdf")) fileType = "pdf";
        else if (file.type.includes("word") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) fileType = "doc";
        else if (file.type.includes("excel") || file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) fileType = "spreadsheet";
        else if (file.type.includes("image")) fileType = "image";
        
        setKnowledgeDocuments(prev => [...prev, {
          name: file.name,
          type: fileType,
          size: fileSize
        }]);
        
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded to AI knowledge base.`
        });
      }
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file extension
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!allowedExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid file format",
          description: "Please upload PDF, DOC, XLS, XLSX, or JPG files only.",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB.",
          variant: "destructive"
        });
        return;
      }
      
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

  // Function to get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 mr-2 text-red-500" />;
      case "doc":
        return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />;
      case "image":
        return <Image className="h-4 w-4 mr-2 text-purple-500" />;
      default:
        return <File className="h-4 w-4 mr-2 text-gray-500" />;
    }
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
                  Use AI to automatically assist with customer inquiries based on your company documents
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
              Upload documents with company information to help the AI assistant answer inquiries. 
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG.
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
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
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
            <h3 className="font-medium mb-3">Company Knowledge Documents</h3>
            
            {knowledgeDocuments.length > 0 ? (
              <div className="space-y-2">
                {knowledgeDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      {getFileIcon(doc.type)}
                      <div>
                        <span className="text-sm">{doc.name}</span>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      onClick={() => handleRemoveDocument(doc.name)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents uploaded yet. Add documents to enhance AI responses about your company.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">AI Assistant Usage</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Once documents are uploaded, users can chat with the AI Assistant to find information
              about your company. The AI will analyze the documents and provide relevant answers.
            </p>
            
            <div className="flex items-center p-3 bg-blue-50 text-blue-800 rounded-md">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                To use the AI Assistant, click the AI button in the top navigation bar when viewing conversations.
              </p>
            </div>
            
            <Button onClick={() => {
              toast({
                title: "Settings saved",
                description: "AI Assistant settings have been updated successfully."
              });
            }} className="w-full">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettingsTab;
