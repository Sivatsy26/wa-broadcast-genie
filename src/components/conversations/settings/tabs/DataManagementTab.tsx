
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Import, FileText, Database, Trash2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DataManagementTab: React.FC = () => {
  const [storeMessagesLocally, setStoreMessagesLocally] = useState<boolean>(true);
  const [autoDeleteOldMessages, setAutoDeleteOldMessages] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Data settings saved",
      description: "Your data management preferences have been updated."
    });
  };

  const handleExportData = () => {
    // In a real implementation, this would generate a file download
    const mockData = {
      conversations: [
        { id: 1, contact: "John Doe", messages: [] },
        { id: 2, contact: "Jane Smith", messages: [] }
      ]
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "whatsapp-backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Data exported successfully",
      description: "Your WhatsApp conversation data has been exported."
    });
  };

  const handleDeleteAllData = () => {
    // In a real implementation, this would delete all data
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Data deleted",
      description: "All conversation data has been deleted.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Data Storage</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="store-locally">Store Messages Locally</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep a local copy of conversations in your browser
                </p>
              </div>
              <Switch 
                id="store-locally" 
                checked={storeMessagesLocally} 
                onCheckedChange={setStoreMessagesLocally} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-delete">Auto-Delete Old Messages</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically remove messages older than 90 days
                </p>
              </div>
              <Switch 
                id="auto-delete" 
                checked={autoDeleteOldMessages} 
                onCheckedChange={setAutoDeleteOldMessages} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Export & Import</h3>
          <div className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center" 
              onClick={handleExportData}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export Conversation Data
            </Button>
            
            <Button variant="outline" className="flex items-center justify-center">
              <label className="flex items-center justify-center w-full cursor-pointer">
                <Import className="mr-2 h-4 w-4" />
                <span>Import Conversation Data</span>
                <input 
                  type="file" 
                  accept=".json"
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      toast({
                        title: "Data import initiated",
                        description: `Importing data from ${e.target.files[0].name}`,
                      });
                    }
                  }}
                />
              </label>
            </Button>
            
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All Conversation Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">Delete All Data</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center mb-4">
                    Are you sure you want to delete all conversation data?
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAllData}
                    >
                      Delete All Data
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Data Settings</Button>
      </div>
    </div>
  );
};

export default DataManagementTab;
