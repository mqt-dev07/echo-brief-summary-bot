
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, AudioWaveform } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AudioRecorderProps {
  onAudioCaptured: (text: string) => void;
  isLoading: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioCaptured, isLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
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
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processAudio(audioBlob);
        
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

  const processAudio = (audioBlob: Blob) => {
    // For simplicity in this implementation, we'll use a placeholder approach
    // that converts the audio to a dummy transcript
    // In a real app, you would send this to a speech-to-text service
    
    // Create a dummy transcript based on recording length
    const dummyText = `This is a simulated transcript of a ${recordingDuration} second recording. 
    In a real implementation, this audio would be sent to a speech-to-text service
    like Google Speech-to-Text, Azure Speech, or similar.
    
    The audio would be transcribed and returned as text, which would then be passed
    to the summary generator.`;
    
    // Pass the transcript to the parent component
    onAudioCaptured(dummyText);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-2">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className="h-16 w-16 rounded-full"
        >
          {isRecording ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-500 animate-pulse">
          <AudioWaveform className="h-4 w-4" />
          <span>{formatTime(recordingDuration)}</span>
        </div>
      )}
      
      <div className="text-xs text-gray-500 max-w-md text-center mt-2">
        {isRecording 
          ? "Click to stop recording" 
          : "Click to start recording your meeting"}
      </div>
    </div>
  );
};

export default AudioRecorder;
