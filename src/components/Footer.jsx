import React from 'react';
import Links from './Links';

const footerLinks = [
  { label: "Privacy Policy", path: "/privacy" , type: "internal"},
  { label: "Terms of Service", path: "/terms" , type: "internal"},
  { label: "Help", path: "/help" , type: "internal"},
];

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between px-[1.5%] py-[2px] text-[#f0f0f0]  bg-transparent border-t w-screen border-white/10 md:gap-0 sm:flex-row sm:gap-2 ">
        <p className='copy sm:text-lg'>© 2025 All rights reserved.</p>
        <Links  links = {footerLinks} className = " flex gap-[6%] w-screen sm:w-7/12 items-center justify-center"/>
    </footer>

  );
};

export default Footer;