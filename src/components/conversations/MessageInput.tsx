
import React from 'react';

interface MessageInputProps {
  onSendMessage: (content: string, file: File | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  return <div>Message Input (Placeholder)</div>;
};

export default MessageInput;
