
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal, Plus, Trash2, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SavedFlowsListProps {
  flows: any[];
  selectedFlow: string | null;
  isLoading: boolean;
  onLoadFlow: (flow: any) => void;
  onDeleteFlow: (flow: any) => void;
  onCreateNew: () => void;
}

export function SavedFlowsList({ 
  flows, 
  selectedFlow, 
  isLoading, 
  onLoadFlow, 
  onDeleteFlow,
  onCreateNew 
}: SavedFlowsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        <div className="col-span-full flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : flows.length > 0 ? (
        flows.map((flow) => (
          <Card 
            key={flow.id} 
            className={`cursor-pointer transition-all ${selectedFlow === flow.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
          >
            <CardHeader>
              <div className="flex justify-center mb-2">
                <FileText className="h-10 w-10 text-blue-500" />
              </div>
              <CardTitle className="text-center text-lg">{flow.name}</CardTitle>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onLoadFlow(flow)}>
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFlow(flow);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent onClick={() => onLoadFlow(flow)}>
              <p className="text-center text-muted-foreground">
                Last updated: {new Date(flow.updated_at || flow.created_at).toLocaleDateString()}
              </p>
              {flow.keywords && flow.keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {flow.keywords.slice(0, 3).map((keyword, i) => (
                    <span key={i} className="bg-muted px-2 py-0.5 text-xs rounded-full">{keyword}</span>
                  ))}
                  {flow.keywords.length > 3 && (
                    <span className="bg-muted px-2 py-0.5 text-xs rounded-full">+{flow.keywords.length - 3} more</span>
                  )}
                </div>
              )}
              {/* Display platforms if available */}
              {flow.flow_data?.platforms && flow.flow_data.platforms.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {flow.flow_data.platforms.includes('whatsapp') && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">WhatsApp</span>
                  )}
                  {flow.flow_data.platforms.includes('facebook') && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Facebook</span>
                  )}
                  {flow.flow_data.platforms.includes('instagram') && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Instagram</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center h-40 text-muted-foreground">
          <p>You don't have any saved bots yet</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onCreateNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Bot
          </Button>
        </div>
      )}
    </div>
  );
}
