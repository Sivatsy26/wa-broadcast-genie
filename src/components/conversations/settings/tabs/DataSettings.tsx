
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const DataSettings = () => {
  const handleExportData = () => {
    // In a real implementation, this would export the conversation data
    toast({
      title: "Export initiated",
      description: "Your conversation data is being prepared for export.",
    });
  };

  const handleImportData = () => {
    // In a real implementation, this would trigger a file picker
    toast({
      title: "Import initiated",
      description: "Please select your data file to import.",
    });
  };

  const handleClearData = () => {
    // In a real implementation, this would show a confirmation dialog
    toast({
      title: "Data cleanup",
      description: "This action requires confirmation. Are you sure?",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Data Management</h2>
      <p className="text-muted-foreground">Manage your conversation data</p>

      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>
            Download a copy of your conversation data
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleExportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Conversations</span>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import Data</CardTitle>
          <CardDescription>
            Import conversation data from a previous export
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={handleImportData} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Import Conversations</span>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clear Data</CardTitle>
          <CardDescription>
            Delete your conversation history and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This action is irreversible. All your conversations will be permanently deleted.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleClearData} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Clear All Data</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
