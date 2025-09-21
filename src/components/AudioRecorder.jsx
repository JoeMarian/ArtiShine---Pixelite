
import React, { useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { Mic, Pause } from 'lucide-react';

const AudioRecorder = ({ isRecording = false, onStartRecording, onStopRecording, duration = 0, onAudioSave }) => {
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRec, setIsRec] = useState(false);
  const [localDuration, setLocalDuration] = useState(0);
  const timerRef = useRef(null);

  const startRecording = async () => {
    setRecordedChunks([]);
    setIsRec(true);
    setLocalDuration(0);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
        if (onAudioSave) onAudioSave(audioBlob);
      };
      mediaRecorder.start();
      timerRef.current = setInterval(() => setLocalDuration((prev) => prev + 1), 1000);
    }
    if (onStartRecording) onStartRecording();
  };

  const stopRecording = () => {
    setIsRec(false);
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (onStopRecording) onStopRecording();
  };

  return (
    <div className="card-warm p-8 text-center space-y-6">
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        {isRec && (
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-red-500 animate-ping z-0"></div>
        )}
        <div
          className={`absolute inset-0 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            isRec ? 'bg-red-500 animate-pulse' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          <Mic className="h-10 w-10 text-white" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-serif font-bold mb-2">{isRec ? 'Recording your story...' : 'Tell us about your craft'}</h3>
        <p className="text-muted-foreground">
          {isRec ? `Recording: ${Math.floor(localDuration / 60)}:${String(localDuration % 60).padStart(2, '0')}` : 'Share the story behind your creation'}
        </p>
      </div>

      <PrimaryButton onClick={isRec ? stopRecording : startRecording} variant={isRec ? 'wood' : 'terracotta'} size="lg">
        {isRec ? (
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


