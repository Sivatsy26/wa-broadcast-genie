
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, FileImage, Database, X } from 'lucide-react';

interface Document {
  name: string;
  type: string;
}

interface DocumentListProps {
  documents: Document[];
  onRemoveDocument: (name: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onRemoveDocument }) => {
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
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-3">Knowledge Documents</h3>
        
        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center overflow-hidden">
                  {getFileIcon(doc.type)}
                  <span className="text-sm truncate">{doc.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0 flex-shrink-0"
                  onClick={() => onRemoveDocument(doc.name)}
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
  );
};

export default DocumentList;
