
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface KnowledgeBaseUploaderProps {
  onDocumentUpload: (file: File, type: string) => void;
}

const KnowledgeBaseUploader: React.FC<KnowledgeBaseUploaderProps> = ({ onDocumentUpload }) => {
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dataSourceName, setDataSourceName] = useState<string>("");

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
        
        onDocumentUpload(file, type);
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

  return (
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
  );
};

export default KnowledgeBaseUploader;
