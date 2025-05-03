
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bot } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Import the new components
import AIToggle from './ai-assistant/AIToggle';
import KnowledgeBaseUploader from './ai-assistant/KnowledgeBaseUploader';
import DocumentList from './ai-assistant/DocumentList';
import AIInstructionsEditor from './ai-assistant/AIInstructionsEditor';

interface AIAssistantSettingsProps {
  onClose: () => void;
}

const AIAssistantSettings: React.FC<AIAssistantSettingsProps> = ({ onClose }) => {
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [aiInstructions, setAiInstructions] = useState<string>(
    "Answer customer inquiries accurately based on the company documents. Be helpful and concise."
  );
  
  const [knowledgeDocuments, setKnowledgeDocuments] = useState<{name: string, type: string}[]>([
    { name: "Product Catalog.pdf", type: "pdf" },
    { name: "Customer FAQs.pdf", type: "pdf" },
    { name: "Financial_Report_2023.xlsx", type: "spreadsheet" }
  ]);

  const handleDocumentUpload = (file: File, type: string) => {
    setKnowledgeDocuments(prev => [...prev, { name: file.name, type }]);
  };

  const handleRemoveDocument = (filename: string) => {
    setKnowledgeDocuments(knowledgeDocuments.filter(doc => doc.name !== filename));
    toast({
      title: "Document removed",
      description: `${filename} has been removed from AI knowledge base.`
    });
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
        <AIToggle 
          aiEnabled={aiEnabled} 
          onAIEnabledChange={setAiEnabled} 
        />

        <div className="space-y-4">
          <h2 className="text-lg font-medium">AI Knowledge Base</h2>
          
          <KnowledgeBaseUploader onDocumentUpload={handleDocumentUpload} />
          
          <DocumentList 
            documents={knowledgeDocuments} 
            onRemoveDocument={handleRemoveDocument} 
          />
          
          <AIInstructionsEditor 
            instructions={aiInstructions}
            onInstructionsChange={setAiInstructions}
          />
        </div>
      </div>
    </>
  );
};

export default AIAssistantSettings;
