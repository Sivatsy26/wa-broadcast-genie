
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import AttachmentsDropdown from './AttachmentsDropdown';
import EmojiPicker from './EmojiPicker';
import VoiceRecorder from './VoiceRecorder';
import FilePreview from './FilePreview';

interface MessageInputProps {
  onSendMessage: (content: string, file: File | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [activeAttachmentType, setActiveAttachmentType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<number | null>(null);

  const handleSendMessage = () => {
    if (messageInput.trim() || selectedFile) {
      onSendMessage(messageInput, selectedFile);
      setMessageInput('');
      setSelectedFile(null);
      setShowFilePreview(false);
      setActiveAttachmentType(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFilePreview(true);
    }
  };

  const initiateFileUpload = (type: string) => {
    setActiveAttachmentType(type);
    if (fileInputRef.current) {
      switch (type) {
        case 'image':
          fileInputRef.current.accept = 'image/*';
          break;
        case 'video':
          fileInputRef.current.accept = 'video/*';
          break;
        case 'document':
          fileInputRef.current.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
          break;
      }
      fileInputRef.current.click();
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      
      const audioBlob = new Blob(['dummy-audio-data'], { type: 'audio/mp3' });
      const voiceFile = new File([audioBlob], `voice-${Date.now()}.mp3`, {
        type: 'audio/mp3',
      });
      
      onSendMessage('', voiceFile);
      setRecordingTime(0);
      
      toast({
        title: "Voice message sent",
        description: `Voice message (${recordingTime}s) has been sent successfully.`,
      });
    } else {
      toast({
        title: "Recording started",
        description: "Voice recording has started. Click the stop button when finished.",
      });
      
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    
    setIsRecording(!isRecording);
  };

  return (
    <div className="p-3 border-t">
      <div className="flex items-center gap-2">
        <AttachmentsDropdown onAttachmentSelect={initiateFileUpload} />
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />
        
        <EmojiPicker onEmojiSelect={(emoji) => setMessageInput(prev => prev + emoji)} />
        
        <Textarea
          placeholder="Type a message..."
          className="min-h-[44px] max-h-[120px] resize-none"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={isRecording}
        />
        
        <VoiceRecorder
          isRecording={isRecording}
          recordingTime={recordingTime}
          onToggleRecording={toggleVoiceRecording}
        />
        
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={(!messageInput.trim() && !selectedFile) || isRecording}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {selectedFile && showFilePreview && (
        <FilePreview
          file={selectedFile}
          type={activeAttachmentType}
          onRemove={() => {
            setSelectedFile(null);
            setShowFilePreview(false);
          }}
        />
      )}
    </div>
  );
};

export default MessageInput;
