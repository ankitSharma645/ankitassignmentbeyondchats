import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TutorialStep from './tutorial-step';

export default function Walkthrough({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to AI Copilot",
      description: "Your intelligent assistant for customer support. Let's take a quick tour to help you get started.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Ask Questions",
      description: "Type your questions in the chat box and get instant answers based on your company's knowledge base.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Customize Responses",
      description: "Use the composer to edit and adjust the tone of AI responses before sharing them with customers.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Save Important Information",
      description: "Pin messages or add them to your notes for quick reference later.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "You're All Set!",
      description: "You're ready to start using AI Copilot. If you need help, click the '?' icon in the top right corner.",
      image: "/placeholder.svg?height=200&width=300",
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-lg shadow-lg w-full max-w-md overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Getting Started</h2>
          <Button variant="ghost" size="icon" onClick={handleComplete}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <TutorialStep
              key={currentStep}
              title={steps[currentStep].title}
              description={steps[currentStep].description}
              image={steps[currentStep].image}
            />
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}