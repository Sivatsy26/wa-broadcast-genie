
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FlowTemplateSelectorProps {
  templates: any[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export function FlowTemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate
}: FlowTemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id} 
          className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
          onClick={() => onSelectTemplate(template.id)}
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
  );
}
