
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fileText, trash2, edit, filePlus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  content: string;
}

const TemplatesTab: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { id: '1', name: 'Welcome Message', content: 'Hello, thank you for reaching out to our support team. How can we assist you today?' },
    { id: '2', name: 'Business Hours', content: 'Our business hours are Monday to Friday, 9 AM to 5 PM. We will get back to you as soon as possible during these hours.' },
    { id: '3', name: 'Thank You', content: 'Thank you for your message. We appreciate your business and look forward to helping you again in the future.' },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');

  const handleAddTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      const newTemplate: Template = {
        id: `template-${Date.now()}`,
        name: newTemplateName,
        content: newTemplateContent
      };
      setTemplates([...templates, newTemplate]);
      setNewTemplateName('');
      setNewTemplateContent('');
      setIsAddDialogOpen(false);
      
      toast({
        title: "Template added",
        description: `Template "${newTemplateName}" has been added successfully.`,
      });
    }
  };

  const handleEditTemplate = () => {
    if (editingTemplate && editingTemplate.name.trim() && editingTemplate.content.trim()) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? editingTemplate : t
      ));
      setIsEditDialogOpen(false);
      
      toast({
        title: "Template updated",
        description: `Template "${editingTemplate.name}" has been updated successfully.`,
      });
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    
    toast({
      title: "Template deleted",
      description: "The template has been deleted successfully.",
    });
  };

  const startEditingTemplate = (template: Template) => {
    setEditingTemplate({...template});
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Message Templates</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <filePlus className="mr-2 h-4 w-4" />
              Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Name</label>
                <Input
                  placeholder="Enter template name"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Content</label>
                <Textarea
                  placeholder="Enter message template content"
                  rows={6}
                  value={newTemplateContent}
                  onChange={(e) => setNewTemplateContent(e.target.value)}
                />
              </div>
              <Button onClick={handleAddTemplate} className="w-full">Save Template</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <fileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEditingTemplate(template)}
                  >
                    <edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground border-t pt-2 whitespace-pre-wrap">
                {template.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Name</label>
                <Input
                  placeholder="Enter template name"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Content</label>
                <Textarea
                  placeholder="Enter message template content"
                  rows={6}
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                />
              </div>
              <Button onClick={handleEditTemplate} className="w-full">Update Template</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesTab;
