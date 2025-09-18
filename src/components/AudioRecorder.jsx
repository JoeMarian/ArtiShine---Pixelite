import React from 'react';
import PrimaryButton from './PrimaryButton';
import { Mic, Pause } from 'lucide-react';

const AudioRecorder = ({ isRecording = false, onStartRecording, onStopRecording, duration = 0 }) => {
  return (
    <div className="card-warm p-8 text-center space-y-6">
      <div className="relative">
        <div
          className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          <Mic className="h-10 w-10 text-white" />
        </div>
        {isRecording && (
          <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto border-4 border-red-500 animate-ping"></div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-serif font-bold mb-2">{isRecording ? 'Recording your story...' : 'Tell us about your craft'}</h3>
        <p className="text-muted-foreground">
          {isRecording ? `Recording: ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` : 'Share the story behind your creation'}
        </p>
      </div>

      <PrimaryButton onClick={isRecording ? onStopRecording : onStartRecording} variant={isRecording ? 'wood' : 'terracotta'} size="lg">
        {isRecording ? (
          <>
            <Pause className="mr-2 h-5 w-5" /> Stop Recording
          </>
        ) : (
          <>
            <Mic className="mr-2 h-5 w-5" /> Start Recording
          </>
        )}
      </PrimaryButton>
    </div>
  );
};

export default AudioRecorder;


