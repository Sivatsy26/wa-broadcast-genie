
import React, { useState } from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bot } from 'lucide-react';

// Import the components
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
  };

  return (
    <>
      <DialogHeader className="pb-4">
        <DialogTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </DialogTitle>
        <DialogDescription>
          Configure how the AI assistant responds to customer inquiries
        </DialogDescription>
      </DialogHeader>
    
      <div className="space-y-4">
        <AIToggle 
          aiEnabled={aiEnabled} 
          onAIEnabledChange={setAiEnabled} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <KnowledgeBaseUploader onDocumentUpload={handleDocumentUpload} />
            <AIInstructionsEditor 
              instructions={aiInstructions}
              onInstructionsChange={setAiInstructions}
            />
          </div>
          
          <DocumentList 
            documents={knowledgeDocuments} 
            onRemoveDocument={handleRemoveDocument} 
          />
        </div>
      </div>
    </>
  );
};

export default AIAssistantSettings;
