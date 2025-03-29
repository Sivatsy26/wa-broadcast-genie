
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';
import { Message } from '@/types/conversation';

interface MessageListProps {
  messages: Message[];
  contactName: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  contactName,
  messagesEndRef
}) => {
  
  const renderMessageContent = (message: Message) => {
    if (message.type === 'image' && message.media) {
      return (
        <div className="mt-2">
          <img 
            src={message.media.url} 
            alt="Image attachment" 
            className="rounded-md max-h-60 object-cover"
          />
          {message.content && <p className="mt-1 text-sm">{message.content}</p>}
        </div>
      );
    } else if (message.type === 'video' && message.media) {
      return (
        <div className="mt-2">
          <video 
            src={message.media.url} 
            className="rounded-md max-h-60 w-full" 
            controls
          />
          {message.content && <p className="mt-1 text-sm">{message.content}</p>}
        </div>
      );
    } else if (message.type === 'document' && message.media) {
      return (
        <div className="mt-2 flex items-center p-2 bg-gray-100 rounded-md">
          <div>
            <p className="text-sm font-medium">{message.media.filename || "Document"}</p>
            {message.content && <p className="text-xs text-gray-500">{message.content}</p>}
          </div>
        </div>
      );
    } else if (message.type === 'voice' && message.media) {
      return (
        <div className="mt-2 flex items-center p-2 bg-gray-100 rounded-md">
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs">{message.media.duration}s</span>
          </div>
        </div>
      );
    } else {
      return <div className="text-sm">{message.content}</div>;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOutbound ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.isOutbound ? 'bg-primary text-primary-foreground' : 'bg-white border'} rounded-lg p-3 shadow-sm`}>
              {!message.isOutbound && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {contactName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{contactName}</span>
                </div>
              )}
              {message.isOutbound && message.sender && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{message.sender}</span>
                </div>
              )}
              
              {renderMessageContent(message)}
              
              <div className="text-[10px] mt-1 flex justify-end items-center gap-1 opacity-80">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {message.isOutbound && message.status === 'read' && (
                  <CheckCircle className="h-3 w-3" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
