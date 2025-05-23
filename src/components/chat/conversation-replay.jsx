import React, { useState, useEffect } from 'react';
import ChatBubble from './chat-bubble';
import { Button } from '../ui/button';
import { X, FastForward, Pause, Play } from 'lucide-react';

export default function ConversationReplay({ messages, onFinish, personality = 'friendly' }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 = normal, 2 = fast, 3 = faster
  
  useEffect(() => {
    if (currentIndex < messages.length && !isPaused) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, messages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 1000 / speed); // Adjust timing based on speed
      
      return () => clearTimeout(timer);
    } else if (currentIndex === messages.length) {
      // All messages have been displayed
      const timer = setTimeout(() => {
        // Don't auto-finish, let user close manually
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, messages, onFinish, isPaused, speed]);
  
  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };
  
  const handleSpeedChange = () => {
    setSpeed(current => (current >= 3 ? 1 : current + 1));
  };
  
  const handleSkipToEnd = () => {
    setVisibleMessages(messages);
    setCurrentIndex(messages.length);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-primary/10 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Replaying conversation...</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleTogglePause}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSpeedChange}>
              <FastForward className="h-4 w-4" />
              <span className="ml-1">{speed}x</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSkipToEnd}>
              Skip
            </Button>
            <Button variant="ghost" size="sm" onClick={onFinish}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full mt-2">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / messages.length) * 100}%` }}
          />
        </div>
      </div>
      
      {visibleMessages.map((message) => (
        <ChatBubble 
          key={message.id} 
          message={message} 
          onAddToComposer={() => {}} // No-op function
          personality={personality}
          showReactions={false} // Don't show reaction buttons during replay
        />
      ))}
    </div>
  );
}