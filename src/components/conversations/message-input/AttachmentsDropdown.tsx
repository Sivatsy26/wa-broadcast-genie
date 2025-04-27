
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paperclip, Image, Video, FileText } from 'lucide-react';

interface AttachmentsDropdownProps {
  onAttachmentSelect: (type: string) => void;
}

const AttachmentsDropdown: React.FC<AttachmentsDropdownProps> = ({ onAttachmentSelect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onAttachmentSelect('image')}>
          <Image className="mr-2 h-4 w-4" />
          Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAttachmentSelect('video')}>
          <Video className="mr-2 h-4 w-4" />
          Video
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAttachmentSelect('document')}>
          <FileText className="mr-2 h-4 w-4" />
          Document
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AttachmentsDropdown;
