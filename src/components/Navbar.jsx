 // src/components/Navbar.jsx
import React, { useState } from 'react';
import Links from './Links';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
const navlinks = [
  { label: "home", path: "/" , type: "internal"},
  { label: "voiceAssistant", path: "/voiceassistant", type: "internal"},
  { label: "imageGenerator", path: "/imageassistant" , type: "internal"},
  { label: "aboutMe", path: "/aboutme" , type: "internal"},
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
      
    <nav className="flex items-center justify-between px-[1.5%] py-[5px] text-[#f0f0f0] w-screen bg-transparent border-b border-white/10">
        <Logo />
        <Links onClick={closeMenu} links = {navlinks} className = "w-screen hidden md:flex gap-[10%] items-center justify-center"/>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links = {navlinks}  className="md:hidden" />
    </nav>
  );
};

export default Navbar;