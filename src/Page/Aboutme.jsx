import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Links } from '../components/Links';

const contactLinks = [
    { label: "awaisariff004@gmail.com", path: "mailto:awaisariff004@gmail.com", type: "Email" },
    { label: "linkedin.com/in/awais-arif-aw0398", path: "https://www.linkedin.com/in/awais-arif-aw0398", type: "LinkedIn" },
    { label: "github.com/awais-awiz", path: "https://github.com/awais-awiz", type: "Github" },
  ];

const Aboutme = () => {
  return (
    <div className="App flex flex-col  justify-between items-center bg-[linear-gradient(to_right,_#040107_6%,_#340d69_49%,_#5d2a91_89%)] h-screen">
        <Navbar/>
    <div className="flex flex-col items-center justify-center min-w-1/2 m-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[12px] text-[#f0f0f0] shadow-[0_0_20px_rgba(0,150,255,0.1)]  backdrop-blur-[10px] p-[10px] gap-[35px]">
      <h1 className='text-[2rem] text-center'>About Me</h1>
      <p className='text-center text-[1.2rem]'>Hi! I'm <span className="text-[#5daff2]" >Awais Arif</span> — a web developer, computer scientist and tech enthusiast.</p>

      <Links links = {contactLinks} className = "flex flex-col"></Links>

      <p className='text-center text-[1rem]'>Let’s connect and build something amazing together!</p>
    </div>
    <Footer/>
    </div>
  );
};

export default Aboutme;