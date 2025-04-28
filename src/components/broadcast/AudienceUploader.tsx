
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FilePreview from "@/components/conversations/message-input/FilePreview";

export function AudienceUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(['Premium', 'Active']);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV file",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been selected.`,
      });
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
        setNewTag('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputClick = () => {
    // Focus on the input when the + Add Tag is clicked
    const tagInput = document.getElementById('new-tag-input');
    if (tagInput) {
      tagInput.focus();
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv"
      />
      
      {!selectedFile ? (
        <div 
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
          onClick={handleClickUpload}
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your CSV file here, or click to browse
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Choose File
          </Button>
        </div>
      ) : (
        <FilePreview 
          file={selectedFile} 
          type="file" 
          onRemove={handleRemoveFile} 
        />
      )}
      
      <div className="text-sm text-muted-foreground">
        <p>Your CSV should include the following columns:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Name (required)</li>
          <li>Phone (required, with country code)</li>
          <li>Email (optional)</li>
          <li>Custom Variables (optional)</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div 
              key={tag} 
              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <div 
            className="border border-dashed rounded-full px-3 py-1 text-sm text-muted-foreground flex items-center cursor-text"
            onClick={handleTagInputClick}
          >
            <input 
              id="new-tag-input"
              type="text" 
              placeholder="+ Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-transparent outline-none w-20"
            />
            {newTag && (
              <Plus 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  if (newTag.trim() && !tags.includes(newTag.trim())) {
                    setTags([...tags, newTag.trim()]);
                    setNewTag('');
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
