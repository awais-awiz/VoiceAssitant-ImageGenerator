import React, { useState, useEffect, useRef } from "react";
import "./style/VoiceToText.css";
import { Button } from "../components/ui/button";

const VoiceToText = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const manualStopRef = useRef(false);
  const speechBuffer = useRef("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          speechBuffer.current += piece;
          setTranscript(speechBuffer.current);
        } else {
          interimTranscript += piece;
        }
      }
    };

    recognition.onend = () => {
      // FIX: Only restart if user hasn't manually stopped
      if (!manualStopRef.current) {
        recognition.start();
      } else {
        if (speechBuffer.current.trim()) {
          fetchAIResponse(speechBuffer.current.trim());
          speechBuffer.current = "";
        }
      }
    };

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, []);

  const startListening = () => {
    setTranscript("");
    setResponse("");
    speechBuffer.current = "";
    manualStopRef.current = false;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    manualStopRef.current = true;
    setListening(false);
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel(); // Stop any ongoing speech output
  };

  const fetchAIResponse = async (text) => {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_Voice_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }],
        }),
      });

      const data = await res.json();
      if (!data.choices?.[0]) throw new Error("Invalid response");

      const reply = data.choices[0].message.content;
      setResponse(reply);
      speak(reply);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 bg-transparent w-screen">
      {/* Listening Badge */}
      <div  className={`px-4 py-2 rounded-full text-lg text-white font-medium transition-opacity duration-300 bg-gradient-to-br from-[#6c3ec1] to-[#5daff2] 
          ${listening ? "opacity-100" : "opacity-0"}`}  >
        Listening... <span className="italic text-sm">(speak now)</span>
      </div>

      {/* Mic Glow */}
      <div className="relative flex justify-center items-center">
        <div className={`w-[120px] h-[120px] absolute rounded-full bg-[rgba(67,225,254,0.3)] opacity-0 scale-80 z-[1] transition-all duration-400 pulse-ring ${listening ? "active" : ""}`}></div>
        <div className={`w-[100px] h-[100px] flex items-center justify-center glow-circle ${listening ? "active" : ""}`}>  <img src="microphone.png" alt="Mic" className="w-[60%] h-[55%]" /></div>
      </div>

      {/* Mic Button using shadcn Button */}
      <Button variant="default" size="size1"  className="bg-gradient-to-r from-[#a64bf4] to-[#2b9fff] hover:from-[#8e42d8] hover:to-[#36c7e5] hover:scale-105 shadow-lg"
        onClick={listening ? stopListening : startListening}> {listening ? "Tap to Stop" : "Tap to Speak"}  </Button>

      {/* Chat Box */}
      <div className="bg-transparent text-white rounded-lg shadow-md p-4 w-10/12 h-[30vh] space-y-3 border border-rgba(255, 255, 255, 0.1)] backdrop-blur-md">
        <p className="text-[17px]"> <strong className="text-[#8b73f5] text-[22px]">You say:</strong>{" "} {transcript || "..."} </p>
        <p className="text-[17px]"> <strong className="text-[#8b73f5] text-[22px]">AI responds:</strong>{" "} {response || "..."}</p>
      </div>
    </div>
  );
};

export default VoiceToText;
