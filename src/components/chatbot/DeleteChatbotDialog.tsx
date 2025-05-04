
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Chatbot } from '@/services/chatbotService';

interface DeleteChatbotDialogProps {
  chatbot: Chatbot;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const DeleteChatbotDialog: React.FC<DeleteChatbotDialogProps> = ({
  chatbot,
  open,
  onClose,
  onDelete,
  isDeleting,
}) => {
  const handleDelete = () => {
    onDelete(chatbot.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the chatbot "{chatbot.name}" and all its data including conversations and responses. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatbotDialog;
