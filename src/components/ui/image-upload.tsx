
import React, { useState, ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserRound, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file size (1MB = 1,048,576 bytes)
    if (file.size > 1048576) {
      toast.error('Image is too large', {
        description: 'Please upload an image smaller than 1MB'
      });
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setPreview(result);
        onChange(result);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(undefined);
    onChange('');
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative">
        <Avatar className="h-24 w-24">
          {preview ? (
            <AvatarImage src={preview} alt="Avatar" />
          ) : (
            <AvatarFallback>
              <UserRound className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex flex-col items-center">
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={handleClickUpload}
        >
          Upload avatar
        </Button>
        <p className="mt-1 text-xs text-muted-foreground">
          Max size: 1MB
        </p>
      </div>
    </div>
  );
}
