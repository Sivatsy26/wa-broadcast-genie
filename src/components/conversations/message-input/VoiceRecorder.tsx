
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, StopCircle } from 'lucide-react';

interface VoiceRecorderProps {
  isRecording: boolean;
  recordingTime: number;
  onToggleRecording: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  recordingTime,
  onToggleRecording,
}) => {
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {!isRecording ? (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleRecording}
        >
          <Mic className="h-5 w-5" />
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-xs text-red-500">{formatRecordingTime(recordingTime)}</div>
          <Progress value={100} className="w-20 h-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-500"
            onClick={onToggleRecording}
          >
            <StopCircle className="h-5 w-5" />
          </Button>
        </div>
      )}
    </>
  );
};

export default VoiceRecorder;
