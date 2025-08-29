import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
const Home = () => {
  return (
    <div className="App flex flex-col  justify-between items-center bg-[linear-gradient(to_right,_#040107_6%,_#340d69_49%,_#5d2a91_89%)] h-screen">
      <Navbar />
      <div className="flex flex-col items-center m-[10px]  justify-center h-full text-center text-white gap-[20px]">
          <h1 className="text-[1.9rem] sm:text-[2.8rem] md:text-[3.2rem]">✨ Welcome to <span className='text-[#5daff2]'>VoiceAI</span> ✨</h1>
          <p className="text-[0.85rem] sm:text-[1rem]  md:text-[1.25rem] text-center"> Your futuristic assistant for voice recognition and AI-powered image generation.</p>
          <div className="gap-[20px] flex flex-col sm:flex-row items-center justify-center">
            <Link to="/voiceassistant"><Button variant = "default" size ="size1" className="">Voice Assistant</Button></Link>
            <Link to="/imageassistant"> <Button  variant = "default" size ="size1" className="home-btn"> Generate Image</Button></Link>
          </div>
      </div>

      <Footer />
    </div>

  );
};


export default Home;