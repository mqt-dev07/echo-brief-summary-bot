
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, AudioWaveform, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { transcribeAudio } from "@/lib/api";

interface AudioRecorderProps {
  onAudioCaptured: (text: string) => void;
  isLoading: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioCaptured, isLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds++;
        setRecordingDuration(seconds);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast({
        title: "Recording stopped",
        description: "Processing your audio...",
      });
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      
      // Call the transcribeAudio function from our API
      const transcribedText = await transcribeAudio(audioBlob);
      
      // Pass the transcript to the parent component
      onAudioCaptured(transcribedText);
      
      toast({
        title: "Audio transcribed",
        description: "Your recording has been converted to text.",
      });
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast({
        title: "Transcription failed",
        description: "There was a problem processing your audio.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm w-full">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading || isProcessing}
          className="h-20 w-20 rounded-full mb-4"
        >
          {isRecording ? (
            <MicOff className="h-8 w-8" />
          ) : isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
        
        {isRecording ? (
          <div className="flex items-center space-x-2 text-red-500 animate-pulse">
            <AudioWaveform className="h-4 w-4" />
            <span className="font-mono font-medium">{formatTime(recordingDuration)}</span>
          </div>
        ) : isProcessing ? (
          <p className="text-sm text-blue-600">Converting speech to text...</p>
        ) : null}
        
        <div className="text-sm text-gray-600 max-w-md text-center mt-4">
          {isRecording 
            ? "Click to stop recording" 
            : isProcessing
              ? "Please wait while we process your audio"
              : "Click to start recording your meeting"}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
