import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "transition-all duration-300 ease-in-out  rounded-full text-white cursor-pointer border-none font-['Exo_2'] font-semibold  ",
  {
    variants: {
      variant: {
        hamburger: "bg-transparent  hover:bg-white/10 ",
        default: " bg-gradient-to-r from-[#a64bf4] to-[#2b9fff]  rounded-[30px] shadow-[0_0_12px_rgba(0,0,0,0.25)]   hover:bg-gradient-to-r hover:from-[#8e42d8] hover:to-[#36c7e5] hover:scale-105 hover:shadow-[0_4px_20px_rgba(93,175,242,0.5)] ",
        voicebtn : "bg-transparent  text-[#bb5bfb] hover:bg-[rgba(93,175,242,0.1)] hover:scale-110 rounded-full" ,
    },
      size: {
        default: "px-1 ",
        size1:  "py-[14px] px-[28px] m-[1px] text-[1rem]",
        micsize: " p-2 border-2 border-transparent cursor-pointer" ,
        generatebtn: "px-5 py-2  ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
