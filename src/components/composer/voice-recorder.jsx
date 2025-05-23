import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Mic, Square, Loader2 } from 'lucide-react';

export default function VoiceRecorder({ onRecordingComplete, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onRecordingComplete("This is a simulated voice recording transcription. In a real implementation, this would contain the actual transcribed text from your voice recording.");
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Voice Input:</h3>
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={startRecording}
            disabled={disabled || isProcessing}
          >
            <Mic className="h-3.5 w-3.5 text-red-500" />
            <span>Start Recording</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
            onClick={stopRecording}
          >
            <Square className="h-3.5 w-3.5" />
            <span>Stop Recording</span>
          </Button>
        )}
        
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm">{formatTime(recordingTime)}</span>
          </div>
        )}
        
        {isProcessing && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}