import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import VoiceToText from '../components/VoiceToText';

const VoiceAssistant = () => {
    return (
        <div className="App flex flex-col  justify-between items-center bg-[linear-gradient(to_right,_#040107_6%,_#340d69_49%,_#5d2a91_89%)] h-screen">
         <Navbar/>
        <VoiceToText />
        <Footer/>
    </div>
    )
  }

  export default VoiceAssistant;