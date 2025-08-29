import React, { useRef, useState } from 'react';
import { startBasicRecognition } from '../lib/voiceUtils';
import { Button } from './ui/button';
import './style/ImageGenerator.css';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('/');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const inputRef = useRef(null);
  const handleImageLoad = () => {
    setLoading(false);
    inputRef.current.disabled = false;
  };
  const handleVoiceInput = () => {
    setListening(true);
    startBasicRecognition(
      (spokenText) => {
        if (inputRef.current) {
          inputRef.current.value = spokenText;
        }
        setListening(false);
      },
      () => {
        setListening(false);
      }
    );
  };

  const imageGenerator = async () => {
    const prompt = inputRef.current?.value?.trim();
    if (!prompt) return;

    setLoading(true);
    inputRef.current.disabled = true;
    setImageUrl('/');

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_Image_KEY}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url',
        }),
      });

      const data = await response.json();
      if (data?.data?.[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        alert('No image returned. Try another prompt.');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Something went wrong while generating the image.');
    } finally {
      inputRef.current.disabled = false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <div className="header text-white text-[1.8rem] md:text-[2.1rem] font-bold text-center overflow-hidden whitespace-nowrap w-[18ch] border-r-[3px] border-[#5daff2]">
        AI Image <span className="text-[#bb5bfb]">Generator</span>
      </div>

      <div className="w-[300px] h-[300px] rounded-[12px] shadow-[0_0_12px_rgba(255,255,255,0.2)] overflow-hidden">
        <img src={imageUrl === '/' ? '/imagegenbg.png' : imageUrl}  onLoad={handleImageLoad} alt="Generated result"className="w-full h-full object-cover"/>
      </div>

      {/* Input + Buttons */}
      <div className="flex items-center justify-center gap-4 w-screen">
        <div className="flex items-center gap-2 w-1/2 bg-[rgba(255,255,255,0.03)] backdrop-blur-[24px] rounded-[16px] border border-[rgba(255,255,255,0.05)] shadow-[10px_4px_20px_rgba(0,0,0,0.1)] text-[#e2e8f0] px-1 md:px-3 py-2 focus-within:border-[rgb(49,2,86)]">
         
          <input type="text" ref={inputRef}className="bg-transparent text-[#e2e8f0] w-full rounded-[16px] px-2 py-1 leading-[1.2] text-[16px] font-['Exo_2'] border-none outline-none"
            placeholder="Describe what you want to see"/>

          <Button variant= 'voicebtn' onClick={handleVoiceInput} >  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#22b2e2">v<path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" /> </svg> </Button>
        </div>

        <Button size="generatebtn"  onClick={imageGenerator}   disabled={loading}  >   {loading ? 'Generating...' : 'Generate'} </Button>
      </div>

      <div  className={`text-sm text-[#ccc] font-medium ${listening ? 'visible' : 'invisible'}`}>
        🎤 Listening... <span className="italic">Speak now</span></div>
      </div>
  );
};

export default ImageGenerator;
